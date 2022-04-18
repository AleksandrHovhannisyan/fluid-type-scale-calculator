import { QueryParamName, UserSuppliedQueryParams } from './api.types';

export const getRawParam = (query: UserSuppliedQueryParams, id: string): string | undefined => query[id];

/** Parses the query parameter with the given ID as a number. Returns the default value if the param is not specified. */
export const parseNumber = (query: UserSuppliedQueryParams, id: string, fallback: number): number => {
  const param = getRawParam(query, id) ?? fallback;
  if (typeof param === 'string' && !param) return NaN;
  return Number(param);
};

/** Parses the query parameter with the given ID as a boolean value corresponding to a checkbox's checked state. */
export const parseCheckboxBoolean = (query: UserSuppliedQueryParams, id: string): boolean => {
  // Fall back to false if the query param does not exist in the URL. HTML does not serialize checkboxes that are turned off.
  const rawValue = getRawParam(query, id) ?? 'false';
  // By default, HTML serializes checkboxes to `'on'` if they're checked. But our API also internally accepts `'true'`.
  return rawValue === 'on' || rawValue === 'true';
};
