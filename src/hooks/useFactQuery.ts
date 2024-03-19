import { useQuery } from '@tanstack/react-query';
import { fetchFact } from '../services/fact';

export const useFactQuery = () => {
  return useQuery({
    queryFn: fetchFact,
    queryKey: ['fact'],
    retry: false,
    refetchOnWindowFocus: false,
    enabled: false,
  });
};
