import { ParsedUrlQuery } from 'querystring';
import { queryParamConstraints, queryParamDefaults, QueryParamKey } from '../api/api.constants';
import { COMMA_SEPARATED_LIST_REGEX } from '../constants';
import { WithFonts } from '../types';
import { isNumber, throwIf } from '../utils';
import type { QueryParamConfig, QueryParamList, QueryParamValues, ValidatedQueryParam } from './api.types';

/** Performs common validation logic for numeric query params (e.g., checking that it's a valid number and positive). */
const validatePositiveNumericParam = (id: QueryParamKey, value: number) => {
  throwIf(!isNumber(value), `${id} must be a number.`);
  throwIf(value <= 0, `${id} must be a positive number.`);
};

/** Helper to return a query param by key, if it exists. */
const parseRawParam = (query: QueryParamList, id: QueryParamKey): string | undefined => query[id];

/** Helper that fetches the given key from query params, expecting to find a string that looks like a number. If the param does not exist,
 * returns the fallback. Else, returns the parsed param as a number. */
const parseNumericParam = (query: QueryParamList, id: QueryParamKey, fallback: number): number => {
  const param = parseRawParam(query, id) ?? fallback;
  if (typeof param === 'string' && !param) return NaN;
  return Number(param);
};

/** Parses query parameters from the given query and returns a config describing each param and its constraints.
 * If a param is not present in the `ParsedUrlQuery`, it will default to the corresponding fallback specified in options.
 */
export const getQueryParamConfig = (
  queryString: ParsedUrlQuery,
  options: WithFonts & {
    /** An optional map specifying the default value for each query param. */
    defaults?: QueryParamValues;
  }
): QueryParamConfig => {
  const query = queryString as Record<QueryParamKey, string>;
  const defaults = options.defaults ?? queryParamDefaults;

  // TODO: what if getValue accepts the query string as an argument? Then we can lift this out of here entirely and into a constant.
  // Each param would also have a default on its own config and any other constraints on there as well. No need for separate objects.
  const queryParamConfig: QueryParamConfig = {
    [QueryParamKey.minFontSize]: {
      id: QueryParamKey.minFontSize,
      getValue() {
        return parseNumericParam(query, this.id, defaults[this.id]);
      },
      validate() {
        validatePositiveNumericParam(this.id, this.getValue());
      },
    },
    [QueryParamKey.minScreenWidth]: {
      id: QueryParamKey.minScreenWidth,
      getValue() {
        return parseNumericParam(query, this.id, defaults[this.id]);
      },
      validate(config) {
        const minScreenWidth = this.getValue();
        const maxScreenWidth = config[QueryParamKey.maxScreenWidth].getValue();
        validatePositiveNumericParam(this.id, this.getValue());
        throwIf(minScreenWidth >= maxScreenWidth, `${this.id} must be less than ${QueryParamKey.maxScreenWidth}.`);
      },
    },
    [QueryParamKey.minRatio]: {
      id: QueryParamKey.minRatio,
      getValue() {
        return parseNumericParam(query, this.id, defaults[this.id]);
      },
      validate() {
        validatePositiveNumericParam(this.id, this.getValue());
      },
    },
    [QueryParamKey.maxFontSize]: {
      id: QueryParamKey.maxFontSize,
      getValue() {
        return parseNumericParam(query, this.id, defaults[this.id]);
      },
      validate() {
        validatePositiveNumericParam(this.id, this.getValue());
      },
    },
    [QueryParamKey.maxScreenWidth]: {
      id: QueryParamKey.maxScreenWidth,
      getValue() {
        return parseNumericParam(query, this.id, defaults[this.id]);
      },
      validate(config) {
        const minScreenWidth = config[QueryParamKey.minScreenWidth].getValue();
        const maxScreenWidth = this.getValue();
        throwIf(!isNumber(maxScreenWidth), `${this.id} must be a number.`);
        throwIf(maxScreenWidth < 0, `${this.id} cannot be negative.`);
        throwIf(maxScreenWidth <= minScreenWidth, `${this.id} must be greater than ${QueryParamKey.minScreenWidth}.`);
      },
    },
    [QueryParamKey.maxRatio]: {
      id: QueryParamKey.maxRatio,
      getValue() {
        return parseNumericParam(query, this.id, defaults[this.id]);
      },
      validate() {
        validatePositiveNumericParam(this.id, this.getValue());
      },
    },
    [QueryParamKey.allSteps]: {
      id: QueryParamKey.allSteps,
      getValue() {
        return parseRawParam(query, this.id)?.split(',') ?? defaults[this.id];
      },
      validate() {
        const isValid = COMMA_SEPARATED_LIST_REGEX.test(this.getValue().join(','));
        throwIf(!isValid, `${this.id} must be a comma-separated list of step names.`);
      },
    },
    [QueryParamKey.baseStep]: {
      id: QueryParamKey.baseStep,
      getValue() {
        return parseRawParam(query, this.id) ?? defaults[this.id];
      },
      validate(config) {
        const baseStep = this.getValue();
        const allSteps = config[QueryParamKey.allSteps].getValue();
        throwIf(!allSteps.includes(baseStep), `The base step '${baseStep}' was not found in the list of all steps.`);
      },
    },
    [QueryParamKey.namingConvention]: {
      id: QueryParamKey.namingConvention,
      getValue() {
        return parseRawParam(query, this.id) ?? defaults[this.id];
      },
      validate() {
        const namingConvention = this.getValue();
        throwIf(!namingConvention.length, `${this.id} must be a non-empty string`);
      },
    },
    [QueryParamKey.shouldUseRems]: {
      id: QueryParamKey.shouldUseRems,
      getValue() {
        const rawValue = parseRawParam(query, this.id) ?? 'false';
        return ['on', 'true'].includes(rawValue);
      },
    },
    [QueryParamKey.roundingDecimalPlaces]: {
      id: QueryParamKey.roundingDecimalPlaces,
      getValue() {
        return parseNumericParam(query, this.id, defaults[this.id]);
      },
      validate() {
        const decimalPlaces = this.getValue();
        const maxDecimalPlaces = queryParamConstraints[this.id]?.max;
        const exceedsMax = typeof maxDecimalPlaces !== 'undefined' && decimalPlaces > maxDecimalPlaces;
        throwIf(decimalPlaces < 0, `${this.id} cannot be negative.`);
        throwIf(!Number.isInteger(decimalPlaces), `${this.id} must be an integer.`);
        throwIf(exceedsMax, `${this.id} cannot exceed ${maxDecimalPlaces}.`);
      },
    },
    [QueryParamKey.fontFamily]: {
      id: QueryParamKey.fontFamily,
      getValue() {
        return parseRawParam(query, this.id) ?? defaults[this.id];
      },
      validate() {
        const font = this.getValue();
        const isUnrecognizedFont = !options.fonts.includes(font);
        throwIf(isUnrecognizedFont, `${font} is not a recognized Google Font.`);
      },
    },
  };

  return queryParamConfig;
};

/** Loops over all query params in the supplied config and runs each param's validator function.
 * If any query param is invalid, it will throw an error with a descriptive message.
 */
export const validateQueryParams = (queryParamConfig: QueryParamConfig) => {
  Object.values(queryParamConfig).forEach((param) => {
    param.validate?.(queryParamConfig);
  });
};
