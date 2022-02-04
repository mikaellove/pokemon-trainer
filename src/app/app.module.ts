import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrainerPageComponent } from './views/trainer-page/trainer-page.component';
import { PokemonCollectionItem } from './components/pokemon-collection-item/pokemon-collection-item.component';
import { PokemonsPageComponent } from './views/pokemon-page/pokemons-page.component';

@NgModule({
  declarations: [AppComponent, TrainerPageComponent, PokemonCollectionItem, PokemonsPageComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
