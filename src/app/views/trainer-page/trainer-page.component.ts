import { Component, OnInit } from '@angular/core';
import { Pokemon, Pokemons } from 'src/app/models/pokemonData.model';
import { UserModel } from 'src/app/models/user-model';
import { PokemonCollectionService } from 'src/app/services/pokemonCollection.service';

@Component({
  selector: 'app-trainer-page',
  templateUrl: './trainer-page.component.html',
  styleUrls: ['./trainer-page.component.css'],
})
export class TrainerPageComponent implements OnInit {
  constructor(
    private pokemonCollectionService: PokemonCollectionService
  ) {}

  ngOnInit(): void {
    const userItem = localStorage.getItem('user');
    const pokeData = localStorage.getItem('pokeData');

    if (userItem && pokeData) {
      const user: UserModel = JSON.parse(userItem);
      const data: Pokemons = JSON.parse(pokeData);

      for (const pokemonName of user.pokemon) {
        const pokemonData = data.results.filter(
          (pokemon: Pokemon) => pokemon.name === pokemonName.toString()
        );
        if (pokemonData.length > 0) {
          this.pokemonCollectionService.addPokemon(pokemonData.pop());
        }
      }
    }
  }

  get pokemonCollection(): Pokemon[] {
    return this.pokemonCollectionService.pokemonCollection();
  }
  public onClickRemove(event: number): void {
    this.pokemonCollectionService.removePokemon(event);
  }
}
