import { QueryParamId, UserSuppliedQueryParams } from './api.types';

export const getRawParam = (query: UserSuppliedQueryParams, id: string): string | undefined => query[id];

/** Parses the query parameter with the given ID as a number. Returns the default value if the param is not specified. */
export const parseNumber = (query: UserSuppliedQueryParams, id: string, fallback: number): number => {
  const param = getRawParam(query, id) ?? fallback;
  if (typeof param === 'string' && !param) return NaN;
  return Number(param);
};

/** Parses the query parameter with the given ID as a boolean value corresponding to a checkbox's checked state. */
export const parseCheckboxBoolean = (query: UserSuppliedQueryParams, id: string, fallback = false): boolean => {
  const rawValue = getRawParam(query, id);

  // HTML forms don't bother serializing checkboxes if they aren't checked. So fall back to false if the query param does not exist in the URL.
  if (typeof rawValue === 'undefined') {
    return false;
  }

  // If however the query param exists but is an empty string (e.g., `?booleanWithNoValue`), return the expected default
  if (!rawValue) {
    return fallback;
  }

  // Interpret the string as a boolean. Note that by default, HTML forms serialize checkboxes to `'on'` if they're checked. But our API also internally accepts `'true'` as a valid alias for `'on'` since it's a bit more intuitive.
  return rawValue === 'on' || rawValue === 'true';
};
