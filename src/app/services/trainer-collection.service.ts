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
    this.resetCollection();
  }
  private _trainerCollection: Pokemon[] = [];

  /**
   * Removes any previous items in _trainerCollection
   */
  public resetCollection(): void {
    this._trainerCollection = [];
    this.init();
  }

  /**
   * Uses localStorage and sessionStorage to retrive the catched pokemons data and then sets _trainerCollection
   */
  public init() {
    const userObject: UserModel = getUser();
    const pokeDataObject: Pokemons = getPokeData();

    if (userObject.pokemon && userObject.pokemon.length > 0) {
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
  /**
   * Sets _trainerCollection from array
   * @param pokemons - Array of {@link Pokemon}
   */
  public setTrainerCollecton(pokemons: Pokemon[]): void {
    this._trainerCollection = pokemons;
  }

  /**
   * 
   * Returns array of the catched pokemons
   * @returns - Array of {@link Pokemon}
   */
  public getTrainerCollection(): Pokemon[] {
    return this._trainerCollection;
  }

  /**
   * Adds a new {@link Pokemon} to the trainer collection
   * @param newPokemon - {@link Pokemon}
   */
  public addToCollection(newPokemon: Pokemon): void {
    this._trainerCollection.push(newPokemon);

    const test = getUser();
    const updatedUserObject: UserModel = { ...test };
    updatedUserObject.pokemon.push(newPokemon);

    setUser(updatedUserObject);
    this.httpClientService.patchPokemons();
  }

  
  /**
   * Filter through the _trainerCollection and removes a pokemon if its id match
   * @param pokemon - {@link Pokemon}
   */
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


  /**
   * 
   * Check if _trainerCollection contains a pokemon
   * @param id - {@link Pokemon.id}
   * @returns true/false
   */
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
