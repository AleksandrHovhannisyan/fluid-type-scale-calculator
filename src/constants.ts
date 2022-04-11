/** The root API endpoint for requesting @font-face declarations from Google Fonts. */
export const GOOGLE_FONTS_BASE_URL = `https://fonts.googleapis.com/css2`;

/** The default font family used by the app and shown in font pickers. */
export const DEFAULT_FONT_FAMILY = 'Inter';

/** Regex to match a comma-separated of values, with only alphanumeric characters permitted between the commas. */
export const COMMA_SEPARATED_LIST_REGEX = /^[a-zA-Z0-9-](?:(,\s*)?[a-zA-Z0-9-])*$/;

/** Enum of delays in milliseconds, for consistency across event handlers. */
export enum Delay {
  SHORT = 150,
  MEDIUM = 300,
  LONG = 400,
}
