import { AxiosResponse } from 'axios';
import { useEffect, useMemo, useState } from 'react';
import useError from './useError';

export default function useRequest<T = any>(callback: () => Promise<AxiosResponse<T>>, deps: React.DependencyList) {
  const [response, setResponse] = useState<T>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { error, onError } = useError();

  useEffect(() => {
    let isSubscribed = true;
    setIsLoading(true);

    callback()
      .then(result => {
        if (!isSubscribed) return;
        setResponse(result?.data);
      })
      .catch(err => {
        if (!isSubscribed) return;
        const message = err?.response?.data?.message ?? error;
        onError(message);
      })
      .finally(() => setIsLoading(false));

    return () => {
      isSubscribed = false;
    };
  }, deps);

  return useMemo(() => ({ response, error, isLoading }), [response, error, isLoading]);
}
