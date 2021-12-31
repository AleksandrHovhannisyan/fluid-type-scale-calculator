import { useReducer, useState, useEffect } from 'react';
import Form from './Form';
import Output from './Output';
import { Action, modularRatios } from './constants';
import Preview from './Preview';
import styles from './styles.module.scss';

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
    case Action.SET_ROUNDING_DECIMAL_PLACES: {
      return { ...state, roundingDecimalPlaces: action.payload };
    }
    default:
      return initialState;
  }
};

const FluidTypeScaleGenerator = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [typeScale, setTypeScale] = useState({});

  useEffect(() => {
    /** Appends the correct unit to a unitless value. */
    const withUnit = (unitlessValue) => (state.shouldUseRems ? `${unitlessValue}rem` : `${unitlessValue}px`);

    /** Rounds the given value to a fixed number of decimal places, according to the user's specified value. */
    const round = (val) => Number(val.toFixed(state.roundingDecimalPlaces));

    /** If we're using rems, converts the pixel arg to rems. Else, keeps it in pixels. */
    const convertToDesiredUnit = (px) => (state.shouldUseRems ? px / 16 : px);

    const baseModularStepIndex = state.modularSteps.indexOf(state.baseModularStep);

    const newTypeScale = state.modularSteps.reduce((steps, step, i) => {
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

      steps[step] = {
        min: withUnit(round(convertToDesiredUnit(min.fontSize))),
        max: withUnit(round(convertToDesiredUnit(max.fontSize))),
        preferred: `${slopeVw} + ${withUnit(round(convertToDesiredUnit(intercept)))}`,
        getFontSizeAtScreenWidth: (width) => {
          let preferredFontSize = width * slope + intercept;
          preferredFontSize = Math.min(max.fontSize, preferredFontSize);
          preferredFontSize = Math.max(min.fontSize, preferredFontSize);
          return withUnit(round(convertToDesiredUnit(preferredFontSize)));
        },
      };
      return steps;
    }, {});

    setTypeScale(newTypeScale);
  }, [
    state.min,
    state.max,
    state.modularSteps,
    state.baseModularStep,
    state.shouldUseRems,
    state.roundingDecimalPlaces,
  ]);

  return (
    <div className={styles['type-scale-generator']}>
      <div className="stack">
        <Form {...state} dispatch={dispatch} />
        <Output namingConvention={state.namingConvention} typeScale={typeScale} />
      </div>
      <Preview baseSizes={{ min: { ...state.min }, max: { ...state.max } }} typeScale={typeScale} fonts={props.fonts} />
    </div>
  );
};

export default FluidTypeScaleGenerator;
