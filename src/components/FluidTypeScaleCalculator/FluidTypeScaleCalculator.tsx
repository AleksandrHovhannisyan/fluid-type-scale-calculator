import { useReducer } from 'react';
import { initialFormState } from '../../constants';
import type { FormAction, FormState, TypeScale, WithFonts } from '../../types';
import Stack from '../Stack/Stack';
import Form from './Form/Form';
import Output from './Output/Output';
import Preview from './Preview/Preview';
import styles from './FluidTypeScaleCalculator.module.scss';

/** Given the previous app state and a dispatched action, returns the newly transformed state.
 * https://www.aleksandrhovhannisyan.com/blog/managing-complex-state-react-usereducer/
 */
const reducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'setMin': {
      return { ...state, min: { ...state.min, ...action.payload } };
    }
    case 'setMax': {
      return { ...state, max: { ...state.max, ...action.payload } };
    }
    case 'setModularSteps': {
      const modularSteps = action.payload;
      const baseModularStep = modularSteps.includes(state.baseModularStep) ? state.baseModularStep : modularSteps[0];
      return { ...state, modularSteps, baseModularStep };
    }
    case 'setBaseModularStep': {
      return { ...state, baseModularStep: action.payload };
    }
    case 'setNamingConvention': {
      return { ...state, namingConvention: action.payload };
    }
    case 'setShouldUseRems': {
      return { ...state, shouldUseRems: action.payload };
    }
    case 'setRoundingDecimalPlaces': {
      return { ...state, roundingDecimalPlaces: action.payload };
    }
    default:
      return initialFormState;
  }
};

type Props = WithFonts;

const FluidTypeScaleCalculator = (props: Props) => {
  const [state, dispatch] = useReducer(reducer, initialFormState);

  /** Appends the correct unit to a unitless value. */
  const withUnit = (unitlessValue: number) => `${unitlessValue}${state.shouldUseRems ? 'rem' : 'px'}`;

  /** Rounds the given value to a fixed number of decimal places, according to the user's specified value. */
  const round = (val: number) => Number(val.toFixed(state.roundingDecimalPlaces));

  /** If we're using rems, converts the pixel arg to rems. Else, keeps it in pixels. */
  const convertToDesiredUnit = (px: number) => (state.shouldUseRems ? px / 16 : px);

  // Get the index of the base modular step to compute exponents relative to the base index (up/down)
  const baseModularStepIndex = state.modularSteps.indexOf(state.baseModularStep);

  const typeScale = state.modularSteps.reduce((steps, step, i) => {
    const min = {
      fontSize: state.min.fontSize * Math.pow(state.min.modularRatio, i - baseModularStepIndex),
      breakpoint: state.min.screenWidth,
    };
    const max = {
      fontSize: state.max.fontSize * Math.pow(state.max.modularRatio, i - baseModularStepIndex),
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

  return (
    <div className={styles['type-scale-generator']}>
      <Stack>
        <Form {...state} dispatch={dispatch} />
        <Output namingConvention={state.namingConvention} typeScale={typeScale} />
      </Stack>
      <Preview typeScale={typeScale} fonts={props.fonts} />
    </div>
  );
};

export default FluidTypeScaleCalculator;
