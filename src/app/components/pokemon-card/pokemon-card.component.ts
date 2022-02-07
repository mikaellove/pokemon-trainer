import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemonData.model';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css'],
})
export class PokemonCardComponent {
  @Input() pokemon: Pokemon | undefined;
  @Output() catchClicked: EventEmitter<Pokemon> = new EventEmitter();
  onClickCatch() {
    this.catchClicked.emit(this.pokemon);
  }

}
