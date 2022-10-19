import { isNumber, throwIf } from '../utils';
import { schema } from './schema';
import { QueryParamId, QueryValidatorOptions } from './schema.types';

/** Returns `true` if the given value represents a valid checkbox state. */
export const isValidCheckedValue = (value: string) => {
  // 'on' is how checkboxes are serialized by default in HTML, but we also support true/false for semantics
  return value === 'on' || value === 'true' || value === 'false';
};

/** Validates a numeric param, throwing an error if it's `NaN`. */
export const throwIfNaN = (id: string, value: number) => {
  throwIf(!isNumber(value), `${id} must be a number.`);
};

/** Validates a numeric param, throwing an error if the value is not an integer. */
export const throwIfNotInteger = (id: string, value: number) => {
  throwIf(!Number.isInteger(value), `${id} must be an integer.`);
};

/** Validates a numeric param, throwing an error if it exceeds either of its bounds. */
export const throwIfOutOfBounds = (id: string, value: number, bounds: { min?: number; max?: number }) => {
  const { min, max } = bounds;
  throwIf(typeof min !== 'undefined' && value < min, `${id} must be greater than or equal to ${min}.`);
  throwIf(typeof max !== 'undefined' && value > max, `${id} must be less than or equal to ${max}.`);
};

/** Validates a boolean query parameters. By default, forms serialize checkboxes to `'on'` if specified and omit it otherwise.
 * We also support `'true'` and `'false'` internally for semantics. */
export const throwIfInvalidCheckboxBoolean = (id: string, rawValue?: string) => {
  throwIf(!!rawValue && !isValidCheckedValue(rawValue), `${id} must be 'on', 'true', or 'false' if specified.`);
};

/** Validates user-supplied query params based on a config of valid query params and other data supplied to the app (e.g., font family names).
 * Throws an error if any of the user-supplied query params are unrecognized or invalid.
 */
export const validateQueryParams = (options: QueryValidatorOptions) => {
  Object.keys(options.query).forEach((id) => {
    const isRecognizedParam = id in schema;
    throwIf(!isRecognizedParam, `${id} is not a recognized query parameter.`);
    const queryParam = schema[id as QueryParamId];
    queryParam.validate(options);
  });
};
