import { Component } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemonData.model';
import { TrainerCollectionService } from 'src/app/services/trainer-collection.service';

@Component({
  selector: 'app-trainer-page',
  templateUrl: './trainer-page.component.html',
  styleUrls: ['./trainer-page.component.css'],
})
export class TrainerPageComponent {
  constructor(private trainerCollectionService: TrainerCollectionService) {}

  get pokemonCollection(): Pokemon[] {
    return this.trainerCollectionService.getTrainerCollection();
  }

  public onClickRemove(event: any): void {    
    this.trainerCollectionService.removeFromCollection(event);
  }
}
