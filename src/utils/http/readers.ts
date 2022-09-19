import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { IReadersResponse, IScriptData, IAssignReaderMutation } from '@entities';
import { useRequest } from '@hooks/useRequest';
import { ActiveSession } from 'src/services/ActiveSession';
import { initialData } from './common';

interface IResponse {
  content: IScriptData[];
  pageable: {
    totalElements: number;
    totalPages: number;
  };
}

export const useGetReaders = () => {
  const request = useRequest();
  return useQuery(
    ['readers'],
    async () => {
      const params = {
        url: 'api/v1/user/reader',
        method: 'GET',
      };

      return request(params);
    },
    {
      initialData,
    },
  );
};

export const getReaders = (): Promise<IReadersResponse> => {
  const params = {
    url: 'api/v1/user/reader',
    method: 'GET',
  };

  return ActiveSession.instance.currentSession.client.request(params);
};

export const useInviteReaders = () => {
  const request = useRequest();
  const mutaion = useMutation((params: { registrationPageUrl: string; email: string }) => {
    const { registrationPageUrl, email } = params;

    const options = {
      url: 'api/v1/invite-user',
      method: 'POST',
      data: {
        email,
        registrationPageUrl,
        role: 'READER',
      },
    };

    return request(options);
  });

  return mutaion;
};

export const useGetIsInviteCodeExists = (code?: string) => {
  const request = useRequest();
  return useQuery(
    ['isInviteCodeExists', code],
    async () => {
      const params = {
        url: `api/v1/invite-user/exists/${code}`,
        method: 'GET',
      };

      return request(params);
    },
    {
      enabled: !!code,
    },
  );
};

export const useAssignReader = () => {
  const request = useRequest();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (params: IAssignReaderMutation) => {
      const { reader, scriptId, addScriptReader } = params;

      const options = {
        url: 'api/v1/script-reader',
        method: addScriptReader ? 'POST' : 'DELETE',
        data: {
          readerIds: [reader.id],
          scriptId,
        },
      };

      return request(options);
    },
    {
      onMutate: async (variables) => {
        const {
          reader, scriptId, page, addScriptReader,
        } = variables;

        const previousData: IResponse = queryClient.getQueryData(['scripts', page]);

        const newScript = previousData.content.map((item: IScriptData) => {
          if (item.id === scriptId) {
            if (addScriptReader) {
              return {
                ...item,
                readers: [
                  ...item.readers,
                  {
                    id: reader.id,
                    firstName: reader.firstName,
                    lastName: reader.lastName,
                  },
                ],
              };
            }

            return {
              ...item,
              readers: item.readers.filter((item) => item.id !== reader.id),
            };
          }

          return item;
        });

        const newData = {
          content: newScript,
          pageable: previousData.pageable,
        };

        await queryClient.setQueryData(['scripts', page], () => newData);

        return () => queryClient.getQueryData(['scripts', page], previousData);
      },
      onError: async (error, _values, rollback) => {
        console.error('useAssignReader error', error);
        return rollback();
      },
      onSettled: (_data, _error, variables) => {
        const { page } = variables;

        queryClient.invalidateQueries(['scripts', page]);
      },
    },
  );

  return mutation;
};
