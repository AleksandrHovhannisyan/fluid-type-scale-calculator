import { ZodSchema } from 'zod';
import { UserSuppliedQueryParams } from '../../schema/schema.types';
import { TypeScale } from '../../types';
import { FormState } from './FluidTypeScaleCalculator.types';

/** Given a schema and query params, returns the corresponding runtime app state. */
export const getStateFromSchema = (
  schema: ZodSchema,
  query: UserSuppliedQueryParams
): FormState => {
  const params = schema.parse(query);
  return {
    min: {
      fontSize: params.minFontSize,
      screenWidth: params.minWidth,
      ratio: params.minRatio,
    },
    max: {
      fontSize: params.maxFontSize,
      screenWidth: params.maxWidth,
      ratio: params.maxRatio,
    },
    typeScaleSteps: {
      all: params.steps,
      base: params.baseStep,
    },
    namingConvention: params.prefix,
    shouldIncludeFallbacks: params.includeFallbacks,
    shouldUseRems: params.useRems,
    remValueInPx: params.remValue,
    roundingDecimalPlaces: params.decimals,
    preview: {
      fontFamily: params.previewFont,
      text: params.previewText,
      width: params.previewWidth,
    },
  };
};

/** Given a form state representing user input for the various parameters, returns
 * the corresponding type scale mapping each step to its min/max/preferred font sizes.
 */
export const getTypeScale = (state: FormState): TypeScale => {
  /** Appends the correct unit to a unitless value. */
  const withUnit = (unitlessValue: number) =>
    `${unitlessValue}${state.shouldUseRems ? 'rem' : 'px'}`;

  /** Rounds the given value to a fixed number of decimal places, according to the user's specified value. */
  const round = (val: number) => Number(val.toFixed(state.roundingDecimalPlaces));

  /** If we're using rems, converts the pixel arg to rems. Else, keeps it in pixels. */
  const convertToDesiredUnit = (px: number) => (state.shouldUseRems ? px / state.remValueInPx : px);

  // Get the index of the base modular step to compute exponents relative to the base index (up/down)
  const baseStepIndex = state.typeScaleSteps.all.indexOf(state.typeScaleSteps.base);

  // Reshape the data so we map each step name to a config describing its fluid font sizing values.
  // Do this on every render because it's essentially derived state; no need for a useEffect.
  // Note that some state variables are not necessary for this calculation, but it's simple enough that it's not expensive.
  const typeScale = state.typeScaleSteps.all.reduce((steps, step, i) => {
    const min = {
      fontSize: state.min.fontSize * Math.pow(state.min.ratio, i - baseStepIndex),
      breakpoint: state.min.screenWidth,
    };
    const max = {
      fontSize: state.max.fontSize * Math.pow(state.max.ratio, i - baseStepIndex),
      breakpoint: state.max.screenWidth,
    };
    const slope = (max.fontSize - min.fontSize) / (max.breakpoint - min.breakpoint);
    const slopeVw = `${round(slope * 100)}vw`;
    const intercept = min.fontSize - slope * min.breakpoint;

    steps.set(step, {
      min: withUnit(round(convertToDesiredUnit(min.fontSize))),
      max: withUnit(round(convertToDesiredUnit(max.fontSize))),
      preferred: `${slopeVw} + ${withUnit(round(convertToDesiredUnit(intercept)))}`,
      getFontSizeAtScreenWidth: (width: number) => {
        let preferredFontSize = width * slope + intercept;
        preferredFontSize = Math.min(max.fontSize, preferredFontSize);
        preferredFontSize = Math.max(min.fontSize, preferredFontSize);
        return withUnit(round(convertToDesiredUnit(preferredFontSize)));
      },
    });
    return steps;
    // NOTE: Using a Map instead of an object to preserve key insertion order.
  }, new Map() as TypeScale);

  return typeScale;
};
