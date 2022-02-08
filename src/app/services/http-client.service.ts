import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user-model';
import { Pokemons } from '../models/pokemonData.model';
import { getUser, setPokeData, setUser } from '../utils/storage';
@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  constructor(private readonly http: HttpClient) {}

  private isLoggedIn: boolean = false;

  get IsLoggedIn() {
    if (getUser()) {
      this.isLoggedIn = true;
      return this.isLoggedIn;
    } else {
      this.isLoggedIn = false;
      return this.isLoggedIn;
    }
  }

  set SetIsLoggedIn(value: boolean) {
    this.isLoggedIn = value;
  }

  //check if there is a user with the same username. if not a new user is created
  public async checkForUser(username: string, callBack: () => void) {
    this.http
      .get<UserModel>(
        `https://assignments-api.herokuapp.com/trainers?username=${username}`
      )
      .subscribe({
        next: (data: any) => {
          if (data.length === 0) {
            this.AddUser(username, (addedUser: UserModel) => {
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

          setPokeData(pokemons);
          if (callback) callback(pokemons);
        },
      });
  }

  public patchPokemons() {
    const headers = {
      'X-API-Key': 'SimonLove',
      'Content-Type': 'application/json',
    };

    const updatedUser: UserModel = getUser();
    const pokemonName: any[] = updatedUser.pokemon.map((pokemon: any) =>
      pokemon.name ? pokemon.name : pokemon
    );

    this.http
      .patch<UserModel>(
        'https://assignments-api.herokuapp.com/trainers/' + updatedUser.id,
        { pokemon: pokemonName },
        { headers }
      )
      .subscribe((data) => {});
  }

  // public DeleteFromUser(pokemon: string): void {
  //   const headers = {
  //     'X-API-Key': 'SimonLove',
  //     'Content-Type': 'application/json',
  //   };

  //   let updatedUser = getUser();

  //   for (let index = 0; index < updatedUser.pokemon.length; index++) {
  //     const element = updatedUser.pokemon[index];
  //     if (element === pokemon) {
  //       updatedUser.pokemon[index] = { name: element, deleted: true };
  //     }
  //   }

  //   this.http
  //     .put<UserModel>(
  //       'https://assignments-api.herokuapp.com/trainers/' + updatedUser.id,
  //       updatedUser,
  //       { headers }
  //     )
  //     .subscribe((data) => {
  //       localStorage.setItem('user', JSON.stringify(data));
  //     });
  // }

  // public GetUsers(): UserModel[] {
  //   return this.users;
  // }

  private GenerateUniqueUserId(): number {
    return Date.now();
  }
}
