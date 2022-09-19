import { useGetUser } from '@utils/http/auth';
import { useAuth } from './auth';

export const useCurrentUser = () => {
  const { id: uuid } = useAuth();

  const { data } = useGetUser(uuid);
  return data;
};
