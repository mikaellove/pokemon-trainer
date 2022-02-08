import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../../services/http-client.service';
import { UserModel } from '../../models/user-model';
import { Router } from '@angular/router';
import { getPokeData, getUser, setUser } from 'src/app/utils/storage';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  constructor(
    private readonly httpService: HttpClientService,
    private readonly router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // this.httpService.FetchUsers();
  }

  public onClickLogin(username: string): void {
    if (!username) {
      return;
    }
    this.checkForUser(username, () => this.router.navigateByUrl('/pokemons'));
  }

  private async checkForUser(username: string, callBack: () => void) {
    this.http
      .get<UserModel>(
        `https://assignments-api.herokuapp.com/trainers?username=${username}`
      )
      .subscribe({
        next: (data: any) => {
          if (data.length === 0) {
            this.httpService.AddUser(username, (addedUser: UserModel) => {
              setUser(addedUser);
              callBack();
            });
          }
          if (data.length === 1) {
            setUser(data[0]);
            callBack();
          }
        },
      });
  }

  // InitializeLogin(username: string): void {
  //   // If input is null then return
  //   if (!username) return;
  //   console.log(username);
  //   this.LoginUser(username);

  //   if (!getPokeData)
  //     this.httpService.FetchPokemonsAddsToLocalStorage(() =>
  //       this.router.navigate(['/pokemons'])
  //     );
  //   else this.router.navigate(['/pokemons']);
  // }

  // LoginUser(username: string): void {
  //   const users: UserModel[] = this.httpService.GetUsers();

  //   for (let index = 0; index < users.length; index++) {
  //     const element = users[index];

  //     // User exists, store user in localstorage and return
  //     if (element.username === username) {
  //       setUser(element);
  //       // localStorage.setItem('user', JSON.stringify(element));
  //       return;
  //     }
  //   }

  //   // User dont exist, add new user to database and store in localstorage
  //   this.httpService.AddUser(username, (addedUser: UserModel) => {
  //     setUser(addedUser);
  //     // localStorage.setItem('user', JSON.stringify(addedUser));
  //   });
  // }
}
