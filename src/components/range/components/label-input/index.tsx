import { useState } from 'react';
import { LabelInputProps } from './types';
import './label-input.scss';

const LabelInput = ({
  min,
  max,
  defaultValue,
  currency = '€',
  isFixed = false,
  onChange,
  onKeyDown,
  onBlur,
}: LabelInputProps) => {
  const [isInputActive, setInputActive] = useState(false);

  const onBlurContainer = (event: React.FocusEvent<HTMLInputElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
      setInputActive(false);
    }
    onBlur?.(event);
  };

  const onKeyDownInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === 'Escape') {
      setInputActive(false);
    }
    onKeyDown?.(event);
  };

  return (
    <div className="label-input__container" onBlur={onBlurContainer}>
      {isInputActive ? (
        <input
          type="number"
          min={min}
          max={max}
          defaultValue={defaultValue}
          onKeyDown={onKeyDownInput}
          onChange={onChange}
          autoFocus
        />
      ) : (
        <label
          onClick={() => !isFixed && setInputActive(true)}
          onKeyDown={(event) => {
            if ((event.key === 'Enter' || event.key === ' ') && !isFixed) {
              event.preventDefault();
              setInputActive(true);
            }
          }}
          role="button"
          tabIndex={0}
        >
          {defaultValue + currency}
        </label>
      )}
    </div>
  );
};

export default LabelInput;
