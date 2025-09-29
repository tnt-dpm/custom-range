import { describe, it, expect, afterEach, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, within, fireEvent, cleanup } from '@testing-library/react';
import Range from './index';

vi.mock('./components/thumb', () => ({
  __esModule: true,
  default: (props: { role: string; setValue: (v: number) => void }) => (
    <button
      data-testid={`mock-thumb-${props.role}`}
      onClick={() => props.setValue(23)}
    />
  ),
}));

afterEach(() => cleanup());

const getLabelContainers = (container: HTMLElement) => {
  const containers = container.querySelectorAll('.label-input__container');
  return {
    leftLabelContainer: containers.item(0) as HTMLElement,
    rightLabelContainer: containers.item(1) as HTMLElement,
  };
};

const getFillElement = (container: HTMLElement) =>
  container.querySelector('.range__fill') as HTMLDivElement;

describe('Range', () => {
  it('should render with correct initial fill based on default values', () => {
    const { container } = render(<Range />);
    const fillElement = getFillElement(container);
    expect(fillElement).toHaveStyle({ left: '0%' });
    expect(fillElement).toHaveStyle({ width: '100%' });
  });

  it('should update min value from input in non-fixed mode and call onChange', () => {
    const onChangeSpy = vi.fn();
    const { container } = render(
      <Range min={0} max={10} defaultValues={{ min: 0, max: 10 }} onChange={onChangeSpy} />,
    );

    const { leftLabelContainer } = getLabelContainers(container);
    const leftQueries = within(leftLabelContainer);

    fireEvent.click(leftQueries.getByRole('button')); // activates input in non-fixed mode
    const leftInput = leftQueries.getByRole('spinbutton') as HTMLInputElement;
    fireEvent.change(leftInput, { target: { value: '3' } });

    const fillElement = getFillElement(container);
    expect(onChangeSpy).toHaveBeenCalledWith({ min: 3, max: 10 });
    expect(fillElement).toHaveStyle({ left: '30%' });
    expect(fillElement).toHaveStyle({ width: '70%' });
  });

  it('should snap to closest option when options are provided (fixed mode) via min thumb setValue', () => {
    const onChangeSpy = vi.fn();
    const fixedOptions = [0, 25, 50, 75, 100];

    const { container, getByTestId } = render(
      <Range
        min={0}
        max={100}
        options={fixedOptions}
        defaultValues={{ min: 0, max: 100 }}
        onChange={onChangeSpy}
      />,
    );

    fireEvent.click(getByTestId('mock-thumb-min')); // triggers setValue(23) on min thumb mock
    const fillElement = getFillElement(container);

    expect(onChangeSpy).toHaveBeenCalledWith({ min: 25, max: 100 });
    expect(fillElement).toHaveStyle({ left: '25%' });
    expect(fillElement).toHaveStyle({ width: '75%' });
  });
});
