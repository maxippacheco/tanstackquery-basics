import { useQuery } from '@tanstack/react-query';

const getRandomNumberFromApi = async():Promise<number> => {
  const res = await fetch("https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new");
  const numberString = await res.text();

  return +numberString;
}

export const useRandom = () => {

	  // react query keeps the data updated
  const query = useQuery(
    // 1. cache
    ['randomNumber'],
    // 2. function to load the information
    getRandomNumberFromApi,
    {
      // try again
      retry: 1
    }
  );

	return query;

}