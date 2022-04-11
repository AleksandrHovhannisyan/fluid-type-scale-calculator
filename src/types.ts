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
  /** The modular type scale ratio to use at this breakpoint to scale the base font size up/down. */
  ratio: number;
};

export type WithFonts = {
  /** A list of fonts that users can choose from. */
  fonts: string[];
};

export type HTTPError = {
  /** The HTTP status code for the error. */
  code: number;
  /** The reason phrase for the status code. */
  reasonPhrase: string;
  /** An extended description of the error. */
  description: string;
};
