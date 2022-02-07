import { Injectable } from '@angular/core';
import { Pokemon, Pokemons } from '../models/pokemonData.model';
import { UserModel } from '../models/user-model';

@Injectable({
  providedIn: 'root',
})
export class PokemonCollectionService {
  private _pokemonCollection: Pokemon[] = [];

  public pokemonCollection(): Pokemon[] {
    return this._pokemonCollection;
  }
  //returns an object containing the pokemons img url and id
  public getIdImgUrl(url: string): any {
    const splitUrl = url.split('/');
    const id = splitUrl[splitUrl.length - 2];
    return {
      id: id,
      url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    };
  }
  //adds a pokemon to the current pokemon collection
  public addPokemon(newPokemon: Pokemon): void {
    this._pokemonCollection.push(newPokemon);
  }

  //filter through the pokemonCollection and removes a pokemon if its id match
  public removePokemon(pokemonId: number): void {
    const filteredPokemonCollection = this._pokemonCollection.filter(
      (pokemon) => pokemon.id !== pokemonId
    );    
    this._pokemonCollection = filteredPokemonCollection;
  }

  public findPokemonById(id: any): boolean{
    return this._pokemonCollection.filter((pokemon: Pokemon) => pokemon.id === id).length > 0
  }

}
