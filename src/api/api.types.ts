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

/** Maps each query param name/ID to only its corresponding value. Essentially the same as QueryParamConfig, except the object values are the `value` properties of each member of the `QueryParam` union. */
export type QueryParamValues = {
  [K in keyof QueryParamConfig]: QueryParamConfig[K]['value'];
};
