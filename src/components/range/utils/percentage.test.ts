import { describe, it, expect } from 'vitest';
import { valueToPercent } from './percentage';

describe('valueToPercent', () => {
  it('should return 0 when min equals max', () => {
    const inputValue = 5;
    const inputMin = 10;
    const inputMax = 10;
    const result = valueToPercent(inputValue, inputMin, inputMax);
    expect(result).toBe(0);
  });

  it('should map min to 0 percent', () => {
    const inputValue = 0;
    const inputMin = 0;
    const inputMax = 100;
    const result = valueToPercent(inputValue, inputMin, inputMax);
    expect(result).toBe(0);
  });

  it('should map max to 100 percent', () => {
    const inputValue = 100;
    const inputMin = 0;
    const inputMax = 100;
    const result = valueToPercent(inputValue, inputMin, inputMax);
    expect(result).toBe(100);
  });

  it('should map midpoint to 50 percent', () => {
    const inputValue = 50;
    const inputMin = 0;
    const inputMax = 100;
    const result = valueToPercent(inputValue, inputMin, inputMax);
    expect(result).toBe(50);
  });

  it('should handle decimal ranges and values', () => {
    const inputValue = 2.5;
    const inputMin = 1.5;
    const inputMax = 3.5;
    const result = valueToPercent(inputValue, inputMin, inputMax);
    expect(result).toBeCloseTo(50);
  });

  it('should return negative percentage when value is below min', () => {
    const inputValue = -5;
    const inputMin = 0;
    const inputMax = 10;
    const result = valueToPercent(inputValue, inputMin, inputMax);
    expect(result).toBe(-50);
  });

  it('should return percentage greater than 100 when value is above max', () => {
    const inputValue = 15;
    const inputMin = 0;
    const inputMax = 10;
    const result = valueToPercent(inputValue, inputMin, inputMax);
    expect(result).toBe(150);
  });
});
