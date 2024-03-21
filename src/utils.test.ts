import { GOOGLE_FONTS_BASE_URL } from './constants';
import { clamp, getGoogleFontLinkTagHref, indent, toAbsoluteUrl } from './utils';

describe('App-wide utilities', () => {
  describe('clamp', () => {
    it('clamps a value between a min and max', () => {
      expect(clamp({ value: 5, min: 0, max: 10 })).toStrictEqual(5);
      expect(clamp({ value: 0, min: 0, max: 10 })).toStrictEqual(0);
      expect(clamp({ value: 10, min: 0, max: 10 })).toStrictEqual(10);
      expect(clamp({ value: 0, min: 1, max: 10 })).toStrictEqual(1);
      expect(clamp({ value: 11, min: 0, max: 10 })).toStrictEqual(10);
    });
  });
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
      expect(
        getGoogleFontLinkTagHref({ family: 'Libre Baskerville', display: 'swap' })
      ).toStrictEqual(`${GOOGLE_FONTS_BASE_URL}?family=Libre+Baskerville&display=swap`);
    });
    it('respects the display property', () => {
      expect(
        getGoogleFontLinkTagHref({ family: 'Libre Baskerville', display: 'fallback' })
      ).toStrictEqual(`${GOOGLE_FONTS_BASE_URL}?family=Libre+Baskerville&display=fallback`);
    });
  });
  describe('indent', () => {
    it('throws if indentation is invalid', () => {
      expect(() => indent('text', 0)).toThrow();
      expect(() => indent('text', -1)).toThrow();
    });
    it('indents to >= 1 level', () => {
      expect(indent('one line', 1, '\t')).toStrictEqual('\tone line');
      expect(indent('one line', 1, ' ')).toStrictEqual(' one line');
      expect(indent('one line', 2, '\t')).toStrictEqual('\t\tone line');
      expect(indent('one line', 2, ' ')).toStrictEqual('  one line');
    });
    it('indents multiple lines', () => {
      expect(indent('1\n2\n3', 2, '\t')).toStrictEqual('\t\t1\n\t\t2\n\t\t3');
    });
    it('indents already indented lines', () => {
      expect(indent('\tone line', 1, '\t')).toStrictEqual('\t\tone line');
      expect(indent(' one line', 1, ' ')).toStrictEqual('  one line');
    });
  });
});
