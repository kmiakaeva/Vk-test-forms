import { useQuery } from '@tanstack/react-query';
import { fetchAge } from '../services/age';

export const useAgeQuery = (newName: string) => {
  return useQuery({
    queryFn: () => fetchAge(newName),
    queryKey: ['age'],
    retry: false,
    refetchOnWindowFocus: false,
    enabled: false,
  });
};
