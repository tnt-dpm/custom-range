
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useFetch } from './use-fetch';

type HelloResponse = { hello: string };
type NumberResponse = { n: number };

describe('useFetch', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should load data successfully', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    fetchSpy.mockResolvedValueOnce(
      new Response(JSON.stringify({ hello: 'world' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );

    const { result: renderedHook } = renderHook(() => useFetch<HelloResponse>('/api/hello'));

    expect(renderedHook.current.loading).toBe(true);
    await waitFor(() => expect(renderedHook.current.loading).toBe(false));

    expect(fetchSpy).toHaveBeenCalledWith('/api/hello');
    expect(renderedHook.current.data).toEqual({ hello: 'world' });
    expect(renderedHook.current.error).toBeNull();
  });

  it('should set error when response is not ok', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    fetchSpy.mockResolvedValueOnce(
      new Response('{}', {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      }),
    );

    const { result: renderedHook } = renderHook(() => useFetch<Record<string, never>>('/api/not-found'));

    await waitFor(() => expect(renderedHook.current.loading).toBe(false));

    expect(renderedHook.current.data).toBeNull();
    expect(renderedHook.current.error).toBe('HTTP 404 on /api/not-found');
  });

  it('should reload data when reload is called', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    fetchSpy
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ n: 1 }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }),
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ n: 2 }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }),
      );

    const { result: renderedHook } = renderHook(() => useFetch<NumberResponse>('/api/number'));

    await waitFor(() => expect(renderedHook.current.loading).toBe(false));
    expect(renderedHook.current.data).toEqual({ n: 1 });

    act(() => {
      void renderedHook.current.reload();
    });
    expect(renderedHook.current.loading).toBe(true);

    await waitFor(() => expect(renderedHook.current.loading).toBe(false));
    expect(renderedHook.current.data).toEqual({ n: 2 });
    expect(renderedHook.current.error).toBeNull();
  });
});
