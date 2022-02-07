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
  @Output() removeClicked: EventEmitter<number> = new EventEmitter();

  onClickCatch() {
    this.catchClicked.emit(this.pokemon);
  }
  onClickRemove() {   
    this.removeClicked.emit(this.pokemon?.id)
  }
}
