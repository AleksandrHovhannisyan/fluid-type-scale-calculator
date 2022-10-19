import { DEFAULT_FONT_FAMILY } from '../constants';
import typeScaleRatios from '../data/typeScaleRatios.json';
import { isCommaSeparatedList, throwIf, toCommaSeparatedList } from '../utils';
import { parseCheckboxBoolean, parseNumber, parseRawValue } from './schema.parsers';
import { QueryParamId, QueryParamSchema } from './schema.types';
import { throwIfInvalidCheckboxBoolean, throwIfNaN, throwIfNotInteger, throwIfOutOfBounds } from './schema.validators';

/** A schema describing all of the valid query parameters recognized by the app on both the server side and client side (as input names).
 * Each query param supplies functions for validating its own data, either on its own or in relation to other query params, as well as for
 * transforming the raw query param string to the desired value.
 */
export const schema: QueryParamSchema = {
  [QueryParamId.minFontSize]: {
    id: QueryParamId.minFontSize,
    default: 16,
    min: 0,
    parse(query) {
      return parseNumber({ query, id: this.id, fallback: this.default });
    },
    validate({ query }) {
      const minFontSize = this.parse(query);
      throwIfNaN(this.id, minFontSize);
      throwIfOutOfBounds(this.id, minFontSize, { min: this.min, max: this.max });
    },
  },
  [QueryParamId.minWidth]: {
    id: QueryParamId.minWidth,
    default: 400,
    min: 0,
    parse(query) {
      return parseNumber({ query, id: this.id, fallback: this.default });
    },
    validate({ query }) {
      const minScreenWidth = this.parse(query);
      const maxScreenWidth = schema[QueryParamId.maxWidth].parse(query);
      throwIfNaN(this.id, minScreenWidth);
      throwIfOutOfBounds(this.id, minScreenWidth, { min: this.min, max: maxScreenWidth - 1 });
    },
  },
  [QueryParamId.minRatio]: {
    id: QueryParamId.minRatio,
    default: typeScaleRatios.majorThird.ratio,
    min: 0,
    parse(query) {
      return parseNumber({ query, id: this.id, fallback: this.default });
    },
    validate({ query }) {
      const minRatio = this.parse(query);
      throwIfNaN(this.id, minRatio);
      throwIfOutOfBounds(this.id, minRatio, { min: this.min, max: this.max });
    },
  },
  [QueryParamId.maxFontSize]: {
    id: QueryParamId.maxFontSize,
    default: 19,
    min: 0,
    parse(query) {
      return parseNumber({ query, id: this.id, fallback: this.default });
    },
    validate({ query }) {
      const maxFontSize = this.parse(query);
      throwIfNaN(this.id, maxFontSize);
      throwIfOutOfBounds(this.id, maxFontSize, { min: this.min, max: this.max });
    },
  },
  [QueryParamId.maxWidth]: {
    id: QueryParamId.maxWidth,
    default: 1280,
    parse(query) {
      return parseNumber({ query, id: this.id, fallback: this.default });
    },
    validate({ query }) {
      const minScreenWidth = schema[QueryParamId.minWidth].parse(query);
      const maxScreenWidth = this.parse(query);
      throwIfNaN(this.id, maxScreenWidth);
      throwIfOutOfBounds(this.id, maxScreenWidth, { min: minScreenWidth + 1, max: this.max });
    },
  },
  [QueryParamId.maxRatio]: {
    id: QueryParamId.maxRatio,
    default: typeScaleRatios.perfectFourth.ratio,
    min: 0,
    parse(query) {
      return parseNumber({ query, id: this.id, fallback: this.default });
    },
    validate({ query }) {
      const maxRatio = this.parse(query);
      throwIfNaN(this.id, maxRatio);
      throwIfOutOfBounds(this.id, maxRatio, { min: this.min, max: this.max });
    },
  },
  [QueryParamId.allSteps]: {
    id: QueryParamId.allSteps,
    default: ['sm', 'base', 'md', 'lg', 'xl', 'xxl', 'xxxl'],
    parse(query) {
      const rawString = parseRawValue(query, this.id);
      if (!rawString) return this.default;
      return toCommaSeparatedList(rawString);
    },
    validate({ query }) {
      const allSteps = this.parse(query);
      const baseStep = schema[QueryParamId.baseStep].parse(query);
      throwIf(!allSteps.includes(baseStep), `${this.id} (${allSteps}) does not include the base step (${baseStep}).`);
      // While this may seem like it will never throw, imagine a scenario where a user enters x,y;z. Splitting it yields ['x', 'y;z'].
      // And our regex strictly requires that each item in the list only use alphanumeric characters.
      throwIf(!isCommaSeparatedList(allSteps.join(',')), `${this.id} must be a comma-separated list of step names.`);
    },
  },
  [QueryParamId.baseStep]: {
    id: QueryParamId.baseStep,
    default: 'base',
    parse(query) {
      return parseRawValue(query, this.id) ?? this.default;
    },
    validate({ query }) {
      const baseStep = this.parse(query);
      const allSteps = schema[QueryParamId.allSteps].parse(query);
      throwIf(
        !allSteps.includes(baseStep),
        `The base step ${baseStep} was not found in the list of all steps (${allSteps}).`
      );
    },
  },
  [QueryParamId.namingConvention]: {
    id: QueryParamId.namingConvention,
    default: 'font-size',
    parse(query) {
      return parseRawValue(query, this.id) ?? this.default;
    },
    validate({ query }) {
      throwIf(!this.parse(query), `${this.id} must be a non-empty string`);
    },
  },
  [QueryParamId.shouldIncludeFallbacks]: {
    id: QueryParamId.shouldIncludeFallbacks,
    default: false,
    parse(query) {
      return parseCheckboxBoolean({ query, id: this.id });
    },
    validate({ query }) {
      const rawValue = parseRawValue(query, this.id);
      throwIfInvalidCheckboxBoolean(this.id, rawValue);
    },
  },
  [QueryParamId.shouldUseRems]: {
    id: QueryParamId.shouldUseRems,
    default: true,
    parse(query) {
      return parseCheckboxBoolean({ query, id: this.id });
    },
    validate({ query }) {
      const rawValue = parseRawValue(query, this.id);
      throwIfInvalidCheckboxBoolean(this.id, rawValue);
    },
  },
  [QueryParamId.remValueInPx]: {
    id: QueryParamId.remValueInPx,
    default: 16,
    min: 1,
    parse(query) {
      return parseNumber({ query, id: this.id, fallback: this.default });
    },
    validate({ query }) {
      const remValueInPx = this.parse(query);
      throwIfNaN(this.id, remValueInPx);
      throwIfNotInteger(this.id, remValueInPx);
      throwIfOutOfBounds(this.id, remValueInPx, { min: this.min });
    },
  },
  [QueryParamId.roundingDecimalPlaces]: {
    id: QueryParamId.roundingDecimalPlaces,
    default: 2,
    min: 0,
    max: 10,
    parse(query) {
      return parseNumber({ query, id: this.id, fallback: this.default });
    },
    validate({ query }) {
      const decimalPlaces = this.parse(query);
      throwIfNaN(this.id, decimalPlaces);
      throwIfNotInteger(this.id, decimalPlaces);
      throwIfOutOfBounds(this.id, decimalPlaces, { min: this.min, max: this.max });
    },
  },
  [QueryParamId.previewFont]: {
    id: QueryParamId.previewFont,
    default: DEFAULT_FONT_FAMILY,
    parse(query) {
      return parseRawValue(query, this.id) ?? this.default;
    },
    validate({ query, fonts }) {
      const fontFamily = this.parse(query);
      const isUnrecognizedFont = !fonts.includes(fontFamily);
      throwIf(isUnrecognizedFont, `${fontFamily} is not a recognized Google Font.`);
    },
  },
};
