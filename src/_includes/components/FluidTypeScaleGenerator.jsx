import { useReducer, useState, useEffect } from 'react';
import Form from './Form';
import Output from './Output';
import { modularRatios } from './constants';
import Preview from './Preview';

export const initialState = {
  baseFontSizePx: 16,
  breakpoints: {
    min: 400,
    max: 1000,
  },
  modularRatio: modularRatios.perfectFourth.ratio,
  modularSteps: ['sm', 'base', 'md', 'lg', 'xl', 'xxl', 'xxxl'],
  baseModularStep: 'base',
  namingConvention: 'font-size',
  shouldUseRems: true,
  roundingDecimalPlaces: 2,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'setBaseFontSize': {
      return { ...state, baseFontSizePx: action.payload };
    }
    case 'setBreakpoints': {
      return { ...state, breakpoints: { ...state.breakpoints, ...action.payload } };
    }
    case 'setModularRatio': {
      return { ...state, modularRatio: action.payload };
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
        fontSize: state.baseFontSizePx * Math.pow(state.modularRatio, i - baseModularStepIndex),
        breakpoint: state.breakpoints.min,
      };
      const max = {
        fontSize: state.baseFontSizePx * Math.pow(state.modularRatio, i - baseModularStepIndex + 1),
        breakpoint: state.breakpoints.max,
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
    state.baseFontSizePx,
    state.breakpoints,
    state.modularRatio,
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
      <Preview typeScale={typeScale} fonts={props.fonts} />
    </div>
  );
};

export default FluidTypeScaleGenerator;
