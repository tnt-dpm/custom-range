import { useEffect, useState } from 'react';
import { useFetch } from '../../hooks/use-fetch';
import { FixedValues, MinMax } from '../../services/types';
import Range from '../../components/range';

export const ExerciseTwo = () => {
  const { data, loading, error } = useFetch<FixedValues>('/range-values.json');
  const [values, setValues] = useState<MinMax>({ min: 0, max: 0 });

  useEffect(() => {
    if (data?.rangeValues?.length) {
      const arr = data.rangeValues;
      setValues({ min: arr[0], max: arr[arr.length - 1] });
    }
  }, [data]);

  if (loading) return <p>Loading…</p>;
  if (error) return <p role="alert">Error: {error}</p>;
  if (!data || !values) return null;

  return (
    <>
      <h1>Exercise Two</h1>
      <Range
        options={data.rangeValues}
        defaultValues={values}
        onChange={setValues}
      />
    </>

  );
};

export default ExerciseTwo;
