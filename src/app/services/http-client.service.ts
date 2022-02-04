import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserModel } from '../models/user-model';
import { Pokemons } from '../models/pokemonData.model';
@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  constructor(private readonly http: HttpClient) {}
  private users: UserModel[] = [];

  public FetchUsers(): void {
    this.http
      .get<UserModel[]>('https://assignments-api.herokuapp.com/trainers')
      .subscribe({
        next: (data: UserModel[]) => {
          this.users = data;
        },
      });
  }

  public AddUser(
    newUsername: string,
    callBack: (addedUser: UserModel) => void
  ): void {
    const headers = {
      'X-API-Key': 'SimonLove',
      'Content-Type': 'application/json',
    };

    const newUser: UserModel = {
      id: this.GenerateUniqueUserId(),
      username: newUsername,
      pokemon: [],
    };

    this.http
      .post<UserModel>(
        'https://assignments-api.herokuapp.com/trainers',
        newUser,
        { headers }
      )
      .subscribe((data) => {
        console.log(data);
        callBack(data);
      });
  }

  public FetchPokemonsAddsToLocalStorage(
    callback?: (pokeData: Pokemons[]) => void
  ): void {
    let pokemons: Pokemons[] = [];

    this.http
      .get<Pokemons[]>('https://pokeapi.co/api/v2/pokemon?limit=1118')
      .subscribe({
        next: (data: Pokemons[]) => {
          pokemons = data;
          let json: string = JSON.stringify(pokemons);
          localStorage.setItem('pokeData', json);

          if (callback) callback(pokemons);
        },
      });
  }

  public GetUsers(): UserModel[] {
    return this.users;
  }

  private GenerateUniqueUserId(): number {
    return Date.now();
  }
}
