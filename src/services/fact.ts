import { Fact } from '../types/fact';

const apiData = import.meta.env.VITE_API_URL_FACT;

export const fetchFact = async (): Promise<Fact> => {
  const response = await fetch(apiData);

  if (!response.ok) {
    throw new Error('Failed to fetch fact!');
  }

  return await response.json();
};
