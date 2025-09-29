import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Home from '.';

describe('Home', () => {
  it('should render snapshot', () => {
    const { asFragment } = render(<Home />);
    expect(asFragment()).toMatchSnapshot();
  });
});
