export const modularRatios = {
  minorSecond: {
    name: 'Minor second',
    ratio: 1.067,
  },
  majorSecond: {
    name: 'Major second',
    ratio: 1.125,
  },
  minorThird: {
    name: 'Minor third',
    ratio: 1.2,
  },
  majorThird: {
    name: 'Major third',
    ratio: 1.25,
  },
  perfectFourth: {
    name: 'Perfect fourth',
    ratio: 1.333,
  },
  augmentedFourth: {
    name: 'Augmented fourth',
    ratio: 1.414,
  },
  perfectFifth: {
    name: 'Perfect fifth',
    ratio: 1.5,
  },
  goldenRatio: {
    name: 'Golden ratio',
    ratio: 1.618,
  },
} as const;

export const initialState = {
  min: {
    fontSize: 16,
    screenWidth: 400,
    modularRatio: modularRatios.majorThird.ratio,
  },
  max: {
    fontSize: 19,
    screenWidth: 1280,
    modularRatio: modularRatios.perfectFourth.ratio,
  },
  modularSteps: ['sm', 'base', 'md', 'lg', 'xl', 'xxl', 'xxxl'],
  baseModularStep: 'base',
  namingConvention: 'font-size',
  shouldUseRems: true,
  roundingDecimalPlaces: 2,
};

/** Enum of delays in milliseconds, for consistency across event handlers. */
export const Delay = {
  SHORT: 150,
  MEDIUM: 300,
  LONG: 400,
};
