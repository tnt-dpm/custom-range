import { useEffect, useMemo, useRef, useState } from 'react';
import './range.scss';
import LabelInput from './components/label-input';
import Thumb from './components/thumb';
import { valueToPercent } from './utils/percentage';
import { RangeProps } from './types';
import { Role } from './components/thumb/types';

const Range = ({
  min = 0,
  max = 10,
  options,
  defaultValues = { min: 0, max: 10 },
  onChange = () => {},
  step = 1,
}: RangeProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const isFixed = Array.isArray(options) && options.length > 0;

  const sortedOptions = useMemo(
    () => (isFixed ? [...options!].sort((a, b) => a - b) : null),
    [isFixed, options],
  );

  const [low, high] = useMemo(() => {
    if (isFixed) {
      return [sortedOptions![0], sortedOptions![sortedOptions!.length - 1]];
    }
    return [min, max];
  }, [isFixed, sortedOptions, min, max]);

  const [minValue, setMinValue] = useState(defaultValues.min ?? low);
  const [maxValue, setMaxValue] = useState(defaultValues.max ?? high);

  useEffect(() => {
    setMinValue(defaultValues.min ?? low);
    setMaxValue(defaultValues.max ?? high);
  }, [defaultValues, low, high]);

  const snap = (val: number) => {
    if (!isFixed) {
      return Math.round(val / step) * step;
    }

    return sortedOptions!.reduce((prev, curr) =>
      Math.abs(curr - val) < Math.abs(prev - val) ? curr : prev,
    );
  };

  const minPercentage = useMemo(
    () => valueToPercent(minValue, low, high),
    [minValue, low, high],
  );
  const maxPercentage = useMemo(
    () => valueToPercent(maxValue, low, high),
    [maxValue, low, high],
  );

  const handleChangeMinInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const raw = Number(event.currentTarget.value);
    if (!Number.isFinite(raw)) return;
    const value = snap(raw);
    if (value < low || value > high || value > maxValue) return;
    setMinValue(value);
    onChange?.({ min: value, max: maxValue });
  };

  const handleChangeMaxInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const raw = Number(event.currentTarget.value);
    if (!Number.isFinite(raw)) return;
    const value = snap(raw);
    if (value < low || value > high || value < minValue) return;
    setMaxValue(value);
    onChange?.({ min: minValue, max: value });
  };

  const setMin = (val: number) => {
    const value = snap(val);
    setMinValue(value);
    onChange?.({ min: value, max: maxValue });
  };

  const setMax = (val: number) => {
    const value = snap(val);
    setMaxValue(value);
    onChange?.({ min: minValue, max: value });
  };

  return (
    <div className="range">
      <LabelInput
        min={low}
        max={maxValue}
        defaultValue={minValue}
        onChange={handleChangeMinInput}
        isFixed={isFixed}
      />

      <div className="range__track-container" ref={trackRef}>
        <div className="range__track" />
        <div
          className="range__fill"
          style={{
            left: `${minPercentage}%`,
            width: `${Math.max(0, maxPercentage - minPercentage)}%`,
          }}
        />
        <Thumb
          trackRef={trackRef}
          leftPercent={minPercentage}
          setValue={setMin}
          min={low}
          max={high}
          role={Role.min}
          counterpartValue={maxValue}
          step={step}
        />
        <Thumb
          trackRef={trackRef}
          leftPercent={maxPercentage}
          setValue={setMax}
          min={low}
          max={high}
          role={Role.max}
          counterpartValue={minValue}
          step={step}
        />
      </div>

      <LabelInput
        min={minValue}
        max={high}
        defaultValue={maxValue}
        onChange={handleChangeMaxInput}
        isFixed={isFixed}
      />
    </div>
  );
};

export default Range;
