import type { AtRule } from 'csstype';
import site from './data/site.json';
import {
  COMMA_SEPARATED_LIST_REGEX,
  DEFAULT_FONT_FAMILY,
  GOOGLE_FONTS_BASE_URL,
} from './constants';

/** Returns a value clamped between a min and a max value, inclusive. */
export const clamp = ({
  value,
  min,
  max,
}: {
  /** The value to clamp. */
  value: number;
  /** The minimum (inclusive) allowed value. */
  min: number;
  /** The maximum (inclusive) allowed value. */
  max: number;
}) => Math.max(Math.min(value, max), min);

/** Prefixes the given relative url string with the base site URL. */
export const toAbsoluteUrl = (url: string, baseUrl: string = site.url) =>
  new URL(url, baseUrl).toString();

/** Returns an array of Google Font family names from the Google Fonts API. */
export const getGoogleFontFamilies = async (): Promise<string[]> => {
  try {
    const response = await (
      await fetch(
        `https://www.googleapis.com/webfonts/v1/webfonts?sort=alpha&key=${process.env.GOOGLE_FONTS_API_KEY}`
      )
    ).json();
    const fonts = response.items.map((font: { family: string }) => font.family);
    return fonts;
  } catch (e) {
    return [DEFAULT_FONT_FAMILY];
  }
};

/** Given a font family, returns the properly formatted href that can be used to link to that font's @font-face CSS on Google's servers. */
export const getGoogleFontLinkTagHref = (options: {
  family: string;
  display: AtRule.FontDisplay;
}) => {
  const url = new URL(GOOGLE_FONTS_BASE_URL);
  url.search = new URLSearchParams(options).toString();
  return url.toString();
};

/** Returns `true` if the given number is a valid number. */
export const isNumber = (value: string | number) => !Number.isNaN(+value);

/** Returns `true` if the given string represents a valid comma-separated list. */
export const isCommaSeparatedList = (value: string) => {
  return COMMA_SEPARATED_LIST_REGEX.test(value);
};

/** Throws an error if the condition evaluates to `true`.
 * @param {boolean} condition A boolean predicate condition to evaluate.
 * @param {string} message An optional message to throw if the condition evaluates to `false`.
 */
export const throwIf = (condition: boolean, message?: string) => {
  if (condition) {
    throw new Error(message);
  }
};

/** Parses the given string to a comma-separated string array. */
export const toCommaSeparatedList = (rawValue: string): string[] => {
  return rawValue.split(',').map((el) => el.trim());
};
