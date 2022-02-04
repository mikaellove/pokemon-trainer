import { Pokemon } from "./pokemon.model";

export interface Trainer {
    username: string;
    pokemon: Pokemon[];
}