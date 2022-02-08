import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginPageComponent } from './views/login-page/login-page.component';
import { PokemonsPageComponent } from './views/pokemon-page/pokemons-page.component';
import { TrainerPageComponent } from './views/trainer-page/trainer-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login',
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'trainer',
    component: TrainerPageComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'pokemons',
    component: PokemonsPageComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService],
})
export class AppRoutingModule {}
