import { DEFAULT_FONT_FAMILY } from '../constants';
import typeScaleRatios from '../data/typeScaleRatios.json';
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
  [QueryParamKey.minFontSize]: 16,
  [QueryParamKey.minScreenWidth]: 400,
  [QueryParamKey.minRatio]: typeScaleRatios.majorThird.ratio,
  [QueryParamKey.maxFontSize]: 19,
  [QueryParamKey.maxScreenWidth]: 1280,
  [QueryParamKey.maxRatio]: typeScaleRatios.perfectFourth.ratio,
  [QueryParamKey.allSteps]: ['sm', 'base', 'md', 'lg', 'xl', 'xxl', 'xxxl'],
  [QueryParamKey.baseStep]: 'base',
  [QueryParamKey.namingConvention]: 'font-size',
  [QueryParamKey.shouldUseRems]: true,
  [QueryParamKey.roundingDecimalPlaces]: 2,
  [QueryParamKey.fontFamily]: DEFAULT_FONT_FAMILY,
};

/** Constraints on the values allowed in certain query params. Not all params have explicit constraints; some are implicit. */
export const queryParamConstraints: Partial<Record<QueryParamKey, { max?: number }>> = {
  [QueryParamKey.roundingDecimalPlaces]: {
    max: 10,
  },
};
