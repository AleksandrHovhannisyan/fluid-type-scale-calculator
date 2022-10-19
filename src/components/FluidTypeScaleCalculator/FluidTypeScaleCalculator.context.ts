import { createContext, useContext } from 'react';
import { schema } from '../../schema/schema';
import { QueryParamId } from '../../schema/schema.types';
import { FormAction, FormState, WithDispatch } from './FluidTypeScaleCalculator.types';

/** The initial values used to populate the app's form. */
export const initialFormState: FormState = {
  min: {
    fontSize: schema[QueryParamId.minFontSize].default,
    screenWidth: schema[QueryParamId.minWidth].default,
    ratio: schema[QueryParamId.minRatio].default,
  },
  max: {
    fontSize: schema[QueryParamId.maxFontSize].default,
    screenWidth: schema[QueryParamId.maxWidth].default,
    ratio: schema[QueryParamId.maxRatio].default,
  },
  typeScaleSteps: {
    all: schema[QueryParamId.allSteps].default,
    base: schema[QueryParamId.baseStep].default,
  },
  namingConvention: schema[QueryParamId.namingConvention].default,
  shouldIncludeFallbacks: schema[QueryParamId.shouldIncludeFallbacks].default,
  shouldUseRems: schema[QueryParamId.shouldUseRems].default,
  remValueInPx: schema[QueryParamId.remValueInPx].default,
  roundingDecimalPlaces: schema[QueryParamId.roundingDecimalPlaces].default,
  fontFamily: schema[QueryParamId.previewFont].default,
};

/** Given the previous app state and a dispatched action, returns the newly transformed state.
 * https://www.aleksandrhovhannisyan.com/blog/managing-complex-state-react-usereducer/
 */
export const formStateReducer = (state: FormState, action: FormAction): FormState => {
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
    case 'setShouldIncludeFallbacks': {
      return { ...state, shouldIncludeFallbacks: action.payload };
    }
    case 'setShouldUseRems': {
      const shouldUseRems = action.payload;
      const remValueInPx = shouldUseRems ? state.remValueInPx : initialFormState.remValueInPx;
      return { ...state, shouldUseRems, remValueInPx };
    }
    case 'setRemValueInPx': {
      return { ...state, remValueInPx: action.payload };
    }
    case 'setRoundingDecimalPlaces': {
      const min = schema[QueryParamId.roundingDecimalPlaces].min;
      const max = schema[QueryParamId.roundingDecimalPlaces].max;
      // To prevent client-side errors (e.g., because we can't rounding to negative decimal places or it'll throw an error)
      const roundingDecimalPlaces = Math.max(Math.min(action.payload, max), min);
      return { ...state, roundingDecimalPlaces };
    }
    case 'setFontFamily': {
      return { ...state, fontFamily: action.payload };
    }
    default:
      return initialFormState;
  }
};

type FormStateContext = WithDispatch & {
  state: FormState;
};

/** React context to expose the form state to any component that needs it. */
export const FormStateContext = createContext<FormStateContext>({
  state: initialFormState,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  dispatch: () => {},
});

/** Returns the form state context along with a dispatcher function to update the state. */
export const useFormState = () => useContext(FormStateContext);
