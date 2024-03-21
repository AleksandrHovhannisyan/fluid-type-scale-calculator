import type { AtRule } from 'csstype';
import site from './data/site.json';
import { DEFAULT_FONT_FAMILY, GOOGLE_FONTS_BASE_URL } from './constants';

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

/** Parses the given string to a comma-separated string array. */
export const toCommaSeparatedList = (rawValue: string): string[] => {
  return rawValue.split(',').map((el) => el.trim());
};

/** Indents the given text by a certain level. If the text is already indented, each line will be indented by the specified level.
 * Uses tabs by default, but you can also indent by spaces.
 */
export const indent = (text: string, indentLevel: number, indentChar: ' ' | '\t' = '\t') => {
  if (indentLevel <= 0) {
    throw new Error(`Invalid indentation level: ${indentLevel}`);
  }
  const tabIndent = Array.from({ length: indentLevel }, () => indentChar).join('');
  return text
    .split('\n')
    .map((line) => `${tabIndent}${line}`)
    .join('\n');
};
