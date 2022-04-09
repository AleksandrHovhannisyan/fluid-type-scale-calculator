import type { MapDiscriminatedUnion } from '../types.generics';
import { QueryParamKey } from './api.constants';

/** A query parameter with a value and a corresponding validator function to check the value. */
export type ValidatedQueryParam<T> = {
  /** The value parsed from the query string. */
  value: T;
  /** Throws if this query param's value is invalid.
   * @param {QueryParam['id']} id The unique ID of this query param.
   * @param {T} value The value to check for this query param.
   * @param {QueryParamConfig} config The entire config that this query param is part of.
   */
  validate: (id: QueryParam['id'], value: T, config: QueryParamConfig) => void;
};

/** A query parameter that, when parsed, is expected to be of type `number`. */
type NumericQueryParam = ValidatedQueryParam<number> & {
  /** The minimum value this query parameter is allowed to have. */
  min?: number;
  /** The maximum value this query parameter is allowed to have. */
  max?: number;
};

export type ParamMinFontSize = NumericQueryParam & {
  id: QueryParamKey.minFontSize;
};

export type ParamMinScreenWidth = NumericQueryParam & {
  id: QueryParamKey.minScreenWidth;
};

export type ParamMinRatio = NumericQueryParam & {
  id: QueryParamKey.minRatio;
};

export type ParamMaxFontSize = NumericQueryParam & {
  id: QueryParamKey.maxFontSize;
};

export type ParamMaxScreenWidth = NumericQueryParam & {
  id: QueryParamKey.maxScreenWidth;
};

export type ParamMaxRatio = NumericQueryParam & {
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

export type ParamRoundingDecimalPlaces = NumericQueryParam & {
  id: QueryParamKey.roundingDecimalPlaces;
  min: number;
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
