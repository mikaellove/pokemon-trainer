import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TrainerPageComponent } from './views/trainer-page/trainer-page.component';
import { PokemonCollectionItem } from './components/pokemon-collection-item/pokemon-collection-item.component';

import { PokemonsPageComponent } from './views/pokemon-page/pokemons-page.component';
import { LoginPageComponent } from './views/login-page/login-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';

@NgModule({
  declarations: [
    AppComponent,
    TrainerPageComponent,
    PokemonCollectionItem,
    PokemonsPageComponent,
    LoginPageComponent,
    PageNotFoundComponent,
    PokemonCardComponent
  ],

  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
