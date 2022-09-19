import { useMutation } from '@tanstack/react-query';
import { IDataRegUser } from '@entities';
import { useRequest } from '@hooks/useRequest';

export const useRegister = () => {
  const request = useRequest();
  const mutation = useMutation((data: IDataRegUser) => {
    const options = {
      url: 'api/v1/user',
      method: 'POST',
      data,
    };

    return request(options);
  });

  return mutation;
};
