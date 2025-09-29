import { MinMax } from '../../services/types';

export type RangeProps = {
  min?: number;
  max?: number;
  defaultValues?: { min: number; max: number };
  onChange?: (values: MinMax) => void;
  options?: number[];
  step?: number;
};
