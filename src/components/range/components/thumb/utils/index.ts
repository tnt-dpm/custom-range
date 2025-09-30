import { Role, TrackInfo } from '../types';

/** Returns the z-index so the correct thumb is on top at the edges (MAX on left, MIN on right). */
export const getThumbZIndex = (leftPercent: number, role: Role): number => {
  const EDGE_EPS = 0.001;
  const atLeftEdge = leftPercent <= EDGE_EPS;
  const atRightEdge = leftPercent >= 100 - EDGE_EPS;

  if (atLeftEdge && role === Role.max) return 3;
  if (atRightEdge && role === Role.min) return 3;
  return 2;
};

/** Returns the track position and width or null if not ready. */
export const getTrackInfo = (el: HTMLElement | null): TrackInfo | null => {
  if (!el) return null;
  const { left, width } = el.getBoundingClientRect();
  return width > 0 ? { left, width } : null;
};

/** Returns a positive step size (defaults to 1). */
export const normalizeStep = (step: number): number => (step > 0 ? step : 1);

/** Returns the pointer position as percent (0–100) inside the track. */
export const getPointerPercent = (
  clientX: number,
  track: TrackInfo,
): number => {
  const raw = ((clientX - track.left) / track.width) * 100;
  return Math.max(0, Math.min(100, raw));
};

/** Converts a percent (0–100) into a value between min and max. */
export const valueFromPercent = (
  percent: number,
  min: number,
  max: number,
): number => min + (percent / 100) * (max - min);

/** Rounds the value to the nearest step starting at min. */
export const roundToClosestStep = (
  value: number,
  stepSize: number,
  min: number,
): number => Math.round((value - min) / stepSize) * stepSize + min;

/** Returns the allowed limits for this thumb so it does not cross the other. */
export const getAllowedLimits = (
  role: Role,
  otherValue: number | undefined,
  min: number,
  max: number,
): { start: number; end: number } => {
  const other = otherValue ?? (role === Role.min ? max : min);
  let start = role === Role.max ? other : min;
  let end = role === Role.min ? other : max;
  if (start > end) {
    start = min;
    end = max;
  }
  return { start, end };
};

/** Keeps the value inside the given limits. */
export const keepWithinLimits = (
  value: number,
  start: number,
  end: number,
): number => Math.max(start, Math.min(end, value));
