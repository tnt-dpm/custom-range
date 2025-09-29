import { useEffect, useState } from 'react';
import Range from '../../components/range';
import { useFetch } from '../../hooks/use-fetch';
import { MinMax } from '../../services/types';

export const ExerciseOne = () => {
  const { data: limits, loading, error } = useFetch<MinMax>('/range.json');
  const [values, setValues] = useState<MinMax>({ min: 0, max: 0 });

  useEffect(() => {
    if (limits) setValues({ min: limits.min, max: limits.max });
  }, [limits]);

  if (loading) return <p>Loading…</p>;
  if (error) return <p role="alert">Error: {error}</p>;
  if (!limits || !values) return null;

  return (
    <>
      <h1>Exercise One</h1>
      <Range
        min={limits.min}
        max={limits.max}
        defaultValues={values}
        onChange={setValues}
      />
    </>
  );
};

export default ExerciseOne;
