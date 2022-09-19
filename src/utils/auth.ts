import { ISetAuth } from '@entities';

export enum ROLES {
  ADMIN = 'ADMIN',
  READER = 'READER',
  SCREENWRITER = 'SCREENWRITER',
  PUBLIC_USER = 'PUBLIC_USER',
  GUEST = 'GUEST', // This role is not supported by BE, use this for anonymous users.
}

// TODO Remove role from localstorage
export const setLocalAuth: ISetAuth = (id, role = ROLES.GUEST, access_token, refresh_token) => {
  const auth = {
    role,
    access_token,
    id,
    refresh_token,
  };

  localStorage.setItem('auth', JSON.stringify(auth));
};

export const resetLocalAuth = () => {
  setLocalAuth();
};

export const getLocalAuth = () => {
  const storageValue = localStorage.getItem('auth');

  const res = storageValue ? JSON.parse(storageValue) : { role: ROLES.GUEST, token: '' };
  return res;
};

export const keyExpired = () => {
  setLocalAuth();
};
