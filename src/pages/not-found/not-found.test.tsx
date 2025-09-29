import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import NotFound from '.';

describe('NotFound', () => {
  it('should render snapshot', () => {
    const { asFragment } = render(<NotFound />);
    expect(asFragment()).toMatchSnapshot();
  });
});