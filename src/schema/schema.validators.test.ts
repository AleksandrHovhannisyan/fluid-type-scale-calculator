import { throwIfNaN, throwIfNotInteger, throwIfOutOfBounds } from './schema.validators';

describe('API validator functions', () => {
  describe('throwIfNaN', () => {
    it('throws for NaN', () => {
      expect(() => throwIfNaN('id', Number('asd'))).toThrow();
      expect(() => throwIfNaN('id', Number(undefined))).toThrow();
    });
    it('does not throw for valid numbers', () => {
      expect(() => throwIfNaN('id', 123)).not.toThrow();
      expect(() => throwIfNaN('id', 0)).not.toThrow();
      expect(() => throwIfNaN('id', -2)).not.toThrow();
      expect(() => throwIfNaN('id', 0xfff)).not.toThrow();
    });
  });
  describe('throwIfNotInteger', () => {
    it('throws for floating-point numbers', () => {
      expect(() => throwIfNotInteger('id', 1.5)).toThrow();
      expect(() => throwIfNotInteger('id', 0.1)).toThrow();
    });
    it('does not throw for integers', () => {
      expect(() => throwIfNotInteger('id', -1)).not.toThrow();
      expect(() => throwIfNotInteger('id', 3)).not.toThrow();
    });
  });
  describe('throwIfOutOfBounds', () => {
    it('throws if the value is < min', () => {
      expect(() => throwIfOutOfBounds('id', -1, { min: 0 })).toThrow();
      expect(() => throwIfOutOfBounds('id', -1, { min: 0, max: 1 })).toThrow();
    });
    it('throws if the value is > max', () => {
      expect(() => throwIfOutOfBounds('id', 2, { max: 1 })).toThrow();
      expect(() => throwIfOutOfBounds('id', 2, { min: 0, max: 1 })).toThrow();
    });
    it('does not throw if the value is within bounds', () => {
      expect(() => throwIfOutOfBounds('id', 0, { min: 0 })).not.toThrow();
      expect(() => throwIfOutOfBounds('id', 0, { max: 1 })).not.toThrow();
      expect(() => throwIfOutOfBounds('id', 0, { min: 0, max: 1 })).not.toThrow();
      expect(() => throwIfOutOfBounds('id', 1, { min: 0 })).not.toThrow();
      expect(() => throwIfOutOfBounds('id', 1, { max: 1 })).not.toThrow();
      expect(() => throwIfOutOfBounds('id', 1, { min: 0, max: 1 })).not.toThrow();
    });
  });
});
