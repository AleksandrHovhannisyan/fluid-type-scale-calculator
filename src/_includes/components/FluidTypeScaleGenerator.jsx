import { useReducer, useState, useEffect } from 'react';
import Form from './Form';
import Output from './Output';
import { modularRatios } from './constants';
import Preview from './Preview';

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
    case 'setMin': {
      return { ...state, min: { ...state.min, ...action.payload } };
    }
    case 'setMax': {
      return { ...state, max: { ...state.max, ...action.payload } };
    }
    case 'setModularSteps': {
      return { ...state, modularSteps: action.payload };
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
      const intercept = convertToDesiredUnit(min.fontSize - slope * min.breakpoint);

      steps[step] = {
        min: withUnit(round(convertToDesiredUnit(min.fontSize))),
        max: withUnit(round(convertToDesiredUnit(max.fontSize))),
        preferred: `${slopeVw} + ${withUnit(round(intercept))}`,
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
    <div className="type-scale-generator">
      <div className="stack">
        <Form {...state} dispatch={dispatch} />
        <Output namingConvention={state.namingConvention} typeScale={typeScale} />
      </div>
      <Preview baseSizes={{ min: { ...state.min }, max: { ...state.max } }} typeScale={typeScale} fonts={props.fonts} />
    </div>
  );
};

export default FluidTypeScaleGenerator;
