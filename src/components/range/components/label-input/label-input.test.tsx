import { describe, it, expect, afterEach, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, within, fireEvent, cleanup } from '@testing-library/react';
import LabelInput from './index';

afterEach(() => cleanup());

describe('LabelInput', () => {
  it('should render label with default value and currency', () => {
    const { container } = render(<LabelInput defaultValue={10} currency="€" />);
    const queries = within(container);
    expect(queries.getByRole('button', { name: '10€' })).toBeInTheDocument();
    expect(queries.queryByRole('spinbutton')).toBeNull();
  });

  it('should activate input when label is clicked', () => {
    const { container } = render(<LabelInput defaultValue={5} currency="€" />);
    const queries = within(container);
    fireEvent.click(queries.getByRole('button', { name: '5€' }));
    const inputElement = queries.getByRole('spinbutton') as HTMLInputElement;
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue(5);
  });

  it('should not activate input when component is fixed', () => {
    const { container } = render(<LabelInput defaultValue={10} currency="€" isFixed />);
    const queries = within(container);
    fireEvent.click(queries.getByRole('button', { name: '10€' }));
    expect(queries.queryByRole('spinbutton')).toBeNull();
  });

  it('should deactivate input and call onBlur when focus leaves the container', () => {
    const onBlurSpy = vi.fn();
    const { container } = render(
      <div>
        <LabelInput defaultValue={12} currency="€" onBlur={onBlurSpy} />
        <button type="button" data-testid="outside">Outside</button>
      </div>,
    );

    const queries = within(container);
    const componentContainer = container.querySelector('.label-input__container') as HTMLElement;

    fireEvent.click(queries.getByRole('button', { name: '12€' }));
    const outsideButton = queries.getByTestId('outside');
    fireEvent.blur(componentContainer, { relatedTarget: outsideButton });

    expect(queries.queryByRole('spinbutton')).toBeNull();
    expect(onBlurSpy).toHaveBeenCalled();
  });
});
