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
