import { parseCheckboxBoolean, parseNumber } from './schema.parsers';

describe('schema parser functions', () => {
  describe('parseNumber', () => {
    it('returns the fallback if the param is unspecified', () => {
      expect(
        parseNumber({ query: { foo: '42' }, id: 'unspecified', fallback: 0xfa11bac })
      ).toStrictEqual(0xfa11bac);
    });
    it('returns the param if it exists', () => {
      expect(parseNumber({ query: { foo: '42' }, id: 'foo', fallback: 0xfa11bac })).toStrictEqual(
        42
      );
    });
    it('returns NaN if the param is not a valid number', () => {
      expect(parseNumber({ query: { foo: 'asd' }, id: 'foo', fallback: 0xfa11bac })).toStrictEqual(
        NaN
      );
    });
  });
  describe('parseCheckboxBoolean', () => {
    it('returns false if the param is unspecified', () => {
      expect(parseCheckboxBoolean({ query: { foo: 'bar' }, id: 'unspecified' })).toStrictEqual(
        false
      );
    });
    it(`returns true if the param is 'on', 'true', or an empty string`, () => {
      expect(parseCheckboxBoolean({ query: { checked: 'on' }, id: 'checked' })).toStrictEqual(true);
      expect(parseCheckboxBoolean({ query: { checked: 'true' }, id: 'checked' })).toStrictEqual(
        true
      );
      expect(parseCheckboxBoolean({ query: { checked: '' }, id: 'checked' })).toStrictEqual(true);
    });
  });
});
