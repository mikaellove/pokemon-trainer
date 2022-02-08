import { Pokemons } from '../models/pokemonData.model';
import { UserModel } from '../models/user-model';

/**
 * Returns item from localStorage with the key 'user'
 * @returns Json parsed user
 */
export const getUser = () => {
  const user = localStorage.getItem('user');
  if (user) {
    return JSON.parse(user);
  }
};
/**
 * Sets item in localStorage whith the key 'user'
 * @param value - {@link UserModel}
 */
export const setUser = (value: UserModel) => {
  localStorage.setItem('user', JSON.stringify(value));
};
/**
 * Removes item from localStoage with the key 'user'
 */
export const removeUser = () => {
  localStorage.removeItem('user');
};

/**
 * Returns item from sessionStorage with the key 'pokeData'
 * @returns Json parsed pokeData
 */
export const getPokeData = () => {
  const pokeData = sessionStorage.getItem('pokeData');
  if (pokeData) {
    return JSON.parse(pokeData);
  }
};
/**
 * Sets item in sessionStorage whith the key 'pokeData'
 * @param value - {@link Pokemons}
 */
export const setPokeData = (value: Pokemons[]) => {
  sessionStorage.setItem('pokeData', JSON.stringify(value));
};
