import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemonData.model';

@Component({
  selector: 'app-pokemon-collection-item',
  templateUrl: './pokemon-collection-item.component.html',
  styleUrls: ['./pokemon-collection-item.component.css'],
})
export class PokemonCollectionItem {
  @Input() pokemon: Pokemon | undefined;
  @Output() click = new EventEmitter();

  onClickRemove() {
    this.click.emit({ id: this.pokemon?.id, name: this.pokemon?.name });
  }
}
