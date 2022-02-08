import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../../services/http-client.service';
import { UserModel } from '../../models/user-model';
import { Router } from '@angular/router';
import { getPokeData, setUser, getUser } from 'src/app/utils/storage';
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
    this.httpService.FetchUsers();
  }

  InitializeLogin(username: string): void {
    // If input is null then return
    if (!username) return;

    this.LoginUser(username);

    // If the session storage somehow has been cleared since the app started, fetches pokemons again and then navigates to pokemon page.
    // If session storage hasn't been cleared immediately navigates to pokemon page.
    if (!getPokeData)
      this.httpService.FetchPokemonsAddsToSessionStorage(() =>
        this.router.navigate(['/pokemons'])
      );
    else this.router.navigate(['/pokemons']);
  }

  // Logs in a user, checks wether user exists or not.
  LoginUser(username: string): void {
    const users: UserModel[] = this.httpService.GetUsers();

    for (let index = 0; index < users.length; index++) {
      const element = users[index];

      // User exists, store user in localstorage and return
      if (element.username === username) {
        setUser(element);
        this.httpService.SetIsLoggedIn = true;
        // localStorage.setItem('user', JSON.stringify(element));
        return;
      }
    }
    // User dont exist, add new user to database and store in localstorage
    this.httpService.AddUser(username, (addedUser: UserModel) => {
      setUser(addedUser);
    });

    this.httpService.SetIsLoggedIn = true;
  }
}
