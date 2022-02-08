import { Injectable } from '@angular/core';
import { Pokemon, Pokemons } from '../models/pokemonData.model';
import { getPokeData } from '../utils/storage';
import { TrainerCollectionService } from './trainer-collection.service';

@Injectable({
  providedIn: 'root',
})
export class AllPokemonsService {
  private _pokemons: Pokemon[] = [];

  private pokeData: Pokemons | null = null;
  private startIndex: number = 0;
  private indexInterval: number = 50;
  private endIndex: number = this.startIndex + this.indexInterval;

  constructor(
    private readonly trainerCollectionService: TrainerCollectionService
  ) {
    this.pokeData = getPokeData();
  }

  /**
   * Resets startIndex and endIndex and cals {@link onInit}
   */
  public resetService(): void {
    this.startIndex = 0;
    this.endIndex = this.startIndex + this.indexInterval;
    this.onInit()
  }

  /**
   * Populates the _pokemons with specific pokemons depending on the current startIndex and endIndex
   */
  private onInit(): void {
    if (this.pokeData !== null) {
      this._pokemons = [];
      while (this.startIndex < this.endIndex) {
        const pokemon: Pokemon = this.pokeData.results[this.startIndex];
        this.setPokemonInfo(pokemon);
        this.startIndex++;
      }
    }
  }

  /**
   * Sets the next 50 pokemons or less
   */
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
  /**
   * Sets the privous 50 pokemons
   */
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

  /**
   * Returns an array containing the available pokemons
   * @returns array of {@link Pokemon}
   */
  public everyPokemon(): Pokemon[] {
    return this._pokemons;
  }
  /**
   * Uses string to extract the pokemons id and its img url
   * @param url - String
   * @returns object containing the id and img url
   */
  private getIdImgUrl(url: string): any {
    const splitUrl = url.split('/');
    const id = splitUrl[splitUrl.length - 2];
    return {
      id: id,
      url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    };
  }
/**
 * Creates a new {@link Pokemon}-object with id, name, img url, and collected. Adds it to _pokemons.
 * @param newPokemon - object containing the pokemon name and its data url
 */
  private setPokemonInfo(newPokemon: any): void {
    const pokemon: Pokemon = {
      ...newPokemon,
      ...this.getIdImgUrl(newPokemon.url),
    };
    pokemon.collected = this.trainerCollectionService.isPokemonInCollection(
      pokemon.id
    );
    this._pokemons.push(pokemon);
  }

  /**
   * Checks if the first 50 pokemons are showing or not
   * @returns true/false
   */
  public isOnFirstPage(): boolean{
    return this.startIndex === this.indexInterval
  }
  
  /**
   * Checks if the last 50 pokemons are showing or not
   * @returns true/false
   */
  public isOnLastPage(): boolean{
    return this.endIndex === this.pokeData?.results.length
  }
}
