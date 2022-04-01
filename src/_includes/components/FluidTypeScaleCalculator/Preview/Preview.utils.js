/** Returns the link href for a Google Font family. */
export const getGoogleFontLinkHref = (fontFamily) =>
  `https://fonts.googleapis.com/css2?family=${fontFamily.replace(/ /g, '+')}&display=swap`;
