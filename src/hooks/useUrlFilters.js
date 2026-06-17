import { useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

const NUM_KEYS = ['priceMin', 'priceMax', 'roomsMin', 'roomsMax', 'areaMin', 'areaMax'];

export function useUrlFilters() {
  const [params, setParams] = useSearchParams();

  const filters = useMemo(() => {
    const out = {};
    for (const [k, v] of params.entries()) {
      if (!v) continue;
      if (k === 'amenities') out[k] = v.split(',').filter(Boolean);
      else if (NUM_KEYS.includes(k)) out[k] = Number(v);
      else out[k] = v;
    }
    return out;
  }, [params]);

  const setFilter = useCallback(
    (key, value) => {
      const next = new URLSearchParams(params);
      const v =
        Array.isArray(value) ? value.join(',') : value === '' || value == null ? '' : String(value);
      if (!v) next.delete(key);
      else next.set(key, v);
      setParams(next, { replace: true });
    },
    [params, setParams],
  );

  const setMany = useCallback(
    (patch) => {
      const next = new URLSearchParams(params);
      for (const [k, value] of Object.entries(patch)) {
        const v =
          Array.isArray(value) ? value.join(',') : value === '' || value == null ? '' : String(value);
        if (!v) next.delete(k);
        else next.set(k, v);
      }
      setParams(next, { replace: true });
    },
    [params, setParams],
  );

  const reset = useCallback(() => setParams(new URLSearchParams(), { replace: true }), [setParams]);

  const toApiParams = useCallback(() => {
    const out = {};
    for (const [k, v] of Object.entries(filters)) {
      out[k] = Array.isArray(v) ? v.join(',') : v;
    }
    return out;
  }, [filters]);

  return { filters, setFilter, setMany, reset, toApiParams };
}
