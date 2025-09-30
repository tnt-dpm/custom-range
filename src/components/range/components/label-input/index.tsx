import { useState } from 'react';
import { LabelInputProps } from './types';
import './label-input.scss';
import { Currency } from '../../../../enums/currency';
import { KeyBoardKey } from '../../../../enums/keyboard';

const LabelInput = ({
  min,
  max,
  defaultValue,
  currency = Currency.EURO,
  isFixed = false,
  hasError = false,
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
    if (event.key === KeyBoardKey.ENTER || event.key === KeyBoardKey.SCAPE) {
      setInputActive(false);
    }
    onKeyDown?.(event);
  };

  return (
    <div 
      className={`label-input__container ${hasError ? 'label-input--has-error' : ''}`} 
      onBlur={onBlurContainer}
    >
      {isInputActive ? (
        <input
          className='label-input__input'
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
            if (
              (event.key === KeyBoardKey.ENTER ||
                event.key === KeyBoardKey.SPACE_BAR) &&
              !isFixed
            ) {
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
