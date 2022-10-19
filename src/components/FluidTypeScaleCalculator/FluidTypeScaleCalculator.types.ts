import type { Dispatch } from 'react';
import { BreakpointConfig } from '../../types';

export type FormState = {
  /** The minimum (mobile) config, describing how the font size should behave when the viewport width is narrower than the desktop breakpoint. */
  min: BreakpointConfig;
  /** The maximum (desktop) config, describing how the font size should behave when the viewport width is >= this breakpoint. */
  max: BreakpointConfig;
  /** A config describing the user-defined type scale steps and base step. */
  typeScaleSteps: {
    /** The names of all of the steps in the user-defined type scale. */
    all: string[];
    /** The name of the type scale's base step. Steps that come before the base step have a smaller font size; steps that come after have a larger font size. */
    base: string;
  };
  /** The string prefix to use when creating the output CSS custom property variables. Example: `fs` with steps of `base`, `md`, and `lg` implies that you get three variables: `--fs-base`, `--fs-md`, and `--fs-lg`. */
  namingConvention: string;
  /** Whether to include fallback output for browsers that don't yet support CSS `clamp`. */
  shouldIncludeFallbacks: boolean;
  /** Whether to use rems for font sizing in the output. */
  shouldUseRems: boolean;
  /** The number of decimal places to round the output to. */
  roundingDecimalPlaces: number;
  /** The pixel value of 1rem. */
  remValueInPx: number;
  /** The font family in which to preview the type scale. */
  fontFamily: string;
};

export type ActionSetMin = {
  type: 'setMin';
  payload: Partial<FormState['min']>;
};

export type ActionSetMax = {
  type: 'setMax';
  payload: Partial<FormState['max']>;
};

export type ActionSetTypeScaleSteps = {
  type: 'setTypeScaleSteps';
  payload: Partial<FormState['typeScaleSteps']>;
};

export type ActionSetNamingConvention = {
  type: 'setNamingConvention';
  payload: FormState['namingConvention'];
};

export type ActionSetShouldIncludeFallbacks = {
  type: 'setShouldIncludeFallbacks';
  payload: FormState['shouldIncludeFallbacks'];
};

export type ActionSetShouldUseRems = {
  type: 'setShouldUseRems';
  payload: FormState['shouldUseRems'];
};

export type ActionSetRemValueInPx = {
  type: 'setRemValueInPx';
  payload: FormState['remValueInPx'];
};

export type ActionSetRoundingDecimalPlaces = {
  type: 'setRoundingDecimalPlaces';
  payload: FormState['roundingDecimalPlaces'];
};

export type ActionSetFontFamily = {
  type: 'setFontFamily';
  payload: FormState['fontFamily'];
};

/** An action that can be dispatched to update the app state. */
export type FormAction =
  | ActionSetMin
  | ActionSetMax
  | ActionSetTypeScaleSteps
  | ActionSetNamingConvention
  | ActionSetShouldIncludeFallbacks
  | ActionSetShouldUseRems
  | ActionSetRemValueInPx
  | ActionSetRoundingDecimalPlaces
  | ActionSetFontFamily;

export type WithDispatch = {
  /** A dispatch function to update the app state. */
  dispatch: Dispatch<FormAction>;
};
