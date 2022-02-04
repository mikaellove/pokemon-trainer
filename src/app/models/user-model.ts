import { Pokemon } from "./pokemonData.model";

export interface UserModel {
  id: number;
  username: string;
  pokemon: Pokemon[];
}
