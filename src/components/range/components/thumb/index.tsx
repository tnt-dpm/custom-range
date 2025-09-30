import { useState } from 'react';
import { ThumbProps } from './types';
import {
  getTrackInfo,
  normalizeStep,
  getPointerPercent,
  valueFromPercent,
  roundToClosestStep,
  getAllowedLimits,
  keepWithinLimits,
  getThumbZIndex,
} from './utils';

const Thumb = ({
  trackRef,
  leftPercent,
  setValue,
  min,
  max,
  role,
  counterpartValue,
  step = 1,
}: ThumbProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const updateValueFromClientX = (clientX: number) => {
    if (max === min) return;

    const trackInfo = getTrackInfo(trackRef.current);
    if (!trackInfo) return;

    const stepSize = normalizeStep(step);
    const pointerPercent = getPointerPercent(clientX, trackInfo);
    const valueAtPointer = valueFromPercent(pointerPercent, min, max);
    const steppedValue = roundToClosestStep(valueAtPointer, stepSize, min);

    const { start, end } = getAllowedLimits(role, counterpartValue, min, max);
    const nextValue = keepWithinLimits(steppedValue, start, end);

    setValue(nextValue);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
  };

  const handlePointerMove = (event: React.PointerEvent) => {
    if (!isDragging) return;
    updateValueFromClientX(event.clientX);
  };

  const handlePointerUp = (event: React.PointerEvent) => {
    if (!isDragging) return;
    (event.target as HTMLElement).releasePointerCapture(event.pointerId);
    setIsDragging(false);
  };

  const zIndex = getThumbZIndex(leftPercent, role);

  return (
    <button
      className="range__button"
      style={{ left: `${leftPercent}%`, zIndex }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    />
  );
};

export default Thumb;
