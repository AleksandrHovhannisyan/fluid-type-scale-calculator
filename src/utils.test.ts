import { GOOGLE_FONTS_BASE_URL } from './constants';
import {
  getGoogleFontLinkTagHref,
  isCommaSeparatedList,
  isNumber,
  throwIf,
  toAbsoluteUrl,
} from './utils';

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
  describe('isNumber', () => {
    it('returns true for strings resembling numbers', () => {
      expect(isNumber('9001')).toStrictEqual(true);
      expect(isNumber('42.5')).toStrictEqual(true);
      expect(isNumber('-12.0')).toStrictEqual(true);
      expect(isNumber('0xfff')).toStrictEqual(true);
      expect(isNumber('1e5')).toStrictEqual(true);
    });
    it('returns false for NaN', () => {
      expect(isNumber(NaN)).toStrictEqual(false);
    });
    it('returns false for strings not resembling numbers', () => {
      expect(isNumber('-12.f')).toStrictEqual(false);
      expect(isNumber('hello world')).toStrictEqual(false);
      expect(isNumber('0xzzz')).toStrictEqual(false);
    });
  });
  describe('isCommaSeparatedList', () => {
    it('returns true for single-element lists', () => {
      expect(isCommaSeparatedList(`x`)).toStrictEqual(true);
    });
    it('returns true for comma-separated lists', () => {
      expect(isCommaSeparatedList(`a,b,c`)).toStrictEqual(true);
      expect(isCommaSeparatedList(`a,b,c`)).toStrictEqual(true);
    });
    it('returns true if the list contains numbers or hyphens', () => {
      expect(isCommaSeparatedList(`a-b,c-d,e-f`)).toStrictEqual(true);
      expect(isCommaSeparatedList(`n1,n2,n3`)).toStrictEqual(true);
      expect(isCommaSeparatedList(`n-1,n-2,n-3`)).toStrictEqual(true);
    });
    it('returns true if the list contains whitespace', () => {
      expect(isCommaSeparatedList(`a , b , c`)).toStrictEqual(true);
      expect(isCommaSeparatedList(`a, b,   c`)).toStrictEqual(true);
    });
  });
  describe('throwIf', () => {
    it('does not throw if the condition is false', () => {
      expect(() => throwIf(false)).not.toThrow();
    });
    it('throws if the condition is true', () => {
      expect(() => throwIf(true)).toThrow();
    });
    it('throws the given error message', () => {
      expect(() => throwIf(true, 'error message')).toThrowError({
        name: 'Error',
        message: 'error message',
      });
    });
  });
});
