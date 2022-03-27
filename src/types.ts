import { Dispatch } from 'react';

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

export type AppState = {
  /** The minimum (mobile) config, describing how the font size should behave when the viewport width is narrower than the desktop breakpoint. */
  min: BreakpointConfig;
  /** The maximum (desktop) config, describing how the font size should behave when the viewport width is >= this breakpoint. */
  max: BreakpointConfig;
  /** A list of modular step names in the type scale. */
  modularSteps: string[];
  /** The name of the base modular step in the type scale. All other steps are up/down from this reference point. */
  baseModularStep: string;
  /** The string prefix to use when creating the output CSS custom property variables. Example: `fs` with steps of `base`, `md`, and `lg` implies that you get three variables: `--fs-base`, `--fs-md`, and `--fs-lg`. */
  namingConvention: string;
  /** Whether to use rems for font sizing in the output. */
  shouldUseRems: boolean;
  /** The number of decimal places to round the output to. */
  roundingDecimalPlaces: number;
};

/** An action that can be dispatched to update the app state. */
export type AppAction =
  | {
      type: 'setMin';
      payload: Partial<AppState['min']>;
    }
  | {
      type: 'setMax';
      payload: Partial<AppState['max']>;
    }
  | {
      type: 'setModularSteps';
      payload: AppState['modularSteps'];
    }
  | {
      type: 'setBaseModularStep';
      payload: AppState['baseModularStep'];
    }
  | {
      type: 'setNamingConvention';
      payload: AppState['namingConvention'];
    }
  | {
      type: 'setShouldUseRems';
      payload: AppState['shouldUseRems'];
    }
  | {
      type: 'setRoundingDecimalPlaces';
      payload: AppState['roundingDecimalPlaces'];
    };

export type AppActionDispatcher = Dispatch<AppAction>;

export type WithDispatch = {
  /** A dispatch function to update the app state. */
  dispatch: AppActionDispatcher;
};

export type WithFonts = {
  /** A list of fonts that users can choose from. */
  fonts: string[];
};
