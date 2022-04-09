import { DEFAULT_FONT_FAMILY, site } from './constants';

/** Prefixes the given relative url string with the base site URL. */
export const toAbsoluteUrl = (url: string) => {
  // Replace trailing slash, e.g., site.com/ => site.com
  const siteUrl = site.url.replace(/\/$/, '');
  // Replace starting slash, e.g., /path/ => path/
  const relativeUrl = url.replace(/^\//, '');
  return `${siteUrl}/${relativeUrl}`;
};

/** Returns an array of Google Font family names from the Google Fonts API. */
export const getGoogleFontFamilies = async (): Promise<string[]> => {
  try {
    const response = await (
      await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?sort=alpha&key=${process.env.GOOGLE_FONTS_API_KEY}`)
    ).json();
    const fonts = response.items.map((font: { family: string }) => font.family);
    return fonts;
  } catch (e) {
    return [DEFAULT_FONT_FAMILY];
  }
};

/** Given a font family, returns the properly formatted href that can be used to link to that font's @font-face CSS on Google's servers. */
export const getGoogleFontLinkTagHref = (fontFamily: string) =>
  `https://fonts.googleapis.com/css2?family=${fontFamily.replace(/ /g, '+')}&display=swap`;

/** Returns `true` if the given number is a valid number. */
export const isNumber = (value: number) => !Number.isNaN(value);

/** Throws an error if the condition evaluates to `true`.
 * @param {boolean} condition A boolean predicate condition to evaluate.
 * @param {string} message An optional message to throw if the condition evaluates to `false`.
 */
export const throwIf = (condition: boolean, message?: string) => {
  if (condition) {
    throw new Error(message);
  }
};
