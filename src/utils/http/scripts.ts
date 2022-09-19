import {
  useQuery, useMutation, useQueryClient, QueryKey,
} from '@tanstack/react-query';
import { useRequest } from '@hooks/useRequest';
import { ActiveSession } from 'src/services/ActiveSession';
import { AxiosRequestConfig } from 'axios';
import { initialData } from './common';
import { IScriptFavoriteResponse, IScriptsResponse, ScriptStatus } from '../../types/data';

interface IFile {
  uid?: string;
  lastModified?: number;
  lastModifiedDate?: Date;
  name?: string;
  size?: number;
  type?: string;
  webkitRelativePath?: string;
}

export const uploadScript = (scriptName: string, scriptAuthor: string, file: IFile) => {
  const formData = new FormData();
  formData.append('file', file as string | Blob);
  formData.append('scriptAuthor', scriptAuthor as string);
  formData.append('scriptName', scriptName as string);

  const params = {
    url: 'api/v1/script',
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  return ActiveSession.instance.currentSession.client.request(params);
};

export const useGetScripts = (
  page: number,
  readerIds?: string[],
  enabled = true,
  // pageSize = 5,
) => {
  const request = useRequest();
  return useQuery(
    ['scripts', page, ...(readerIds || [])],
    async () => {
      const params = {
        url: `api/v1/script-filter?pageNumber=${page}&pageSize=5${
          readerIds ? `&readerIds=${readerIds.join(',')}` : ''
        }`,
        method: 'GET',
      };
      // TODO: introduce typing for server requests.
      return request<any>(params);
    },
    {
      initialData,
      enabled,
    },
  );
};

export const useGetAssignedScripts = (
  page: number,
  readerIds?: string[],
  enabled = true,
) => {
  const request = useRequest();
  return useQuery(
    ['scripts', page, ...(readerIds || [])],
    async () => {
      const params = {
        url: `api/v1/script-assign-filter?pageNumber=${page}&pageSize=5${
          readerIds ? `&readerIds=${readerIds.join(',')}` : ''
        }`,
        method: 'GET',
      };
      // TODO: introduce typing for server requests.
      return request<any>(params);
    },
    {
      initialData,
      enabled,
    },
  );
};

export const useGetPublicScripts = (page: number, pageSize = 5, scriptsIds?: number[]) => {
  const request = useRequest();
  return useQuery(
    ['public-scripts', page, pageSize, scriptsIds],
    async () => {
      const params = {
        url: `api/v1/public/script-filter?pageNumber=${page}&pageSize=${pageSize}${
          scriptsIds ? `&scriptIds=${scriptsIds.join(',')}` : ''
        }`,
        method: 'GET',
      };
      // TODO: introduce typing for server requests.
      return request<any>(params);
    },
    {
      initialData,
      enabled: (
        !scriptsIds
        || (
          Array.isArray(scriptsIds) && !!scriptsIds.length
        )
      ),
    },
  );
};

export const useGetPublicScript = (scriptId: number) => {
  const request = useRequest();
  return useQuery(
    ['public-script', scriptId],
    async () => {
      const params = {
        url: `api/v1/public/script-filter?scriptIds=${scriptId}`,
        method: 'GET',
      };
      // TODO: introduce typing for server requests.
      return request<any>(params);
    },
    {
      initialData,
    },
  );
};

export const useGetScriptFile = (scriptId: number) => {
  const request = useRequest();
  return useQuery(
    ['script-file', scriptId],
    async () => {
      if (!scriptId) {
        return Promise.reject();
      }

      const params: AxiosRequestConfig = {
        url: `api/v1/script-file/${scriptId}`,
        method: 'GET',
        responseType: 'blob',
      };

      return request(params).then((resp) => {
        const file = new Blob([resp as BlobPart], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        return fileURL;
      });
    },
    {
      refetchOnWindowFocus: false,
    },
  );
};

export const useGetPublicScriptFile = (scriptId: number) => {
  const request = useRequest();
  return useQuery(
    ['public-script-file', scriptId],
    async () => {
      if (!scriptId) {
        return Promise.reject();
      }

      const params = {
        url: `api/v1/public/script-file/${scriptId}`,
        method: 'GET',
        responseType: 'blob',
      };

      return request(params)
        .then((resp) => {
          const file = new Blob([resp as BlobPart], { type: 'application/pdf' });
          const fileURL = URL.createObjectURL(file);
          return fileURL;
        });
    },
    {
      refetchOnWindowFocus: false,
    },
  );
};

interface IScriptRequestParams {
  readerId: number;
  scriptId: string | number;
}

export const useGetScript = (scriptId: number): any => {
  const request = useRequest();
  return useQuery(['scriptData', scriptId], async () => {
    if (!scriptId) {
      return Promise.reject();
    }

    const options = {
      url: `api/v1/script-filter?scriptIds=${scriptId}`,
      method: 'GET',
    };

    return request<IScriptsResponse>(options);
  });
};

export const useGetScriptStatus = (params: IScriptRequestParams) => {
  const request = useRequest();
  return useQuery(['scriptDataStatus', params], async () => {
    const { readerId, scriptId } = params;
    if (!readerId || !scriptId) {
      return Promise.reject();
    }

    const options = {
      url: `api/v1/script-review?readerId=${readerId}&scriptId=${scriptId}`,
      method: 'GET',
    };

    return request<any>(options);
  });
};

export const useGetScriptFavorite = (
  userId: number,
  scriptsIds?: number[],
  page?: number,
  pageSize?: number,
) => {
  const request = useRequest();
  return useQuery(
    ['script-favorite', scriptsIds, userId, page, pageSize],
    async () => {
      const params = {
        url: `api/v1/script-favorite-filter?userIds=${userId}${
          scriptsIds ? `&scriptsIds=${scriptsIds.join(',')}` : ''
        }${page ? `&pageNumber=${page}` : ''}${pageSize ? `&pageSize=${pageSize}` : ''}`,
        method: 'GET',
      };

      return request<IScriptFavoriteResponse>(params);
    },
    {
      enabled: !!userId,
    },
  );
};

export const useGetScriptLikes = (
  userId: number,
  scriptsIds?: number[],
  page?: number,
  pageSize?: number,
) => {
  const request = useRequest();
  return useQuery(
    ['script-likes', scriptsIds, userId, page, pageSize],
    async () => {
      const params = {
        url: `api/v1/script-likes-filter?userIds=${userId}${
          scriptsIds ? `&scriptsIds=${scriptsIds.join(',')}` : ''
        }${page ? `&pageNumber=${page}` : ''}${pageSize ? `&pageSize=${pageSize}` : ''}`,
        method: 'GET',
      };

      return request<IScriptFavoriteResponse>(params);
    },
    {
      enabled: !!userId,
    },
  );
};

export const useAddScriptFavorite = () => {
  const request = useRequest();
  const queryClient = useQueryClient();
  const mutaion = useMutation(
    (params: { scriptId: number; userId: number }) => {
      const { scriptId, userId } = params;

      const options = {
        url: 'api/v1/script-favorite',
        method: 'POST',
        data: {
          scriptId,
          userIds: [userId],
        },
      };

      return request(options);
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries(['script-favorite']);
      },
    },
  );

  return mutaion;
};

export const useRemoveScriptFavorite = () => {
  const request = useRequest();
  const queryClient = useQueryClient();
  const mutaion = useMutation(
    (params: { scriptId: number; userId: number }) => {
      const { scriptId, userId } = params;

      const options = {
        url: 'api/v1/script-favorite',
        method: 'DELETE',
        data: {
          scriptId,
          userIds: [userId],
        },
      };

      return request(options);
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries(['script-favorite']);
      },
    },
  );

  return mutaion;
};

export const useAddScriptLike = () => {
  const request = useRequest();
  const queryClient = useQueryClient();
  const mutaion = useMutation(
    (params: { scriptId: number; userId: number, scriptsQueryKey?: QueryKey }) => {
      const { scriptId, userId } = params;

      const options = {
        url: 'api/v1/script-likes',
        method: 'POST',
        data: {
          scriptId,
          userIds: [userId],
        },
      };

      return request(options);
    },
    {
      onMutate: ({ scriptId, scriptsQueryKey }) => {
        if (scriptsQueryKey) {
          const previousScripts = queryClient.getQueryData(['public-scripts', ...scriptsQueryKey]);
          const newScripts = previousScripts?.content.map((script) => {
            if (script.id === scriptId) {
              return {
                ...script,
                likesCount: script.likesCount + 1,
              };
            }
            return script;
          });

          const newData = {
            content: newScripts,
            pageable: previousScripts?.pageable,
          };

          queryClient.setQueryData(['public-scripts', ...scriptsQueryKey], () => newData);

          return () => queryClient.setQueryData(
            ['public-scripts', ...scriptsQueryKey],
            previousScripts,
          );
        }
        return () => null;
      },
      onSettled: () => {
        queryClient.invalidateQueries(['script-likes']);
        queryClient.invalidateQueries(['public-script']);
      },
      onError: (_error, _values, rollback) => {
        return rollback();
      },
    },
  );

  return mutaion;
};

export const useRemoveScriptLike = () => {
  const request = useRequest();
  const queryClient = useQueryClient();
  const mutaion = useMutation(
    (params: { scriptId: number; userId: number, scriptsQueryKey?: QueryKey }) => {
      const { scriptId, userId } = params;

      const options = {
        url: 'api/v1/script-likes',
        method: 'DELETE',
        data: {
          scriptId,
          userIds: [userId],
        },
      };

      return request(options);
    },
    {
      onMutate: ({ scriptId, scriptsQueryKey }) => {
        if (scriptsQueryKey) {
          const previousScripts = queryClient.getQueryData(['public-scripts', ...scriptsQueryKey]);
          const newScripts = previousScripts?.content.map((script) => {
            if (script.id === scriptId) {
              return {
                ...script,
                likesCount: script.likesCount - 1,
              };
            }
            return script;
          });

          const newData = {
            content: newScripts,
            pageable: previousScripts?.pageable,
          };

          queryClient.setQueryData(['public-scripts', ...scriptsQueryKey], () => newData);

          return () => queryClient.setQueryData(
            ['public-scripts', ...scriptsQueryKey],
            previousScripts,
          );
        }
        return () => null;
      },
      onSettled: () => {
        queryClient.invalidateQueries(['script-likes']);
        queryClient.invalidateQueries(['public-script']);
      },
      onError: (_error, _values, rollback) => {
        return rollback();
      },
    },
  );

  return mutaion;
};

export const useReviewScript = () => {
  const request = useRequest();
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (params: {
      readerId: number;
      scriptId: number;
      statusReason: string;
      scriptStatus: ScriptStatus;
    }) => {
      const { readerId, scriptId, ...data } = params;

      const options = {
        url: `api/v1/script-review?readerId=${readerId}&scriptId=${scriptId}`,
        method: 'PUT',
        data,
      };

      return request(options);
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries(['scriptDataStatus']);
      },
    },
  );

  return mutation;
};

export const useGetScriptReview = (params: any, cbs: any) => {
  const request = useRequest();
  return useQuery(
    ['scriptReview', params],
    async () => {
      const { readerId, scriptId } = params;
      if (!readerId || !scriptId) {
        return Promise.reject();
      }

      const options = {
        url: `api/v1/survey?readerId=${readerId}&scriptId=${scriptId}`,
        method: 'GET',
      };

      return request<any>(options);
    },
    cbs,
  );
};

interface IAnswer {
  answerOptionId: number;
  answerText: string;
  matrixOptionId: number;
  questionId: number;
  answerType: string;
}

interface IUseUpdateScriptReview {
  readerId: number;
  scriptId: number;
  answer: IAnswer[];
}

export const useUpdateScriptReview = () => {
  const request = useRequest();
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (data: IUseUpdateScriptReview) => {
      const { readerId, scriptId, answer } = data;

      const options = {
        url: `api/v1/survey/selected-answer?readerId=${readerId}&scriptId=${scriptId}`,
        method: 'POST',
        data: answer,
      };

      return request(options);
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries(['scriptReview']);
      },
    },
  );

  return mutation;
};
