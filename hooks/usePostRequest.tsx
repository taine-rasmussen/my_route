import { useState, useEffect, useCallback } from 'react';

interface UsePostRequestResponse<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

const usePostRequest = <T,>(
  endpoint: string,
  payload?: Record<string, any>,
): UsePostRequestResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (!endpoint || !payload) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_BASE_URL}${endpoint}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const result: T = await response.json();
      setData(result);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('Unknown error occurred'),
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [endpoint, payload]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  return { data, loading, error };
};

export default usePostRequest;
