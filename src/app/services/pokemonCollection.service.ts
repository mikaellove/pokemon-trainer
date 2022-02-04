import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonCollectionService {
  private _pokemonCollection: Pokemon[] = [];
  
  public pokemonCollection(): Pokemon[] {
    return this._pokemonCollection;
  }
  public addPokemon(newPokemon: Pokemon): void {
    this._pokemonCollection.push(newPokemon);
  }
  public removePokemon(pokemonId: number): void {
    const filteredPokemonCollection = this._pokemonCollection.filter(
      (pokemon) => pokemon.id !== pokemonId
    );
    this._pokemonCollection = filteredPokemonCollection;
  }
}
