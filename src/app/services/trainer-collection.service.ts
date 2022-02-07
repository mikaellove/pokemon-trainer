import { Injectable } from '@angular/core';
import { Pokemon, Pokemons } from '../models/pokemonData.model';
import { UserModel } from '../models/user-model';
import { getUser, setUser } from '../utils/storage';

@Injectable({
  providedIn: 'root',
})
export class TrainerCollectionService {
  constructor() {
    this.init();
  }
  private _trainerCollection: Pokemon[] = [];

  private init() {
    const pokeDataString = localStorage.getItem('pokeData');
    const userString = localStorage.getItem('user');

    if (userString && pokeDataString) {
      const userObject: UserModel = JSON.parse(userString);
      const pokeDataObject: Pokemons = JSON.parse(pokeDataString);

      const loadedPokemons: Pokemon[] = [];

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
  }

  //filter through the pokemonCollection and removes a pokemon if its id match
  public removeFromCollection(pokemonId: number): void {
    const filteredPokemonCollection = this._trainerCollection.filter(
      (pokemon) => pokemon.id !== pokemonId
    );
    this._trainerCollection = filteredPokemonCollection;

    //updates the localStorage

    const test = getUser();
    const updatedUserObject: UserModel = { ...test };
    updatedUserObject.pokemon = this._trainerCollection.map(
      (pokemon: any) => pokemon.name
    );
    setUser(updatedUserObject);
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
