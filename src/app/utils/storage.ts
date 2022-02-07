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
