import { DEFAULT_FONT_FAMILY } from '../constants';
import typeScaleRatios from '../data/typeScaleRatios.json';
import { isNumber, throwIf } from '../utils';
import { getRawParam, toCheckboxBoolean, toCommaSeparatedList, toNumber } from './api.transformers';
import type { QueryParamConfig } from './api.types';
import {
  isCommaSeparatedList,
  isValidCheckedValue,
  throwIfNegative,
  throwIfNotInteger,
  throwIfNotPositive,
} from './api.validators';

/** A config describing all of the valid query parameters recognized by the app on both the server side and client side (as input names).
 * Each query param supplies functions for validating its own data, either on its own or in relation to other query params, as well as for
 * transforming the raw query param string to the desired value.
 */
export const QUERY_PARAM_CONFIG: QueryParamConfig = {
  minFontSize: {
    id: 'minFontSize',
    default: 16,
    getValue(query) {
      return toNumber(query, this.id, this.default);
    },
    validate({ query }) {
      throwIfNotPositive(this.id, this.getValue(query));
    },
  },
  minWidth: {
    id: 'minWidth',
    default: 400,
    getValue(query) {
      return toNumber(query, this.id, this.default);
    },
    // This is a good example of why the validator functions accept the raw query string and a reference to the entire config:
    // Sometimes, validating one query param requires checking another query param. If the validator were to only accept the current value
    // for this particular query param, that would not be possible.
    validate({ config, query }) {
      const minScreenWidth = this.getValue(query);
      const maxScreenWidth = config.maxWidth.getValue(query);
      throwIfNotPositive(this.id, this.getValue(query));
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
      return toNumber(query, this.id, this.default);
    },
    validate({ query }) {
      throwIfNotPositive(this.id, this.getValue(query));
    },
  },
  maxFontSize: {
    id: 'maxFontSize',
    default: 19,
    getValue(query) {
      return toNumber(query, this.id, this.default);
    },
    validate({ query }) {
      throwIfNotPositive(this.id, this.getValue(query));
    },
  },
  maxWidth: {
    id: 'maxWidth',
    default: 1280,
    getValue(query) {
      return toNumber(query, this.id, this.default);
    },
    validate({ query, config }) {
      const minScreenWidth = config.minWidth.getValue(query);
      const maxScreenWidth = this.getValue(query);
      throwIf(!isNumber(maxScreenWidth), `${this.id} must be a number.`);
      throwIfNegative(this.id, maxScreenWidth);
      throwIf(maxScreenWidth <= minScreenWidth, `${this.id} must be greater than ${config.minWidth.id}.`);
    },
  },
  maxRatio: {
    id: 'maxRatio',
    default: typeScaleRatios.perfectFourth.ratio,
    getValue(query) {
      return toNumber(query, this.id, this.default);
    },
    validate({ query }) {
      throwIfNotPositive(this.id, this.getValue(query));
    },
  },
  steps: {
    id: 'steps',
    default: ['sm', 'base', 'md', 'lg', 'xl', 'xxl', 'xxxl'],
    getValue(query) {
      return toCommaSeparatedList(query, this.id) ?? this.default;
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
      return getRawParam(query, this.id) ?? this.default;
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
      return getRawParam(query, this.id) ?? this.default;
    },
    validate({ query }) {
      throwIf(!this.getValue(query), `${this.id} must be a non-empty string`);
    },
  },
  useRems: {
    id: 'useRems',
    default: true,
    getValue(query) {
      return toCheckboxBoolean(query, this.id);
    },
    validate({ query }) {
      const rawValue = getRawParam(query, this.id);
      throwIf(
        !!rawValue && !isValidCheckedValue(rawValue),
        `${this.id} must be 'on', 'true', or 'false' if specified.`
      );
    },
  },
  decimals: {
    id: 'decimals',
    default: 2,
    max: 10,
    getValue(query) {
      return toNumber(query, this.id, this.default);
    },
    validate({ query }) {
      const decimalPlaces = this.getValue(query);
      throwIfNegative(this.id, decimalPlaces);
      throwIfNotInteger(this.id, decimalPlaces);
      throwIf(decimalPlaces > this.max, `${this.id} cannot exceed ${this.max}.`);
    },
  },
  previewFont: {
    id: 'previewFont',
    default: DEFAULT_FONT_FAMILY,
    getValue(query) {
      return getRawParam(query, this.id) ?? this.default;
    },
    validate({ query, fonts }) {
      const font = this.getValue(query);
      const isUnrecognizedFont = !fonts.includes(font);
      throwIf(isUnrecognizedFont, `${font} is not a recognized Google Font.`);
    },
  },
};
