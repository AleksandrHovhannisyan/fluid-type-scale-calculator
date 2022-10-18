import { WithFonts } from '../types';
import type { MapDiscriminatedUnion } from '../types.generics';

// Technically a constant, but exporting it from here makes more sense.
// Why an enum instead of a type? So we can reuse this for input name attributes without
// having to type them as QueryParamId in props.

/** A recognized query param ID. Also used on the front end by form inputs to set their `name` attribute to the corresponding query param. */
export enum QueryParamId {
  minFontSize = 'minFontSize',
  minWidth = 'minWidth',
  minRatio = 'minRatio',
  maxFontSize = 'maxFontSize',
  maxWidth = 'maxWidth',
  maxRatio = 'maxRatio',
  allSteps = 'steps',
  baseStep = 'baseStep',
  namingConvention = 'prefix',
  shouldUseRems = 'useRems',
  shouldIncludeFallbacks = 'includeFallbacks',
  remValueInPx = 'remValue',
  roundingDecimalPlaces = 'decimals',
  previewFont = 'previewFont',
}

/** A record of arbitrary query params supplied by users. */
export type UserSuppliedQueryParams = Record<string, string>;

export type QueryParamValidatorOptions = WithFonts & {
  /** The query params passed in by the user. */
  query: UserSuppliedQueryParams;
  /** A reference to the query param config itself. */
  config: QueryParamSchema;
};

/** A query parameter with a method to fetch its value and a corresponding validator method that checks the value. */
export type ValidatedQueryParam<T> = {
  /** The default value for this query parameter. */
  default: T;
  /** Parses and returns the value from the query string. */
  parse: (query: UserSuppliedQueryParams) => T;
  /** Validator method to check the query param. Throws an error if the value is invalid. */
  validate: (options: QueryParamValidatorOptions) => void;
};

export type NumericQueryParam = ValidatedQueryParam<number> & {
  /** The minimum value for the query param. */
  min?: number;
  /** The maximum value for the query param. */
  max?: number;
};

export type ParamMinFontSize = NumericQueryParam & {
  id: QueryParamId.minFontSize;
};

export type ParamMinScreenWidth = NumericQueryParam & {
  id: QueryParamId.minWidth;
};

export type ParamMinRatio = NumericQueryParam & {
  id: QueryParamId.minRatio;
};

export type ParamMaxFontSize = NumericQueryParam & {
  id: QueryParamId.maxFontSize;
};

export type ParamMaxScreenWidth = NumericQueryParam & {
  id: QueryParamId.maxWidth;
};

export type ParamMaxRatio = NumericQueryParam & {
  id: QueryParamId.maxRatio;
};

export type ParamTypeScaleSteps = ValidatedQueryParam<string[]> & {
  id: QueryParamId.allSteps;
};

export type ParamBaseTypeScaleStep = ValidatedQueryParam<string> & {
  id: QueryParamId.baseStep;
};

export type ParamNamingConvention = ValidatedQueryParam<string> & {
  id: QueryParamId.namingConvention;
};

export type ParamShouldUseRems = ValidatedQueryParam<boolean> & {
  id: QueryParamId.shouldUseRems;
};

export type ParamRemValueInPx = NumericQueryParam & {
  id: QueryParamId.remValueInPx;
};

export type ParamRoundingDecimalPlaces = Required<NumericQueryParam> & {
  id: QueryParamId.roundingDecimalPlaces;
};

export type ParamFallback = ValidatedQueryParam<boolean> & {
  id: QueryParamId.shouldIncludeFallbacks;
};

export type ParamFontFamily = ValidatedQueryParam<string> & {
  id: QueryParamId.previewFont;
};

export type QueryParam =
  | ParamMinFontSize
  | ParamMinScreenWidth
  | ParamMinRatio
  | ParamMaxFontSize
  | ParamMaxScreenWidth
  | ParamMaxRatio
  | ParamTypeScaleSteps
  | ParamBaseTypeScaleStep
  | ParamNamingConvention
  | ParamFallback
  | ParamShouldUseRems
  | ParamRemValueInPx
  | ParamRoundingDecimalPlaces
  | ParamFontFamily;

/** Mapped type where they keys `K` correspond to shapes that extend `{ id: K }`. Defines a config for each query parameter. */
export type QueryParamSchema = MapDiscriminatedUnion<QueryParam, 'id'>;
