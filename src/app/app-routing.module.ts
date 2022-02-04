import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './views/login-page/login-page.component';
import { PokemonsPageComponent } from './views/pokemon-page/pokemons-page.component';
import { TrainerPageComponent } from './views/trainer-page/trainer-page.component';

const routes: Routes = [
  {
    path:"",
    pathMatch:"full",
    redirectTo:"/login"
  },{
    path:"login",
    component: LoginPageComponent
  },
  {
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
