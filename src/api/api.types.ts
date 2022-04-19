import { WithFonts } from '../types';
import type { MapDiscriminatedUnion } from '../types.generics';

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

export type NumericQueryParam = ValidatedQueryParam<number> & {
  /** The minimum value for the query param. */
  min?: number;
  /** The maximum value for the query param. */
  max?: number;
};

export type ParamMinFontSize = NumericQueryParam & {
  id: 'minFontSize';
};

export type ParamMinScreenWidth = NumericQueryParam & {
  id: 'minWidth';
};

export type ParamMinRatio = NumericQueryParam & {
  id: 'minRatio';
};

export type ParamMaxFontSize = NumericQueryParam & {
  id: 'maxFontSize';
};

export type ParamMaxScreenWidth = NumericQueryParam & {
  id: 'maxWidth';
};

export type ParamMaxRatio = NumericQueryParam & {
  id: 'maxRatio';
};

export type ParamTypeScaleSteps = ValidatedQueryParam<string[]> & {
  id: 'steps';
};

export type ParamBaseTypeScaleStep = ValidatedQueryParam<string> & {
  id: 'baseStep';
};

export type ParamNamingConvention = ValidatedQueryParam<string> & {
  id: 'prefix';
};

export type ParamShouldUseRems = ValidatedQueryParam<boolean> & {
  id: 'useRems';
};

export type ParamRoundingDecimalPlaces = NumericQueryParam & {
  id: 'decimals';
};

export type ParamFontFamily = ValidatedQueryParam<string> & {
  id: 'previewFont';
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

/** A valid query param ID. Also used on the front-end by form inputs. */
export type QueryParamName = QueryParam['id'];

/** Mapped type where they keys `K` correspond to shapes that extend `{ id: K }`. Defines a config for each query parameter. */
export type QueryParamConfig = MapDiscriminatedUnion<QueryParam, 'id'>;
