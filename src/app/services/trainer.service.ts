import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import { Trainer } from '../models/trainer.model';

@Injectable({
  providedIn: 'root',
})
export class TrainerService {
  private _trainer: Trainer | null = null;
  private _pokemonCollection: Pokemon[] = [];

  constructor(private readonly http: HttpClient) {}

  //gör om så att den här hemtar till localStorage
  public fetchTrainer(trainerName: string): void {
    this.http
      .get<Trainer[]>(
        `https://ahells-assignment-api.herokuapp.com/trainers?username=${trainerName}`
      )
      .subscribe({
        next: (response: any) => {
          this._trainer = response.pop();
          this._trainer?.pokemon.forEach((pokemonName: any) =>
            this.setPokemonData(pokemonName)
          );
        },
        error: (error) => {
          console.error(error.message);
        },
      });
  }
  private setPokemonData(pokemonName: string): void {
    this.http
      .get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .subscribe({
        next: (response: Pokemon) => {
          response.url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${response.id}.png`;
          this._pokemonCollection.push(response);
        },
        error: (error) => {
          console.error(error.message);
        },
      });
  }

  public trainer(): Trainer | null {
    return this._trainer;
  }
  public pokemonCollection(): Pokemon[] {
    return this._pokemonCollection;
  }
  public addPokemon(newPokemon: Pokemon): void {
    this._pokemonCollection.push(newPokemon);
  }
  public removePokemon(pokemonId: number): void {
    const filteredPokemonCollection = this._pokemonCollection.filter((pokemon) => pokemon.id !== pokemonId);
    this._pokemonCollection = filteredPokemonCollection;
  }
}
