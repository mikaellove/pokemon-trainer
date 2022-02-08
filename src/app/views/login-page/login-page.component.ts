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
  ) {}

  ngOnInit(): void {
    if (!getPokeData){
      this.httpService.FetchPokemonsAddsToLocalStorage();
    }
    if(getUser()){
      this.router.navigateByUrl("/pokemons")
    }
  }

  public onClickLogin(username: string): void {
    if (!username) {
      return;
    }
    this.httpService.checkForUser(username, () => this.router.navigateByUrl('/pokemons'));
  }
}
