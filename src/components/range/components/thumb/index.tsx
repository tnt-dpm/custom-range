import { useState } from 'react';
import { Role, ThumbProps } from './types';

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
    const trackElement = trackRef.current;
    if (!trackElement || max === min) return;

    const { left: trackLeft, width: trackWidth } =
      trackElement.getBoundingClientRect();
    if (trackWidth <= 0) return;

    const effectiveStep = step > 0 ? step : 1;
    const positionRatio = Math.min(
      1,
      Math.max(0, (clientX - trackLeft) / trackWidth),
    );
    const continuousValue = min + positionRatio * (max - min);
    const snappedValue =
      Math.round((continuousValue - min) / effectiveStep) * effectiveStep + min;

    const lowerBound = role === Role.max ? counterpartValue ?? min : min;
    const upperBound = role === Role.min ? counterpartValue ?? max : max;

    const clampedValue = Math.min(
      upperBound,
      Math.max(lowerBound, snappedValue),
    );
    setValue(clampedValue);
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

  return (
    <button
      className="range__button"
      style={{ left: `${leftPercent}%` }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    />
  );
};

export default Thumb;
