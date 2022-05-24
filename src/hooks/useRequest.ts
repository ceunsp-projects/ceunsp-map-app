import { AxiosError, Method } from 'axios';
import { useEffect, useMemo, useState } from 'react';
import apiService from '~/services/api';

export default function useRequest<T = any>(url: string, method: Method, data?: any) {
  const [response, setResponse] = useState<T>();
  const [error, setError] = useState<AxiosError>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const axiosResponse = await apiService.request({
          url,
          method,
          ...(method.toUpperCase() === 'GET' ? { params: data } : { data })
        });

        setResponse(axiosResponse.data);
      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [url, method, data]);

  return useMemo(() => ({ response, error, isLoading }), [response, error, isLoading]);
}
