import { parseCheckboxBoolean, parseNumber } from './api.transformers';

describe('API transformation functions', () => {
  describe('parseNumber', () => {
    it('returns the fallback if the param is unspecified', () => {
      expect(parseNumber({ foo: '42' }, 'unspecified', 0xfa11bac)).toStrictEqual(0xfa11bac);
    });
    it('returns the param if it exists', () => {
      expect(parseNumber({ foo: '42' }, 'foo', 0xfa11bac)).toStrictEqual(42);
    });
    it('returns NaN if the param is not a valid number', () => {
      expect(parseNumber({ foo: 'asd' }, 'foo', 0xfa11bac)).toStrictEqual(NaN);
    });
  });
  describe('parseCheckboxBoolean', () => {
    it('returns false if the param is unspecified', () => {
      expect(parseCheckboxBoolean({ foo: 'bar' }, 'unspecified', false)).toStrictEqual(false);
    });
    it('returns the fallback if the param exists but has no value', () => {
      expect(parseCheckboxBoolean({ foo: '' }, 'foo', false)).toStrictEqual(false);
      expect(parseCheckboxBoolean({ foo: '' }, 'foo', true)).toStrictEqual(true);
    });
    it(`returns true if the param is 'on' or 'true'`, () => {
      expect(parseCheckboxBoolean({ checked: 'on' }, 'checked')).toStrictEqual(true);
      expect(parseCheckboxBoolean({ checked: 'true' }, 'checked')).toStrictEqual(true);
    });
  });
});
