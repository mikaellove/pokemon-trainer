import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemonData.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonCollectionService {
  constructor(private readonly http: HttpClient) {}

  private _pokemonCollection: Pokemon[] = [];

  public pokemonCollection(): Pokemon[] {
    return this._pokemonCollection;
  }

  //returns an object containing the pokemons img url and id
  private getIdImgUrl(url: string): any {
    const splitUrl = url.split('/');
    const id = splitUrl[splitUrl.length - 2];
    return {
      id: id,
      url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    };
  }

  //adds a pokemon to the current pokemon collection
  public addPokemon(newPokemon: any): void {
    const pokemon: Pokemon = {
      ...newPokemon,
      ...this.getIdImgUrl(newPokemon.url),
    };

    // check if pokemon is deleted then dont push
    this._pokemonCollection.push(pokemon);
  }

  //filter through the pokemonCollection and removes a pokemon if its id match
  public removePokemon(pokemonId: number): void {
    const filteredPokemonCollection = this._pokemonCollection.filter(
      (pokemon) => pokemon.id !== pokemonId
    );
    this._pokemonCollection = filteredPokemonCollection;
  }
}
