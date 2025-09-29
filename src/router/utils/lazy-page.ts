import type { ComponentType } from 'react';

export const lazyPage = <T extends ComponentType<unknown>>(
  loader: () => Promise<{ default: T }>,
) => ({
  lazy: async () => {
    const component = await loader();
    return { Component: component.default };
  },
});
