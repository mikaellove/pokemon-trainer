export interface Pokemons {
  count: Number;
  next: string;
  previous: string;
  results: PokemonResults[];
}

export interface PokemonResults {
  name: string;
  url: string;
}
