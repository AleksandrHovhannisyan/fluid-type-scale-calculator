import { WithFonts } from '../types';
import type { MapDiscriminatedUnion } from '../types.generics';
import { QueryParamKey } from './api.constants';

/** A record of arbitrary query params supplied by users. */
export type UserSuppliedQueryParams = Record<string, string>;

export type QueryParamValidatorOptions = WithFonts & {
  /** The query params passed in by the user. */
  query: UserSuppliedQueryParams;
  /** A reference to the query param config itself. */
  config: QueryParamConfig;
};

/** A query parameter with a method to fetch its value and a corresponding validator method that checks the value. */
export type ValidatedQueryParam<T> = {
  /** The default value for this query parameter. */
  default: T;
  /** Parses and returns the value from the query string. */
  getValue: (query: UserSuppliedQueryParams) => T;
  /** Validator method to check the query param. Throws an error if the value is invalid. */
  validate: (options: QueryParamValidatorOptions) => void;
};

export type ParamMinFontSize = ValidatedQueryParam<number> & {
  id: QueryParamKey.minFontSize;
};

export type ParamMinScreenWidth = ValidatedQueryParam<number> & {
  id: QueryParamKey.minScreenWidth;
};

export type ParamMinRatio = ValidatedQueryParam<number> & {
  id: QueryParamKey.minRatio;
};

export type ParamMaxFontSize = ValidatedQueryParam<number> & {
  id: QueryParamKey.maxFontSize;
};

export type ParamMaxScreenWidth = ValidatedQueryParam<number> & {
  id: QueryParamKey.maxScreenWidth;
};

export type ParamMaxRatio = ValidatedQueryParam<number> & {
  id: QueryParamKey.maxRatio;
};

export type ParamTypeScaleSteps = ValidatedQueryParam<string[]> & {
  id: QueryParamKey.allSteps;
};

export type ParamBaseTypeScaleStep = ValidatedQueryParam<string> & {
  id: QueryParamKey.baseStep;
};

export type ParamNamingConvention = ValidatedQueryParam<string> & {
  id: QueryParamKey.namingConvention;
};

export type ParamShouldUseRems = ValidatedQueryParam<boolean> & {
  id: QueryParamKey.shouldUseRems;
};

export type ParamRoundingDecimalPlaces = ValidatedQueryParam<number> & {
  id: QueryParamKey.roundingDecimalPlaces;
  /** The maximum number of decimal places to which a user can round their output. */
  max: number;
};

export type ParamFontFamily = ValidatedQueryParam<string> & {
  id: QueryParamKey.fontFamily;
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
  | ParamShouldUseRems
  | ParamRoundingDecimalPlaces
  | ParamFontFamily;

/** Mapped type where they keys `K` correspond to shapes that extend `{ id: K }`. Defines a config for each query parameter. */
export type QueryParamConfig = MapDiscriminatedUnion<QueryParam, 'id'>;

/** Maps each unique query param shape's ID to its corresponding value type. */
export type QueryParamValues = {
  [K in keyof QueryParamConfig]: ReturnType<QueryParamConfig[K]['getValue']>;
};
