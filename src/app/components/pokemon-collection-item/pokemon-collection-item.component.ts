import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-pokemon-collection-item',
  templateUrl: './pokemon-collection-item.component.html',
  styleUrls: ['./pokemon-collection-item.component.css'],
})
export class PokemonCollectionItem {
  @Input() pokemon: Pokemon | undefined;
  @Output() click = new EventEmitter();

  onClickRemove() {
    this.click.emit(this.pokemon?.id);
  }
}
