import { FixedValues, MinMax } from './types';

const safeFetch = async <T>(url: string): Promise<T> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Fetch error ${res.status}: ${url}`);
  return res.json() as Promise<T>;
};

export const getMinMax = () => safeFetch<MinMax>('/range.json');
export const getFixedValues = () => safeFetch<FixedValues>('/range-values.json');
