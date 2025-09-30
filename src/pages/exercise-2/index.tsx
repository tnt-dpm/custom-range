import { useState } from 'react';
import { useFetch } from '../../hooks/use-fetch';
import { FixedValues, MinMax } from '../../services/types';
import Range from '../../components/range';

export const ExerciseTwo = () => {
  const { data, loading, error } = useFetch<FixedValues>('/range-values.json');
  const [values, setValues] = useState<MinMax | undefined>();

  if (loading) return <p>Loading…</p>;
  if (error) return <p role="alert">Error: {error}</p>;
  if (!data) return null;

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
