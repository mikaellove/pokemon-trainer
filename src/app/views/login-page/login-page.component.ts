import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../../services/http-client.service';
import { UserModel } from '../../models/user-model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  constructor(
    private readonly httpService: HttpClientService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.httpService.FetchUsers();
  }

  InitializeLogin(username: string): void {
    // If input is null then return
    if (!username) return;
    console.log(username);
    this.LoginUser(username);

    if (!localStorage.getItem('pokeData'))
      this.httpService.FetchPokemonsAddsToLocalStorage(() =>
        this.router.navigate(['/pokemons'])
      );
    else this.router.navigate(['/pokemons']);
  }

  LoginUser(username: string): void {
    const users: UserModel[] = this.httpService.GetUsers();

    for (let index = 0; index < users.length; index++) {
      const element = users[index];

      // User exists, store user in localstorage and return
      if (element.username === username) {
        localStorage.setItem('user', JSON.stringify(element));
        return;
      }
    }

    // User dont exist, add new user to database and store in localstorage
    this.httpService.AddUser(username, (addedUser: UserModel) => {
      localStorage.setItem('user', JSON.stringify(addedUser));
    });
  }
}
