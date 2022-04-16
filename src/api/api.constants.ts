import { DEFAULT_FONT_FAMILY } from '../constants';
import typeScaleRatios from '../data/typeScaleRatios.json';
import { throwIf, toCommaSeparatedList } from '../utils';
import { getRawParam, parseCheckboxBoolean, parseNumber } from './api.transformers';
import type { QueryParamConfig } from './api.types';
import {
  isCommaSeparatedList,
  isValidCheckedValue,
  throwIfNaN,
  throwIfNotInteger,
  throwIfOutOfBounds,
} from './api.validators';

/** A config describing all of the valid query parameters recognized by the app on both the server side and client side (as input names).
 * Each query param supplies functions for validating its own data, either on its own or in relation to other query params, as well as for
 * transforming the raw query param string to the desired value.
 */
export const QUERY_PARAM_CONFIG: QueryParamConfig = {
  minFontSize: {
    id: 'minFontSize',
    default: 16,
    min: 0,
    getValue(query) {
      return parseNumber(query, this.id, this.default);
    },
    validate({ query }) {
      const minFontSize = this.getValue(query);
      throwIfNaN(this.id, minFontSize);
      throwIfOutOfBounds(this.id, minFontSize, { min: this.min, max: this.max });
    },
  },
  minWidth: {
    id: 'minWidth',
    default: 400,
    min: 0,
    getValue(query) {
      return parseNumber(query, this.id, this.default);
    },
    // This is a good example of why the validator functions accept the raw query string and a reference to the entire config:
    // Sometimes, validating one query param requires checking another query param. If the validator were to only accept the current value
    // for this particular query param, that would not be possible.
    validate({ config, query }) {
      const minScreenWidth = this.getValue(query);
      const maxScreenWidth = config.maxWidth.getValue(query);
      throwIfNaN(this.id, minScreenWidth);
      throwIfOutOfBounds(this.id, minScreenWidth, { min: this.min, max: maxScreenWidth - 1 });
    },
  },
  minRatio: {
    id: 'minRatio',
    default: typeScaleRatios.majorThird.ratio,
    min: 0,
    getValue(query) {
      return parseNumber(query, this.id, this.default);
    },
    validate({ query }) {
      const minRatio = this.getValue(query);
      throwIfNaN(this.id, minRatio);
      throwIfOutOfBounds(this.id, minRatio, { min: this.min, max: this.max });
    },
  },
  maxFontSize: {
    id: 'maxFontSize',
    default: 19,
    min: 0,
    getValue(query) {
      return parseNumber(query, this.id, this.default);
    },
    validate({ query }) {
      const maxFontSize = this.getValue(query);
      throwIfNaN(this.id, maxFontSize);
      throwIfOutOfBounds(this.id, maxFontSize, { min: this.min, max: this.max });
    },
  },
  maxWidth: {
    id: 'maxWidth',
    default: 1280,
    getValue(query) {
      return parseNumber(query, this.id, this.default);
    },
    validate({ query, config }) {
      const minScreenWidth = config.minWidth.getValue(query);
      const maxScreenWidth = this.getValue(query);
      throwIfNaN(this.id, maxScreenWidth);
      throwIfOutOfBounds(this.id, maxScreenWidth, { min: minScreenWidth + 1, max: this.max });
    },
  },
  maxRatio: {
    id: 'maxRatio',
    default: typeScaleRatios.perfectFourth.ratio,
    min: 0,
    getValue(query) {
      return parseNumber(query, this.id, this.default);
    },
    validate({ query }) {
      const maxRatio = this.getValue(query);
      throwIfNaN(this.id, maxRatio);
      throwIfOutOfBounds(this.id, maxRatio, { min: this.min, max: this.max });
    },
  },
  steps: {
    id: 'steps',
    default: ['sm', 'base', 'md', 'lg', 'xl', 'xxl', 'xxxl'],
    getValue(query) {
      const rawString = getRawParam(query, this.id);
      if (!rawString) return this.default;
      return toCommaSeparatedList(rawString);
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
      return parseCheckboxBoolean(query, this.id);
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
    min: 0,
    max: 10,
    getValue(query) {
      return parseNumber(query, this.id, this.default);
    },
    validate({ query }) {
      const decimalPlaces = this.getValue(query);
      throwIfNaN(this.id, decimalPlaces);
      throwIfNotInteger(this.id, decimalPlaces);
      throwIfOutOfBounds(this.id, decimalPlaces, { min: this.min, max: this.max });
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
