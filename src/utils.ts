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
