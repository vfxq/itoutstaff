import { useQuery } from '@tanstack/react-query';
import { IUserInfo, IRegister, ITokens } from '@entities';
import { request } from 'src/services/Axios';

export const getLogin = (values: IRegister) => {
  const { email, password } = values;

  const data = new URLSearchParams();
  data.append('client_id', 'kinolime_backoffice_frontend_client');
  data.append('grant_type', 'password');
  data.append('username', email);
  data.append('password', password);

  const params = {
    url: 'auth/realms/kinolime_backoffice_realm/protocol/openid-connect/token',
    method: 'POST',
    data,
  };

  return request<ITokens>(params);
};

// eslint-disable-next-line consistent-return
export const refreshToken = (refreshToken: string) => {
  const data = new URLSearchParams();
  data.append('client_id', 'kinolime_backoffice_frontend_client');
  data.append('grant_type', 'refresh_token');
  data.append('refresh_token', refreshToken);

  const params = {
    url: 'auth/realms/kinolime_backoffice_realm/protocol/openid-connect/token',
    method: 'POST',
    data,
  };

  return request<any>(params);
};

export const logoutSession = (userId: string) => {
  const params = {
    url: `auth/realms/kinolime_backoffice_realm/users/${userId}/logout`,
    method: 'POST',
  };

  return request(params);
};

export const getUser = (userId = '') => {
  const params = {
    url: `api/v1/user/${userId}`,
    method: 'GET',
  };

  return request(params);
};

export const useGetUser = (uuid: string, enabled = true) => {
  return useQuery(
    ['user', uuid],
    async () => {
      const params = {
        url: `api/v1/user/${uuid}`,
        method: 'GET',
      };
      return request<IUserInfo>(params);
    },
    {
      enabled: !!uuid && enabled,
    },
  );
};
