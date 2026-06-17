import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useUrlFilters } from './useUrlFilters.js';

function wrapperFor(initialPath) {
  return ({ children }) => <MemoryRouter initialEntries={[initialPath]}>{children}</MemoryRouter>;
}

describe('useUrlFilters', () => {
  it('parses string, numeric and amenities params from the URL', () => {
    const { result } = renderHook(() => useUrlFilters(), {
      wrapper: wrapperFor('/catalog?city=Kyiv&priceMin=1000&amenities=wifi,tv'),
    });

    expect(result.current.filters).toEqual({
      city: 'Kyiv',
      priceMin: 1000, // coerced to Number
      amenities: ['wifi', 'tv'], // split into array
    });
  });

  it('ignores empty param values', () => {
    const { result } = renderHook(() => useUrlFilters(), {
      wrapper: wrapperFor('/catalog?city=&type=apartment'),
    });
    expect(result.current.filters).toEqual({ type: 'apartment' });
  });

  it('setFilter adds a value and removes it when set to empty', () => {
    const { result } = renderHook(() => useUrlFilters(), {
      wrapper: wrapperFor('/catalog'),
    });

    act(() => result.current.setFilter('city', 'Lviv'));
    expect(result.current.filters.city).toBe('Lviv');

    act(() => result.current.setFilter('city', ''));
    expect(result.current.filters.city).toBeUndefined();
  });

  it('setFilter serializes arrays as comma-joined values', () => {
    const { result } = renderHook(() => useUrlFilters(), {
      wrapper: wrapperFor('/catalog'),
    });

    act(() => result.current.setFilter('amenities', ['wifi', 'parking']));
    expect(result.current.filters.amenities).toEqual(['wifi', 'parking']);
  });

  it('setMany applies several filters at once', () => {
    const { result } = renderHook(() => useUrlFilters(), {
      wrapper: wrapperFor('/catalog'),
    });

    act(() => result.current.setMany({ city: 'Odesa', priceMax: 50000 }));
    expect(result.current.filters).toMatchObject({ city: 'Odesa', priceMax: 50000 });
  });

  it('reset clears all filters', () => {
    const { result } = renderHook(() => useUrlFilters(), {
      wrapper: wrapperFor('/catalog?city=Kyiv&type=house'),
    });

    act(() => result.current.reset());
    expect(result.current.filters).toEqual({});
  });

  it('toApiParams flattens amenities arrays back into a CSV string', () => {
    const { result } = renderHook(() => useUrlFilters(), {
      wrapper: wrapperFor('/catalog?amenities=wifi,tv&city=Kyiv'),
    });

    expect(result.current.toApiParams()).toEqual({ amenities: 'wifi,tv', city: 'Kyiv' });
  });
});
