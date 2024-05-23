/** The root API endpoint for requesting @font-face declarations from Google Fonts. */
export const GOOGLE_FONTS_BASE_URL = `https://fonts.googleapis.com/css2`;

/** Regex for a comma-separated list of word identifiers, with optional whitespace around the commas. */
export const COMMA_SEPARATED_LIST_REGEX =
  // eslint-disable-next-line no-useless-escape
  /^[\w\-]+(\s*,\s*[\w\-]*)*$/;

export const CSS_VARIABLE_REGEX =
// eslint-disable-next-line no-useless-escape
/^[a-zA-Z0-9_\-]*$/;
