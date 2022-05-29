import { useEffect, useMemo, useState } from 'react';
import useError from './useError';

export default function usePromise<T = any>(callback: () => Promise<T>, deps: React.DependencyList) {
  const [response, setResponse] = useState<T>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { error, onError } = useError();

  useEffect(() => {
    let isSubscribed = true;
    setIsLoading(true);

    callback()
      .then(result => {
        if (!isSubscribed) return;
        setResponse(result);
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
