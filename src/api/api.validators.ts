import { COMMA_SEPARATED_LIST_REGEX } from '../constants';
import { throwIf } from '../utils';
import { QueryParamName, QueryParamValidatorOptions } from './api.types';

/** Returns `true` if the given number is a valid number. */
export const isNumber = (value: string | number) => !Number.isNaN(+value);

/** Returns `true` if the given value represents a valid checkbox state. */
export const isValidCheckedValue = (value: string) => {
  // 'on' is how checkboxes are serialized by default in HTML, but we also support true/false for semantics
  return value === 'on' || value === 'true' || value === 'false';
};

/** Returns `true` if the given string represents a valid comma-separated list. */
export const isCommaSeparatedList = (value: string) => {
  return COMMA_SEPARATED_LIST_REGEX.test(value);
};

/** Performs common validation logic for numeric query params (e.g., checking that it's a valid number and positive). */
export const validatePositiveNumericParam = (id: QueryParamName, value: number) => {
  throwIf(!isNumber(value), `${id} must be a number.`);
  throwIf(value <= 0, `${id} must be a positive number.`);
};

/** Validates user-supplied query params based on a config of valid query params and other data supplied to the app (e.g., font family names).
 * Throws an error if any of the user-supplied query params are unrecognized or invalid.
 */
export const validateQueryParams = (options: QueryParamValidatorOptions) => {
  Object.keys(options.query).forEach((id) => {
    const param = options.config[id as QueryParamName];
    throwIf(!param, `${id} is not a recognized query parameter.`);
    param.validate(options);
  });
};
