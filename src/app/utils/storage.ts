import { Pokemons } from '../models/pokemonData.model';
import { UserModel } from '../models/user-model';

export const getUser = () => {
  const user = localStorage.getItem('user');
  if (user) {
    return JSON.parse(user);
  }
};

export const setUser = (value: UserModel) => {
  localStorage.setItem('user', JSON.stringify(value));
};
export const removeUser = () => {
  localStorage.removeItem('user');
};
export const getPokeData = () => {
  const pokeData = sessionStorage.getItem('pokeData');
  if (pokeData) {
    return JSON.parse(pokeData);
  }
};
export const setPokeData = (value: Pokemons[]) => {  
  sessionStorage.setItem('pokeData', JSON.stringify(value));
};
