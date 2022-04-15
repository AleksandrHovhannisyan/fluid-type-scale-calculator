import type { MapDiscriminatedUnion } from '../types.generics';
import { QueryParamKey } from './api.constants';

export type QueryParamList = Record<QueryParamKey, string>;

/** A query parameter with a method to fetch its value and a corresponding validator method that checks the value. */
export type ValidatedQueryParam<T> = {
  /** Parses and returns the value from the query string. */
  getValue: () => T;
  /** Throws if this query param's value is invalid.
   * @param {QueryParamConfig} config The entire config that this query param is part of.
   */
  validate?: (config: QueryParamConfig) => void;
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
