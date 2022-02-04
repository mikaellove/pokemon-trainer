import { Component, Input } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemonData.model';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css'],
})
export class PokemonCardComponent {
  @Input() pokemon: Pokemon | null = null;
}
