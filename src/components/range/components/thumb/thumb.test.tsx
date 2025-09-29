import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import Thumb from './index';
import { Role } from './types';

afterEach(() => {
  vi.restoreAllMocks();
});

type TrackRef = React.RefObject<HTMLDivElement>;

const createTrackRefWithRect = (left: number, width: number): TrackRef => {
  const trackElement = document.createElement('div');
  vi.spyOn(trackElement, 'getBoundingClientRect').mockReturnValue({
    left,
    width,
    top: 0,
    right: left + width,
    bottom: 0,
    height: 0,
    x: left,
    y: 0,
    toJSON: () => ({}),
  } as DOMRect);
  return { current: trackElement } as TrackRef;
};

type PointerCapturableButton = HTMLButtonElement & {
  setPointerCapture: (pointerId: number) => void;
  releasePointerCapture: (pointerId: number) => void;
};

const setupThumb = (overrides?: Partial<React.ComponentProps<typeof Thumb>>) => {
  const setValueSpy = vi.fn<(value: number) => void>();
  const trackRef = createTrackRefWithRect(100, 200);

  const utils = render(
    <Thumb
      trackRef={trackRef}
      leftPercent={0}
      setValue={setValueSpy}
      min={0}
      max={100}
      role={Role.min}
      step={1}
      {...overrides}
    />,
  );

  const button = utils.container.querySelector('button') as PointerCapturableButton;
  button.setPointerCapture = vi.fn();
  button.releasePointerCapture = vi.fn();

  return { button, setValueSpy, trackRef, ...utils };
};

describe('Thumb', () => {
  it('should update value based on pointer position along the track', () => {
    const { button, setValueSpy } = setupThumb();
    fireEvent.pointerDown(button, { pointerId: 1, buttons: 1 });
    fireEvent.pointerMove(button, { pointerId: 1, clientX: 200 });
    expect(setValueSpy).toHaveBeenCalledWith(50);
  });

  it('should not let the min thumb cross the counterpart value (upper bound)', () => {
    const { button, setValueSpy } = setupThumb({
      role: Role.min,
      counterpartValue: 30,
    });
    fireEvent.pointerDown(button, { pointerId: 1, buttons: 1 });
    fireEvent.pointerMove(button, { pointerId: 1, clientX: 260 });
    expect(setValueSpy).toHaveBeenCalledWith(30);
  });

  it('should snap to the nearest step when step is provided', () => {
    const { button, setValueSpy } = setupThumb({ step: 5 });
    fireEvent.pointerDown(button, { pointerId: 1, buttons: 1 });
    fireEvent.pointerMove(button, { pointerId: 1, clientX: 206 });
    expect(setValueSpy).toHaveBeenCalledWith(55);
  });

  it('should stop dragging on pointer up and ignore subsequent moves', () => {
    const { button, setValueSpy } = setupThumb();
    fireEvent.pointerDown(button, { pointerId: 1, buttons: 1 });
    fireEvent.pointerMove(button, { pointerId: 1, clientX: 200 });
    const callsAfterMove = setValueSpy.mock.calls.length;

    fireEvent.pointerUp(button, { pointerId: 1 });
    fireEvent.pointerMove(button, { pointerId: 1, clientX: 240 });

    expect(setValueSpy.mock.calls.length).toBe(callsAfterMove);
  });
});
