import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { Trainer } from 'src/app/models/trainer.model';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-trainer-page',
  templateUrl: './trainer-page.component.html',
  styleUrls: ['./trainer-page.component.css'],
})
export class TrainerPageComponent implements OnInit {
  constructor(private trainerService: TrainerService) {}
  
  ngOnInit(): void {
    this.trainerService.fetchTrainer('ash');
  }
  get trainer(): Trainer | null {
    return this.trainerService.trainer();
  }
  get pokemonCollection(): Pokemon[] {
    return this.trainerService.pokemonCollection();
  }
  public onClickRemove(event: number): void {
    this.trainerService.removePokemon(event);
  }
}
