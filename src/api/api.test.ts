import { QueryParamKey } from './api.constants';
import { QueryParamConfig, QueryParamValues } from './api.types';
import { getQueryParamConfig, validateQueryParams } from './api.utils';

describe('API utils', () => {
  describe('getQueryParamConfig', () => {
    it('respects the defaults', () => {
      const config = getQueryParamConfig(
        // No query params are provided, so everything should fall back to the default
        {},
        {
          fonts: ['Family', 'x', 'y', 'z'],
          defaults: {
            [QueryParamKey.minFontSize]: 10,
            [QueryParamKey.minScreenWidth]: 200,
            [QueryParamKey.minRatio]: 1.2,
            [QueryParamKey.maxFontSize]: 16,
            [QueryParamKey.maxScreenWidth]: 600,
            [QueryParamKey.maxRatio]: 1.4,
            [QueryParamKey.allSteps]: ['a', 'b', 'c'],
            [QueryParamKey.baseStep]: 'b',
            [QueryParamKey.namingConvention]: 'fs',
            [QueryParamKey.shouldUseRems]: false,
            [QueryParamKey.roundingDecimalPlaces]: 4,
            [QueryParamKey.fontFamily]: 'Family',
          },
        }
      );
      const expected: QueryParamValues = {
        [QueryParamKey.minFontSize]: 10,
        [QueryParamKey.minScreenWidth]: 200,
        [QueryParamKey.minRatio]: 1.2,
        [QueryParamKey.maxFontSize]: 16,
        [QueryParamKey.maxScreenWidth]: 600,
        [QueryParamKey.maxRatio]: 1.4,
        [QueryParamKey.allSteps]: ['a', 'b', 'c'],
        [QueryParamKey.baseStep]: 'b',
        [QueryParamKey.namingConvention]: 'fs',
        [QueryParamKey.shouldUseRems]: false,
        [QueryParamKey.roundingDecimalPlaces]: 4,
        [QueryParamKey.fontFamily]: 'Family',
      };
      Object.values(config).forEach((param) => {
        expect(param.getValue()).toStrictEqual(expected[param.id]);
      });
    });
  });
  describe('validateQueryParams', () => {
    it('does not throw for valid data', () => {
      const config = getQueryParamConfig(
        {
          [QueryParamKey.minFontSize]: '16',
          [QueryParamKey.minScreenWidth]: '400',
          [QueryParamKey.minRatio]: '1.25',
          [QueryParamKey.maxFontSize]: '19',
          [QueryParamKey.maxScreenWidth]: '1280',
          [QueryParamKey.maxRatio]: '1.333',
          [QueryParamKey.allSteps]: 'sm,base,md,lg,xl,xxl,xxxl',
          [QueryParamKey.baseStep]: 'base',
          [QueryParamKey.namingConvention]: 'font-size',
          [QueryParamKey.shouldUseRems]: 'on',
          [QueryParamKey.roundingDecimalPlaces]: '2',
          [QueryParamKey.fontFamily]: 'Inter',
        },
        { fonts: ['Inter'] }
      );
      expect(() => validateQueryParams(config)).not.toThrow();
    });
    it('does not throw for valid partial data', () => {
      const config = getQueryParamConfig(
        {
          [QueryParamKey.minFontSize]: '16',
          [QueryParamKey.fontFamily]: 'Inter',
        },
        { fonts: ['Inter'] }
      );
      expect(() => validateQueryParams(config)).not.toThrow();
    });
    it('throws if a numeric param is not a number', () => {
      const config = getQueryParamConfig(
        {
          [QueryParamKey.minFontSize]: 'asd',
        },
        { fonts: ['Inter'] }
      );
      expect(() => validateQueryParams(config)).toThrow();
    });
    it('throws if a numeric param is empty', () => {
      const config = getQueryParamConfig(
        {
          [QueryParamKey.minFontSize]: '',
        },
        { fonts: ['Inter'] }
      );
      expect(() => validateQueryParams(config)).toThrow();
    });
    it('throws if the min screen width is >= max', () => {
      const config = getQueryParamConfig(
        {
          [QueryParamKey.minScreenWidth]: '1280',
          [QueryParamKey.maxScreenWidth]: '1280',
        },
        { fonts: ['Inter'] }
      );
      expect(() => validateQueryParams(config)).toThrow();
    });
    it('throws if steps is not a comma-separated string', () => {
      const config = getQueryParamConfig(
        {
          [QueryParamKey.allSteps]: 'a,b;c',
        },
        { fonts: ['Inter'] }
      );
      expect(() => validateQueryParams(config)).toThrow();
    });
    it('throws if steps is empty', () => {
      const config = getQueryParamConfig(
        {
          [QueryParamKey.allSteps]: '',
        },
        { fonts: ['Inter'] }
      );
      expect(() => validateQueryParams(config)).toThrow();
    });
    it('throws if the base step is not found in the list of all steps', () => {
      const config = getQueryParamConfig(
        {
          [QueryParamKey.allSteps]: 'a,b,c',
          [QueryParamKey.baseStep]: 'd',
        },
        { fonts: ['Inter'] }
      );
      expect(() => validateQueryParams(config)).toThrow();
    });
    it('throws if the font family is not recognized', () => {
      const config = getQueryParamConfig(
        {
          [QueryParamKey.fontFamily]: 'Ruge Boogie',
        },
        { fonts: ['Roboto', 'Libre Baskerville', 'Inter'] }
      );
      expect(() => validateQueryParams(config)).toThrow();
    });
    it('throws if the naming convention is blank', () => {
      const config = getQueryParamConfig(
        {
          [QueryParamKey.namingConvention]: '',
        },
        { fonts: ['Inter'] }
      );
      expect(() => validateQueryParams(config)).toThrow();
    });
  });
});
