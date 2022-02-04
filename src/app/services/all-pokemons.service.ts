import { Injectable, OnInit } from '@angular/core';
import { Pokemon, Pokemons } from '../models/pokemonData.model';

@Injectable({
  providedIn: 'root',
})
export class AllPokemonsService {
  private _pokemons: Pokemon[] = [];

  private startIndex: number = 0;
  private indexInterval: number = 10;

  public onInit(): void {
    const pokeData = localStorage.getItem('pokeData');
    if (pokeData) {
      const data: Pokemons = JSON.parse(pokeData);
      while (this.startIndex < this.indexInterval) {
        const pokemon: Pokemon = data.results[this.startIndex]
        this.addPokemon(pokemon)
        this.startIndex++;
      }
    }
  }

  public everyPokemon(): Pokemon[]{
    return this._pokemons
  }
  private getIdImgUrl(url: string): any {
    const splitUrl = url.split('/');
    const id = splitUrl[splitUrl.length - 2];
    return {
      id: id,
      url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    };
  }

  public addPokemon(newPokemon: any): void {
    const pokemon: Pokemon = {
      ...newPokemon,
      ...this.getIdImgUrl(newPokemon.url),
    };    
    this._pokemons.push(pokemon);
  }
}
