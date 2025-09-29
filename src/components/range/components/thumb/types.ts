export enum Role {
  min = 'min',
  max = 'max',
}

export type ThumbProps = {
  trackRef: React.RefObject<HTMLDivElement | null>;
  leftPercent: number;
  setValue: (next: number) => void;
  min: number;
  max: number;
  role: Role.min | Role.max;
  counterpartValue?: number;
  step?: number
};
