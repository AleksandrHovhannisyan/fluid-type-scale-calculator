import { ParsedUrlQuery } from 'querystring';
import { QueryParamKey } from '../api/api.constants';
import { COMMA_SEPARATED_LIST_REGEX } from '../components/FluidTypeScaleCalculator/Form/GroupTypeScaleSteps/GroupTypeScaleSteps.constants.';
import { DEFAULT_FONT_FAMILY, initialFormState } from '../constants';
import type { NarrowById } from '../types.generics';
import { isNumber, throwIf } from '../utils';
import type { QueryParam, QueryParamConfig, ValidatedQueryParam } from './api.types';

/** Returns the query parameter config entry corresponding to the param that has the specified ID/key. */
export const getQueryParam = <K extends QueryParam['id']>(
  queryParams: QueryParamConfig,
  key: K
): NarrowById<QueryParam, K> => queryParams[key];

// TODO: pass in fallbacks as an option to make this easier to test.
/** Parses query parameters from the given query and returns a config describing each param and its constraints.
 * If a param is not present in the `ParsedUrlQuery`, it will default to a fallback.
 */
export const getQueryParamConfig = (queryString: ParsedUrlQuery, options: { fonts: string[] }): QueryParamConfig => {
  const query = queryString as Record<QueryParamKey, string>;

  /** Helper to return a query param by key, if it exists, and an empty string otherwise. */
  const parseRawParam = (key: keyof typeof QueryParamKey): string | undefined => query[QueryParamKey[key]];

  /** Helper that fetches the given key from query params, expecting to find a string that looks like a number. If the param does not exist,
   * returns the fallback. If the param exists but is not of a numeric type, throws an error. Else, returns the parsed param as a number. */
  const parseNumericParam = (key: keyof typeof QueryParamKey, fallback: number): number => {
    const param = parseRawParam(key) ?? fallback;
    if (typeof param === 'string' && !param) return NaN;
    return Number(param);
  };

  const queryParamConfig: QueryParamConfig = {
    [QueryParamKey.minFontSize]: {
      id: QueryParamKey.minFontSize,
      value: parseNumericParam('minFontSize', initialFormState.min.fontSize),
      validate: (id, value, _config) => {
        throwIf(!isNumber(value), `${id} must be a number.`);
      },
    },
    [QueryParamKey.minScreenWidth]: {
      id: QueryParamKey.minScreenWidth,
      value: parseNumericParam('minScreenWidth', initialFormState.min.screenWidth),
      validate: (id, value, config) => {
        const maxScreenWidth = getQueryParam<QueryParamKey.maxScreenWidth>(config, QueryParamKey.maxScreenWidth).value;
        throwIf(!isNumber(value), `${id} must be a number.`);
        throwIf(value >= maxScreenWidth, `${id} must be strictly less than ${QueryParamKey.maxScreenWidth}.`);
      },
    },
    [QueryParamKey.minRatio]: {
      id: QueryParamKey.minRatio,
      value: parseNumericParam('minRatio', initialFormState.min.modularRatio),
      validate: (id, value, _config) => throwIf(!isNumber(value), `${id} must be a number.`),
    },
    [QueryParamKey.maxFontSize]: {
      id: QueryParamKey.maxFontSize,
      value: parseNumericParam('maxFontSize', initialFormState.max.fontSize),
      validate: (id, value, _config) => throwIf(!isNumber(value), `${id} must be a number`),
    },
    [QueryParamKey.maxScreenWidth]: {
      id: QueryParamKey.maxScreenWidth,
      value: parseNumericParam('maxScreenWidth', initialFormState.max.screenWidth),
      validate: (id, value, config) => {
        const minScreenWidth = getQueryParam<QueryParamKey.minScreenWidth>(config, QueryParamKey.minScreenWidth).value;
        throwIf(!isNumber(value), `${id} must be a number.`);
        throwIf(value <= minScreenWidth, `${id} must be strictly greater than ${QueryParamKey.minScreenWidth}.`);
      },
    },
    [QueryParamKey.maxRatio]: {
      id: QueryParamKey.maxRatio,
      value: parseNumericParam('maxRatio', initialFormState.max.modularRatio),
      validate: (id, value, _config) => throwIf(!isNumber(value), `${id} must be a number.`),
    },
    [QueryParamKey.allSteps]: {
      id: QueryParamKey.allSteps,
      value: parseRawParam('allSteps')?.split(',') ?? initialFormState.typeScaleSteps.all,
      validate: (id, value, _config) => {
        const isValid = COMMA_SEPARATED_LIST_REGEX.test(value.join(','));
        throwIf(!isValid, `${id} must be a comma-separated list of step names.`);
      },
    },
    [QueryParamKey.baseStep]: {
      id: QueryParamKey.baseStep,
      value: parseRawParam('baseStep') ?? initialFormState.typeScaleSteps.base,
      validate: (id, value, config) => {
        const allSteps = getQueryParam<QueryParamKey.allSteps>(config, QueryParamKey.allSteps).value;
        throwIf(!allSteps.includes(value), `The base step '${value}' was not found in the list of all steps.`);
      },
    },
    [QueryParamKey.namingConvention]: {
      id: QueryParamKey.namingConvention,
      value: parseRawParam('namingConvention') ?? initialFormState.namingConvention,
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
      value: parseNumericParam('roundingDecimalPlaces', initialFormState.roundingDecimalPlaces),
      validate: (id, value, config) => {
        throwIf(!isNumber(value), `${id} must be a number.`);
        const self = getQueryParam<QueryParamKey.roundingDecimalPlaces>(config, QueryParamKey.roundingDecimalPlaces);
        const isInRange = value >= self.min && value <= self.max;
        throwIf(!isInRange, `${id} must be at least ${self.min} and at most ${self.max}.`);
      },
      min: 0,
      max: 5,
    },
    [QueryParamKey.fontFamily]: {
      id: QueryParamKey.fontFamily,
      value: parseRawParam('fontFamily') ?? DEFAULT_FONT_FAMILY,
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
