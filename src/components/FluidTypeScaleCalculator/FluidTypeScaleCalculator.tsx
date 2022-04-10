import { useReducer } from 'react';
import { initialFormState } from '../../constants';
import type { FormAction, FormState, TypeScale, WithFonts } from '../../types';
import Stack from '../Stack/Stack';
import Form from './Form/Form';
import Output from './Output/Output';
import Preview from './Preview/Preview';
import { FormStateContext } from './FluidTypeScaleCalculator.context';
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
    case 'setTypeScaleSteps': {
      const allSteps = action.payload.all ?? state.typeScaleSteps.all;
      let baseStep = action.payload.base ?? state.typeScaleSteps.base;
      // This might happen if a user changes the array of steps and the base step becomes stale, pointing to a now-invalid value.
      // In that case, we reset the base step to the first item in the array of all steps. Users can change this later.
      if (!allSteps.includes(baseStep)) {
        baseStep = allSteps[0];
      }
      return { ...state, typeScaleSteps: { all: allSteps, base: baseStep } };
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
    case 'setFontFamily': {
      return { ...state, fontFamily: action.payload };
    }
    default:
      return initialFormState;
  }
};

type Props = WithFonts & {
  /** An optional initial state (e.g., from server-side query params). */
  initialState?: FormState;
};

const FluidTypeScaleCalculator = (props: Props) => {
  const [state, dispatch] = useReducer(reducer, props.initialState ?? initialFormState);

  /** Appends the correct unit to a unitless value. */
  const withUnit = (unitlessValue: number) => `${unitlessValue}${state.shouldUseRems ? 'rem' : 'px'}`;

  /** Rounds the given value to a fixed number of decimal places, according to the user's specified value. */
  const round = (val: number) => Number(val.toFixed(state.roundingDecimalPlaces));

  /** If we're using rems, converts the pixel arg to rems. Else, keeps it in pixels. */
  const convertToDesiredUnit = (px: number) => (state.shouldUseRems ? px / 16 : px);

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

  return (
    <FormStateContext.Provider value={{ state, dispatch }}>
      <div className={styles['type-scale-calculator']}>
        <Stack className={styles['type-scale-stack']}>
          <Form />
          <Output typeScale={typeScale} />
        </Stack>
        <Preview typeScale={typeScale} fonts={props.fonts} />
      </div>
    </FormStateContext.Provider>
  );
};

export default FluidTypeScaleCalculator;
