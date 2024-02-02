import { WithFonts } from '../types';

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
  previewText = 'previewText',
  previewWidth = 'previewWidth',
}

/** A record of arbitrary query params supplied by users. */
export type UserSuppliedQueryParams = Record<string, string>;

export type QueryValidatorOptions = WithFonts & {
  /** The query params passed in by the user. */
  query: UserSuppliedQueryParams;
};

/** A query parameter with a method to fetch its value and a corresponding validator method that checks the value. */
export type ValidatedQueryParam<T> = {
  /** The default value for this query parameter. */
  default: T;
  /** Parses and returns the value from the query string. */
  parse: (query: UserSuppliedQueryParams) => T;
  /** Validator method to check the query param. Throws an error if the value is invalid. */
  validate: (query: QueryValidatorOptions) => void;
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

export type ParamPreviewFontFamily = ValidatedQueryParam<string> & {
  id: QueryParamId.previewFont;
  validate: (options: QueryValidatorOptions) => void;
};

export type ParamPreviewText = ValidatedQueryParam<string> & {
  id: QueryParamId.previewText;
};

export type ParamPreviewWidth = NumericQueryParam & {
  id: QueryParamId.previewWidth;
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
  | ParamPreviewFontFamily
  | ParamPreviewText
  | ParamPreviewWidth;

/** Schema for query params recognized and validated by the app. */
export type QueryParamSchema = Record<QueryParamId, QueryParam>;
