import { Component } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemonData.model';
import { AllPokemonsService } from 'src/app/services/all-pokemons.service';

@Component({
  selector: 'app-trainer-page',
  templateUrl: './pokemons-page.component.html',
  styleUrls: ['./pokemons-page.component.css'],
})
export class PokemonsPageComponent {
  constructor(private readonly allPokemonsService: AllPokemonsService) {
    this.allPokemonsService.onInit();
  }

  get pokemons(): Pokemon[] {
    return this.allPokemonsService.everyPokemon();
  }

  public nextPage(): void {
    this.allPokemonsService.nextPage();
  }

  public previousPage(): void {
    this.allPokemonsService.previousPage();
  }
}
