export interface Pokemons {
  count: Number;
  next: string;
  previous: string;
  results: Pokemon[];
}

export interface Pokemon {
  id?: number;
  name: string;
  url: string;
  collected: boolean;
}
