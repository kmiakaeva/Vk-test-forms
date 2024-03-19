const apiData = import.meta.env.VITE_API_URL_NAME_AGE;

export const fetchAge = async (newName: string): Promise<number> => {
  const response = await fetch(`${apiData}?name=${newName}`);

  if (!response.ok) {
    throw new Error('Failed to fetch age!');
  }

  const data = await response.json();

  if (!data.age) {
    throw new Error('Age not found');
  }

  return data.age;
};
