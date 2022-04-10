import { ParsedUrlQuery } from 'querystring';
import { queryParamConstraints, queryParamDefaults, QueryParamKey } from '../api/api.constants';
import { COMMA_SEPARATED_LIST_REGEX } from '../constants';
import { WithFonts } from '../types';
import { isNumber, throwIf } from '../utils';
import type { QueryParamConfig, QueryParamValues, ValidatedQueryParam } from './api.types';

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

  /** Helper to return a query param by key, if it exists. */
  const parseRawParam = (key: keyof typeof QueryParamKey): string | undefined => query[QueryParamKey[key]];

  /** Helper that fetches the given key from query params, expecting to find a string that looks like a number. If the param does not exist,
   * returns the fallback. Else, returns the parsed param as a number. */
  const parseNumericParam = (key: keyof typeof QueryParamKey, fallback: number): number => {
    const param = parseRawParam(key) ?? fallback;
    if (typeof param === 'string' && !param) return NaN;
    return Number(param);
  };

  /** Performs common validation logic for numeric query params (e.g., checking that it's a valid number and positive). */
  const validatePositiveNumericParam = (id: QueryParamKey, value: number) => {
    throwIf(!isNumber(value), `${id} must be a number.`);
    throwIf(value <= 0, `${id} must be a positive number.`);
  };

  const queryParamConfig: QueryParamConfig = {
    [QueryParamKey.minFontSize]: {
      id: QueryParamKey.minFontSize,
      value: parseNumericParam('minFontSize', defaults[QueryParamKey.minFontSize]),
      validate: (id, value, _config) => {
        validatePositiveNumericParam(id, value);
      },
    },
    [QueryParamKey.minScreenWidth]: {
      id: QueryParamKey.minScreenWidth,
      value: parseNumericParam('minScreenWidth', defaults[QueryParamKey.minScreenWidth]),
      validate: (id, value, config) => {
        const maxScreenWidth = config[QueryParamKey.maxScreenWidth].value;
        validatePositiveNumericParam(id, value);
        throwIf(value >= maxScreenWidth, `${id} must be strictly less than ${QueryParamKey.maxScreenWidth}.`);
      },
    },
    [QueryParamKey.minRatio]: {
      id: QueryParamKey.minRatio,
      value: parseNumericParam('minRatio', defaults[QueryParamKey.minRatio]),
      validate: (id, value, _config) => {
        validatePositiveNumericParam(id, value);
      },
    },
    [QueryParamKey.maxFontSize]: {
      id: QueryParamKey.maxFontSize,
      value: parseNumericParam('maxFontSize', defaults[QueryParamKey.maxFontSize]),
      validate: (id, value, _config) => {
        validatePositiveNumericParam(id, value);
      },
    },
    [QueryParamKey.maxScreenWidth]: {
      id: QueryParamKey.maxScreenWidth,
      value: parseNumericParam('maxScreenWidth', defaults[QueryParamKey.maxScreenWidth]),
      validate: (id, value, config) => {
        const minScreenWidth = config[QueryParamKey.minScreenWidth].value;
        throwIf(!isNumber(value), `${id} must be a number.`);
        throwIf(value < 0, `${id} cannot be negative.`);
        throwIf(value <= minScreenWidth, `${id} must be strictly greater than ${QueryParamKey.minScreenWidth}.`);
      },
    },
    [QueryParamKey.maxRatio]: {
      id: QueryParamKey.maxRatio,
      value: parseNumericParam('maxRatio', defaults[QueryParamKey.maxRatio]),
      validate: (id, value, _config) => {
        validatePositiveNumericParam(id, value);
      },
    },
    [QueryParamKey.allSteps]: {
      id: QueryParamKey.allSteps,
      value: parseRawParam('allSteps')?.split(',') ?? defaults[QueryParamKey.allSteps],
      validate: (id, value, _config) => {
        const isValid = COMMA_SEPARATED_LIST_REGEX.test(value.join(','));
        throwIf(!isValid, `${id} must be a comma-separated list of step names.`);
      },
    },
    [QueryParamKey.baseStep]: {
      id: QueryParamKey.baseStep,
      value: parseRawParam('baseStep') ?? defaults[QueryParamKey.baseStep],
      validate: (id, value, config) => {
        const allSteps = config[QueryParamKey.allSteps].value;
        throwIf(!allSteps.includes(value), `The base step '${value}' was not found in the list of all steps.`);
      },
    },
    [QueryParamKey.namingConvention]: {
      id: QueryParamKey.namingConvention,
      value: parseRawParam('namingConvention') ?? defaults[QueryParamKey.namingConvention],
      validate: (id, value, _config) => {
        const isEmpty = !value.length;
        throwIf(isEmpty, `${id} must be a non-empty string`);
      },
    },
    [QueryParamKey.shouldUseRems]: {
      id: QueryParamKey.shouldUseRems,
      value: parseRawParam('shouldUseRems') === 'on',
      validate: (_value, _config) => true,
    },
    [QueryParamKey.roundingDecimalPlaces]: {
      id: QueryParamKey.roundingDecimalPlaces,
      value: parseNumericParam('roundingDecimalPlaces', defaults[QueryParamKey.roundingDecimalPlaces]),
      validate: (id, value, _config) => {
        const max = queryParamConstraints[QueryParamKey.roundingDecimalPlaces]?.max;
        throwIf(value < 0, `${id} cannot be negative.`);
        throwIf(!Number.isInteger(value), `${id} must be an integer.`);
        throwIf(!!max && value > max, `${id} cannot exceed ${max}.`);
      },
    },
    [QueryParamKey.fontFamily]: {
      id: QueryParamKey.fontFamily,
      value: parseRawParam('fontFamily') ?? defaults[QueryParamKey.fontFamily],
      validate: (id, value, _config) =>
        throwIf(
          !options.fonts.includes(value),
          `${value} is not a recognized Google Font. Custom fonts are not supported.`
        ),
    },
  };

  return queryParamConfig;
};

/** Loops over all query params in the supplied config and runs each param's validator function.
 * If any query param is invalid, it will throw an error with a descriptive message.
 */
export const validateQueryParams = (queryParamConfig: QueryParamConfig) => {
  Object.values(queryParamConfig).forEach((param) => {
    const validate = param.validate as ValidatedQueryParam<typeof param.value>['validate'];
    validate(param.id, param.value, queryParamConfig);
  });
};
