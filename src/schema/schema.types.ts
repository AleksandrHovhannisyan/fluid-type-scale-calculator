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
  shouldUseContainerWidth = 'useContainerWidth',
  shouldIncludeFallbacks = 'includeFallbacks',
  remValueInPx = 'remValue',
  roundingDecimalPlaces = 'decimals',
  previewFont = 'previewFont',
  previewText = 'previewText',
  previewWidth = 'previewWidth',
}

/** A record of arbitrary query params supplied by users. */
export type UserSuppliedQueryParams = Record<string, string>;
