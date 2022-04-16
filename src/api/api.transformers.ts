import { QueryParamName, UserSuppliedQueryParams } from './api.types';

export const getRawParam = (query: UserSuppliedQueryParams, id: QueryParamName): string | undefined => query[id];

/** Parses the query parameter with the given ID as a number. Returns the default value if the param is not specified. */
export const toNumber = (query: UserSuppliedQueryParams, id: QueryParamName, fallback: number): number => {
  const param = getRawParam(query, id);
  // Number('') => 0, so check this explicitly
  if (!param) return fallback;
  return Number(param);
};

/** Parses the query parameter with the given ID as a comma-separated string array. */
export const toCommaSeparatedList = (query: UserSuppliedQueryParams, id: QueryParamName): string[] | undefined => {
  const rawValue = getRawParam(query, id);
  return rawValue?.split(',').map((el) => el.trim());
};

/** Parses the query parameter with the given ID as a boolean value corresponding to a checkbox's checked state. */
export const toCheckboxBoolean = (query: UserSuppliedQueryParams, id: QueryParamName): boolean => {
  // Fall back to false if the query param does not exist in the URL. HTML does not serialize checkboxes that are turned off.
  const rawValue = getRawParam(query, id) ?? 'false';
  // By default, HTML serializes checkboxes to `'on'` if they're checked. But our API also internally accepts `'true'`.
  return rawValue === 'on' || rawValue === 'true';
};
