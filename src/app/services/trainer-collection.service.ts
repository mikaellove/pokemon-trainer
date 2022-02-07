import { Injectable } from '@angular/core';
import { Pokemon, Pokemons } from '../models/pokemonData.model';
import { UserModel } from '../models/user-model';
import { getPokeData, getUser, setUser } from '../utils/storage';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root',
})
export class TrainerCollectionService {
  constructor(private httpClientService: HttpClientService) {
    this.init();
  }
  private _trainerCollection: Pokemon[] = [];

  private init() {
    const userObject: UserModel = getUser();
    const pokeDataObject: Pokemons = getPokeData();

    if (userObject.pokemon && (userObject.pokemon.length > 0)) {
      const loadedPokemons: Pokemon[] = [];
      console.log(userObject.pokemon);
      
      for (const pokemon of userObject.pokemon) {
        const pokemonName = pokemon.name ? pokemon.name : pokemon.toString();
        const pokemonData = pokeDataObject.results.filter(
          (pokemon: Pokemon) => pokemon.name === pokemonName
        );

        if (pokemonData.length > 0) {
          loadedPokemons.push(this.convertedPokemon(pokemonData.pop()));
        }
      }

      this.setTrainerCollecton(loadedPokemons);
    }
  }

  public setTrainerCollecton(pokemons: Pokemon[]): void {
    this._trainerCollection = pokemons;
  }

  public getTrainerCollection(): Pokemon[] {
    return this._trainerCollection;
  }

  //adds a pokemon to the current pokemon collection
  public addToCollection(newPokemon: Pokemon): void {
    this._trainerCollection.push(newPokemon);

    const test = getUser();
    const updatedUserObject: UserModel = { ...test };
    updatedUserObject.pokemon.push(newPokemon);

    setUser(updatedUserObject);
    this.httpClientService.patchPokemons();
  }

  //filter through the pokemonCollection and removes a pokemon if its id match
  public removeFromCollection(pokemon: Pokemon): void {
    const filteredPokemonCollection = this._trainerCollection.filter(
      (currentPokemon) => currentPokemon.id !== pokemon.id
    );
    this._trainerCollection = filteredPokemonCollection;

    const test = getUser();
    const updatedUserObject: UserModel = { ...test };
    updatedUserObject.pokemon = this._trainerCollection.map(
      (currentPokemon: any) => currentPokemon.name
    );
    setUser(updatedUserObject);
    this.httpClientService.patchPokemons();
  }

  public isPokemonInCollection(id: any): boolean {
    return (
      this._trainerCollection.filter((pokemon: Pokemon) => pokemon.id === id)
        .length > 0
    );
  }

  private getIdImgUrl(url: string): any {
    const splitUrl = url.split('/');
    const id = splitUrl[splitUrl.length - 2];
    return {
      id: id,
      url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    };
  }

  //converts name and pokemon url to id, name, and img, url
  private convertedPokemon(newPokemon: any): Pokemon {
    const pokemon: Pokemon = {
      ...newPokemon,
      ...this.getIdImgUrl(newPokemon.url),
    };
    return pokemon;
  }
}
