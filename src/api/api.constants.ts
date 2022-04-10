import { initialFormState } from '../constants';
import { QueryParamValues } from './api.types';

/** The name attributes for form inputs. Set on the individual form inputs but also used on the server side to read the data from query params. */
export enum QueryParamKey {
  minFontSize = 'minFontSize',
  minScreenWidth = 'minWidth',
  minRatio = 'minRatio',
  maxFontSize = 'maxFontSize',
  maxScreenWidth = 'maxWidth',
  maxRatio = 'maxRatio',
  allSteps = 'steps',
  baseStep = 'base',
  namingConvention = 'prefix',
  shouldUseRems = 'useRems',
  roundingDecimalPlaces = 'decimals',
  fontFamily = 'font',
}

/** A map specifying the default value for each query param. These are derived from the front-end's initial state. */
export const queryParamDefaults: QueryParamValues = {
  [QueryParamKey.minFontSize]: initialFormState.min.fontSize,
  [QueryParamKey.minScreenWidth]: initialFormState.min.screenWidth,
  [QueryParamKey.minRatio]: initialFormState.min.ratio,
  [QueryParamKey.maxFontSize]: initialFormState.max.fontSize,
  [QueryParamKey.maxScreenWidth]: initialFormState.max.screenWidth,
  [QueryParamKey.maxRatio]: initialFormState.max.ratio,
  [QueryParamKey.allSteps]: initialFormState.typeScaleSteps.all,
  [QueryParamKey.baseStep]: initialFormState.typeScaleSteps.base,
  [QueryParamKey.namingConvention]: initialFormState.namingConvention,
  [QueryParamKey.shouldUseRems]: initialFormState.shouldUseRems,
  [QueryParamKey.roundingDecimalPlaces]: initialFormState.roundingDecimalPlaces,
  [QueryParamKey.fontFamily]: initialFormState.fontFamily,
};
