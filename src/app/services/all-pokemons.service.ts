import { Injectable, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { Pokemon, Pokemons } from '../models/pokemonData.model';

@Injectable({
  providedIn: 'root',
})
export class AllPokemonsService {
  private _pokemons: Pokemon[] = [];

  private pokeData: Pokemons | null = null;
  private startIndex: number = 0;
  private indexInterval: number = 10;
  private endIndex: number = this.startIndex + this.indexInterval;

  constructor() {
    const pokeData = localStorage.getItem('pokeData');
    if (pokeData) {
      const data: Pokemons = JSON.parse(pokeData);
      data.results = data.results.splice(0, 32);
      this.pokeData = data;
    }
  }

  public onInit(): void {
    if (this.pokeData) {
      this._pokemons = [];
      while (this.startIndex < this.endIndex) {
        const pokemon: Pokemon = this.pokeData.results[this.startIndex];
        this.addPokemon(pokemon);
        this.startIndex++;
      }
    }
  }

  public nextPage(): void {
    if (this.pokeData) {
      if (this.endIndex !== this.pokeData.results.length) {
        if (this.endIndex + this.indexInterval < this.pokeData.results.length) {
          this.endIndex += this.indexInterval;
        } else {
          this.endIndex = this.pokeData.results.length;
        }
        this.onInit();
      }
    }
  }
  public previousPage(): void {
    if (this.pokeData) {
      if (this.startIndex !== this.indexInterval) {
        if (this.startIndex - this.indexInterval * 2 <= 0) {
          this.startIndex = 0;
          this.endIndex = this.indexInterval;
        } else {
          if (this.endIndex % this.indexInterval === 0) {
            this.startIndex -= this.indexInterval * 2;
            this.endIndex -= this.indexInterval;
          } else {
            this.startIndex =
              this.startIndex -
              this.indexInterval -
              (this.endIndex % this.indexInterval);
            this.endIndex =
              this.endIndex - (this.endIndex % this.indexInterval);
          }
        }
        this.onInit();
      }
    }
  }

  public everyPokemon(): Pokemon[] {
    return this._pokemons;
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
