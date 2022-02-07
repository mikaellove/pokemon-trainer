import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemonData.model';
import { AllPokemonsService } from 'src/app/services/all-pokemons.service';
import { TrainerCollectionService } from 'src/app/services/trainer-collection.service';

@Component({
  selector: 'app-trainer-page',
  templateUrl: './pokemons-page.component.html',
  styleUrls: ['./pokemons-page.component.css'],
})
export class PokemonsPageComponent implements OnInit {
  constructor(
    private readonly allPokemonsService: AllPokemonsService,
    private trainerCollectionService: TrainerCollectionService
  ) {}

  ngOnInit(): void {
    this.allPokemonsService.resetService();
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
    catechedPokemon.collected = true;
    this.trainerCollectionService.addToCollection(catechedPokemon);
  }
}
