import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonsPageComponent } from './views/pokemon-page/pokemons-page.component';
import { TrainerPageComponent } from './views/trainer-page/trainer-page.component';

const routes: Routes = [
  {
    path:"",
    pathMatch:"full",
    redirectTo:"/trainer"
  },{
    path:"trainer",
    component: TrainerPageComponent
  },{
    path:"pokemons",
    component: PokemonsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
