export type LabelInputProps = {
  min?: number;
  max?: number;
  defaultValue?: number;
  currency?: string;
  isFixed?: boolean;
  hasError: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};