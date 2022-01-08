import { useReducer } from 'react';
import Stack from './Stack';
import Banner from './Banner';
import Form from './Form';
import Output from './Output';
import { Action, initialState } from './constants';
import Preview from './Preview';
import styles from './styles.module.scss';

/**
 * @param {import('./typedefs').AppState} state - the previous app state
 * @param {import('./typedefs').AppAction} action - the action to dispatch
 * @returns {import('./typedefs').AppState}
 */
const reducer = (state, action) => {
  switch (action.type) {
    case Action.SET_MIN: {
      return { ...state, min: { ...state.min, ...action.payload } };
    }
    case Action.SET_MAX: {
      return { ...state, max: { ...state.max, ...action.payload } };
    }
    case Action.SET_MODULAR_STEPS: {
      return { ...state, modularSteps: action.payload };
    }
    case Action.SET_BASE_MODULAR_STEP: {
      return { ...state, baseModularStep: action.payload };
    }
    case Action.SET_NAMING_CONVENTION: {
      return { ...state, namingConvention: action.payload };
    }
    case Action.SET_SHOULD_USE_REMS: {
      return { ...state, shouldUseRems: action.payload };
    }
    default:
      return initialState;
  }
};

const FluidTypeScaleGenerator = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  /** Appends the correct unit to a unitless value. */
  const withUnit = (unitlessValue) => `${unitlessValue}${state.shouldUseRems ? 'rem' : 'px'}`;

  /** Rounds the given value to a fixed number of decimal places. */
  const round = (val) => Number(val.toFixed(2));

  /** If we're using rems, converts the pixel arg to rems. Else, keeps it in pixels. */
  const convertToDesiredUnit = (px) => (state.shouldUseRems ? px / 16 : px);

  // Get the index of the base modular step to compute exponents relative to the base index (up/down)
  const baseModularStepIndex = state.modularSteps.indexOf(state.baseModularStep);

  /** @type {import('./typedefs').TypeScale} */
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
      getFontSizeAtScreenWidth: (width) => {
        let preferredFontSize = width * slope + intercept;
        preferredFontSize = Math.min(max.fontSize, preferredFontSize);
        preferredFontSize = Math.max(min.fontSize, preferredFontSize);
        return withUnit(round(convertToDesiredUnit(preferredFontSize)));
      },
    });
    return steps;
    // NOTE: Using a Map instead of an object to preserve key insertion order.
  }, new Map());

  return (
    <div className={styles['type-scale-generator']}>
      <noscript>
        <Banner>This app requires JavaScript. Please enable it if you can.</Banner>
      </noscript>
      <Stack>
        <Form {...state} dispatch={dispatch} />
        <Output namingConvention={state.namingConvention} typeScale={typeScale} />
      </Stack>
      <Preview typeScale={typeScale} fonts={props.fonts} />
    </div>
  );
};

export default FluidTypeScaleGenerator;
