import { ISetAuth } from '@entities';

interface IRoles {
  GUEST: string;
  ADMIN: string;
  READER: string;
  SCRIPTER: string;
}

export interface IAuthProvider {
  children: React.ReactElement | React.ReactElement[];
}

export interface IAuth {
  id: string;
  role: string;
  access_token: string;
  refresh_token: string;
}
export interface IAuthContext {
  id: string;
  role: string;
  setAuth: ISetAuth;
  getLocalAuth: () => IAuth;
  logout: () => void;
  ROLES: IRoles;
  resetLocalAuth: () => void;
}
