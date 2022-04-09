import { GOOGLE_FONTS_BASE_URL } from './constants';
import { getGoogleFontLinkTagHref, toAbsoluteUrl } from './utils';

describe('App-wide utilities', () => {
  describe('toAbsoluteUrl', () => {
    it('handles relative paths that start with a slash', () => {
      expect(toAbsoluteUrl('/some/path/', 'https://fluid-type-scale.com')).toEqual(
        `https://fluid-type-scale.com/some/path/`
      );
    });
    it('handles site URL that has a trailing slash', () => {
      expect(toAbsoluteUrl('some/path/', 'https://fluid-type-scale.com/')).toEqual(
        `https://fluid-type-scale.com/some/path/`
      );
    });
    it('handles both site URL with trailing slash and url with preceding slash', () => {
      expect(toAbsoluteUrl('/some/path/', 'https://fluid-type-scale.com/')).toEqual(
        `https://fluid-type-scale.com/some/path/`
      );
    });
  });
  describe('getGoogleFontLinkTagHref', () => {
    it('properly escapes spaces in font family names', () => {
      expect(getGoogleFontLinkTagHref({ family: 'Libre Baskerville', display: 'swap' })).toStrictEqual(
        `${GOOGLE_FONTS_BASE_URL}?family=Libre+Baskerville&display=swap`
      );
    });
    it('respects the display property', () => {
      expect(getGoogleFontLinkTagHref({ family: 'Libre Baskerville', display: 'fallback' })).toStrictEqual(
        `${GOOGLE_FONTS_BASE_URL}?family=Libre+Baskerville&display=fallback`
      );
    });
  });
});
