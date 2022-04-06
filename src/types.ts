import type { Dispatch } from 'react';

export type ClampDeclaration = {
  /** The minimum value for CSS `clamp`. */
  min: string;
  /** The preferred value for CSS `clamp` */
  preferred: string;
  /** The maximum value for CSS `clamp`. */
  max: string;
};

export type TypeScaleEntry = ClampDeclaration & {
  /** Given a unitless target screen width (interpreted as pixels), returns the computed fluid font size at that width. */
  getFontSizeAtScreenWidth: (width: number) => string;
};

export type TypeScale = Map<string, TypeScaleEntry>;

export type BreakpointConfig = {
  /** The font size (in pixels) at this breakpoint */
  fontSize: number;
  /** The viewport width corresponding to this breakpoint. */
  screenWidth: number;
  /** The type scale ratio to use at this target breakpoint. */
  modularRatio: number;
};

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
  /** Whether to use rems for font sizing in the output. */
  shouldUseRems: boolean;
  /** The number of decimal places to round the output to. */
  roundingDecimalPlaces: number;
  /** The font family in which to preview the type scale. */
  fontFamily: string;
};

/** An action that can be dispatched to update the app state. */
export type FormAction =
  | {
      type: 'setMin';
      payload: Partial<FormState['min']>;
    }
  | {
      type: 'setMax';
      payload: Partial<FormState['max']>;
    }
  | {
      type: 'setTypeScaleSteps';
      payload: Partial<FormState['typeScaleSteps']>;
    }
  | {
      type: 'setNamingConvention';
      payload: FormState['namingConvention'];
    }
  | {
      type: 'setShouldUseRems';
      payload: FormState['shouldUseRems'];
    }
  | {
      type: 'setRoundingDecimalPlaces';
      payload: FormState['roundingDecimalPlaces'];
    }
  | {
      type: 'setFontFamily';
      payload: FormState['fontFamily'];
    };

/** The name attributes for form inputs. Set on the individual form inputs but also used on the server side to read the data from query params. */
export enum FormDataKey {
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

export type WithDispatch = {
  /** A dispatch function to update the app state. */
  dispatch: Dispatch<FormAction>;
};

export type WithFonts = {
  /** A list of fonts that users can choose from. */
  fonts: string[];
};
