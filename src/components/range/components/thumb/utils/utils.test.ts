// utils.test.ts
import { describe, it, expect, vi } from 'vitest';
import {
  getThumbZIndex,
  getTrackInfo,
  normalizeStep,
  getPointerPercent,
  valueFromPercent,
  roundToClosestStep,
  getAllowedLimits,
  keepWithinLimits,
} from '.';
import { Role } from '../types';

describe('getThumbZIndex', () => {
  it('should put MAX on top at the left edge', () => {
    expect(getThumbZIndex(0, Role.max)).toBe(3);
    expect(getThumbZIndex(0, Role.min)).toBe(2);
  });

  it('should put MIN on top at the right edge', () => {
    expect(getThumbZIndex(100, Role.min)).toBe(3);
    expect(getThumbZIndex(100, Role.max)).toBe(2);
  });

  it('should keep base z-index in the middle', () => {
    expect(getThumbZIndex(50, Role.min)).toBe(2);
    expect(getThumbZIndex(50, Role.max)).toBe(2);
  });
});

describe('getTrackInfo', () => {
  it('should return null when element is null', () => {
    expect(getTrackInfo(null)).toBeNull();
  });

  it('should return null when width is not positive', () => {
    const el = document.createElement('div');
    const spy = vi
      .spyOn(el, 'getBoundingClientRect')
      .mockReturnValue(new DOMRect(10, 0, 0, 0));
    expect(getTrackInfo(el)).toBeNull();
    spy.mockRestore();
  });

  it('should return left and width when available', () => {
    const el = document.createElement('div');
    const spy = vi
      .spyOn(el, 'getBoundingClientRect')
      .mockReturnValue(new DOMRect(10, 0, 200, 0));
    expect(getTrackInfo(el)).toEqual({ left: 10, width: 200 });
    spy.mockRestore();
  });
});

describe('normalizeStep', () => {
  it('should return 1 for zero or negative values', () => {
    expect(normalizeStep(0)).toBe(1);
    expect(normalizeStep(-3)).toBe(1);
  });

  it('should return the same value for positive step', () => {
    expect(normalizeStep(5)).toBe(5);
  });
});

describe('getPointerPercent', () => {
  const track = { left: 0, width: 200 };

  it('should return 0% at or before the left edge', () => {
    expect(getPointerPercent(-10, track)).toBe(0);
    expect(getPointerPercent(0, track)).toBe(0);
  });

  it('should return 50% in the middle', () => {
    expect(getPointerPercent(100, track)).toBe(50);
  });

  it('should return 100% at or beyond the right edge', () => {
    expect(getPointerPercent(200, track)).toBe(100);
    expect(getPointerPercent(250, track)).toBe(100);
  });
});

describe('valueFromPercent', () => {
  it('should map 0% to min and 100% to max', () => {
    expect(valueFromPercent(0, 10, 20)).toBe(10);
    expect(valueFromPercent(100, 10, 20)).toBe(20);
  });

  it('should map 50% to the middle value', () => {
    expect(valueFromPercent(50, 0, 100)).toBe(50);
    expect(valueFromPercent(50, 10, 20)).toBe(15);
  });
});

describe('roundToClosestStep', () => {
  it('should round to nearest step starting at min', () => {
    expect(roundToClosestStep(13, 5, 0)).toBe(15);
    expect(roundToClosestStep(13, 5, 10)).toBe(15);
  });
});

describe('getAllowedLimits', () => {
  it('should restrict MAX to be >= other value', () => {
    const { start, end } = getAllowedLimits(Role.max, 20, 0, 100);
    expect(start).toBe(20);
    expect(end).toBe(100);
  });

  it('should restrict MIN to be <= other value', () => {
    const { start, end } = getAllowedLimits(Role.min, 20, 0, 100);
    expect(start).toBe(0);
    expect(end).toBe(20);
  });

  it('should fall back to full range when other is undefined', () => {
    expect(getAllowedLimits(Role.min, undefined, 0, 100)).toEqual({ start: 0, end: 100 });
    expect(getAllowedLimits(Role.max, undefined, 0, 100)).toEqual({ start: 0, end: 100 });
  });

  it('should reset to full range when limits would be reversed', () => {
    const { start, end } = getAllowedLimits(Role.max, 200, 0, 100);
    expect(start).toBe(0);
    expect(end).toBe(100);
  });
});

describe('keepWithinLimits', () => {
  it('should return start when value is below start', () => {
    expect(keepWithinLimits(-5, 0, 10)).toBe(0);
  });

  it('should return end when value is above end', () => {
    expect(keepWithinLimits(15, 0, 10)).toBe(10);
  });

  it('should return the same value when inside limits', () => {
    expect(keepWithinLimits(7, 0, 10)).toBe(7);
  });
});
