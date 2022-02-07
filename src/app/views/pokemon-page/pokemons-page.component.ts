import { Component } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemonData.model';
import { AllPokemonsService } from 'src/app/services/all-pokemons.service';
import { PokemonCollectionService } from 'src/app/services/pokemonCollection.service';

@Component({
  selector: 'app-trainer-page',
  templateUrl: './pokemons-page.component.html',
  styleUrls: ['./pokemons-page.component.css'],
})
export class PokemonsPageComponent {
  constructor(private readonly allPokemonsService: AllPokemonsService,
    private readonly pokemonCollectionService: PokemonCollectionService) {
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

  public onClickCatch(catechedPokemon: Pokemon): void {  
    catechedPokemon.collected = true
    this.pokemonCollectionService.addPokemon(catechedPokemon);
  }
  public onClickRemove(pokemonId: any): void{
    this.pokemonCollectionService.removePokemon(pokemonId)
  }
}
