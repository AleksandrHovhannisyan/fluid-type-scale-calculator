import { DEFAULT_FONT_FAMILY } from '../constants';
import typeScaleRatios from '../data/typeScaleRatios.json';
import { isNumber, throwIf } from '../utils';
import type { QueryParamConfig, QueryParamName, UserSuppliedQueryParams } from './api.types';
import { isCommaSeparatedList, isValidCheckedValue, validatePositiveNumericParam } from './api.validators';

// TODO: single parser that accepts a type flag and runs a switch

/** Helper to return a query param by key, if it exists. */
export const parseRawParam = (query: UserSuppliedQueryParams, id: QueryParamName): string | undefined => query[id];

/** Helper that fetches the given key from query params, expecting to find a string that looks like a number. If the param does not exist,
 * returns the fallback. Else, returns the parsed param as a number. */
export const parseNumericParam = (query: UserSuppliedQueryParams, id: QueryParamName, fallback: number): number => {
  const param = parseRawParam(query, id) ?? fallback;
  if (typeof param === 'string' && !param) return NaN;
  return Number(param);
};

/** A config describing all of the valid query parameters recognized by the app on both the server side and client side (as input names).
 * Each query param supplies functions for validating its own data, either on its own or in relation to other query params, as well as for
 * transforming the raw query param string to the desired value.
 */
export const QUERY_PARAM_CONFIG: QueryParamConfig = {
  minFontSize: {
    id: 'minFontSize',
    default: 16,
    getValue(query) {
      return parseNumericParam(query, this.id, this.default);
    },
    validate({ query }) {
      validatePositiveNumericParam(this.id, this.getValue(query));
    },
  },
  minWidth: {
    id: 'minWidth',
    default: 400,
    getValue(query) {
      return parseNumericParam(query, this.id, this.default);
    },
    validate({ config, query }) {
      const minScreenWidth = this.getValue(query);
      const maxScreenWidth = config.maxWidth.getValue(query);
      validatePositiveNumericParam(this.id, this.getValue(query));
      throwIf(
        minScreenWidth >= maxScreenWidth,
        `${this.id} (${minScreenWidth}) must be less than ${config.maxWidth.id} (${maxScreenWidth}).`
      );
    },
  },
  minRatio: {
    id: 'minRatio',
    default: typeScaleRatios.majorThird.ratio,
    getValue(query) {
      return parseNumericParam(query, this.id, this.default);
    },
    validate({ query }) {
      validatePositiveNumericParam(this.id, this.getValue(query));
    },
  },
  maxFontSize: {
    id: 'maxFontSize',
    default: 19,
    getValue(query) {
      return parseNumericParam(query, this.id, this.default);
    },
    validate({ query }) {
      validatePositiveNumericParam(this.id, this.getValue(query));
    },
  },
  maxWidth: {
    id: 'maxWidth',
    default: 1280,
    getValue(query) {
      return parseNumericParam(query, this.id, this.default);
    },
    validate({ query, config }) {
      const minScreenWidth = config.minWidth.getValue(query);
      const maxScreenWidth = this.getValue(query);
      throwIf(!isNumber(maxScreenWidth), `${this.id} must be a number.`);
      throwIf(maxScreenWidth < 0, `${this.id} cannot be negative.`);
      throwIf(maxScreenWidth <= minScreenWidth, `${this.id} must be greater than ${config.minWidth.id}.`);
    },
  },
  maxRatio: {
    id: 'maxRatio',
    default: typeScaleRatios.perfectFourth.ratio,
    getValue(query) {
      return parseNumericParam(query, this.id, this.default);
    },
    validate({ query }) {
      validatePositiveNumericParam(this.id, this.getValue(query));
    },
  },
  steps: {
    id: 'steps',
    default: ['sm', 'base', 'md', 'lg', 'xl', 'xxl', 'xxxl'],
    getValue(query) {
      return parseRawParam(query, this.id)?.split(',') ?? this.default;
    },
    validate({ query, config }) {
      const allSteps = this.getValue(query);
      const baseStep = config.baseStep.getValue(query);
      throwIf(!allSteps.includes(baseStep), `${this.id} (${allSteps}) does not include the base step (${baseStep}).`);
      // While this may seem like it will never throw, imagine a scenario where a user enters x,y;z. Splitting it yields ['x', 'y;z'].
      // And our regex strictly requires that each item in the list only use alphanumeric characters.
      throwIf(!isCommaSeparatedList(allSteps.join(',')), `${this.id} must be a comma-separated list of step names.`);
    },
  },
  baseStep: {
    id: 'baseStep',
    default: 'base',
    getValue(query) {
      return parseRawParam(query, this.id) ?? this.default;
    },
    validate({ config, query }) {
      const baseStep = this.getValue(query);
      const allSteps = config.steps.getValue(query);
      throwIf(
        !allSteps.includes(baseStep),
        `The base step ${baseStep} was not found in the list of all steps (${allSteps}).`
      );
    },
  },
  prefix: {
    id: 'prefix',
    default: 'font-size',
    getValue(query) {
      return parseRawParam(query, this.id) ?? this.default;
    },
    validate({ query }) {
      const namingConvention = this.getValue(query);
      throwIf(!namingConvention.length, `${this.id} must be a non-empty string`);
    },
  },
  useRems: {
    id: 'useRems',
    default: true,
    getValue(query) {
      const rawValue = parseRawParam(query, this.id) ?? 'false';
      return rawValue === 'true' || rawValue === 'on';
    },
    validate({ query }) {
      const rawValue = parseRawParam(query, this.id);
      if (!rawValue) return this.default;
      throwIf(!isValidCheckedValue(rawValue), `${this.id} must be 'on', 'true', or 'false' if specified.`);
    },
  },
  decimals: {
    id: 'decimals',
    default: 2,
    max: 10,
    getValue(query) {
      return parseNumericParam(query, this.id, this.default);
    },
    validate({ query }) {
      const decimalPlaces = this.getValue(query);
      throwIf(decimalPlaces < 0, `${this.id} cannot be negative.`);
      throwIf(!Number.isInteger(decimalPlaces), `${this.id} must be an integer.`);
      throwIf(decimalPlaces > this.max, `${this.id} cannot exceed ${this.max}.`);
    },
  },
  previewFont: {
    id: 'previewFont',
    default: DEFAULT_FONT_FAMILY,
    getValue(query) {
      return parseRawParam(query, this.id) ?? this.default;
    },
    validate({ query, fonts }) {
      const font = this.getValue(query);
      const isUnrecognizedFont = !fonts.includes(font);
      throwIf(isUnrecognizedFont, `${font} is not a recognized Google Font.`);
    },
  },
};
