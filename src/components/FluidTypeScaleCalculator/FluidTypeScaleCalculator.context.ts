import { createContext, useContext } from 'react';
import { QUERY_PARAM_CONFIG } from '../../api/api.constants';
import { QueryParamId } from '../../api/api.types';
import { FormAction, FormState, WithDispatch } from './FluidTypeScaleCalculator.types';

/** The initial values used to populate the app's form. */
export const initialFormState: FormState = {
  min: {
    fontSize: QUERY_PARAM_CONFIG[QueryParamId.minFontSize].default,
    screenWidth: QUERY_PARAM_CONFIG[QueryParamId.minWidth].default,
    ratio: QUERY_PARAM_CONFIG[QueryParamId.minRatio].default,
  },
  max: {
    fontSize: QUERY_PARAM_CONFIG[QueryParamId.maxFontSize].default,
    screenWidth: QUERY_PARAM_CONFIG[QueryParamId.maxWidth].default,
    ratio: QUERY_PARAM_CONFIG[QueryParamId.maxRatio].default,
  },
  typeScaleSteps: {
    all: QUERY_PARAM_CONFIG[QueryParamId.allSteps].default,
    base: QUERY_PARAM_CONFIG[QueryParamId.baseStep].default,
  },
  namingConvention: QUERY_PARAM_CONFIG[QueryParamId.namingConvention].default,
  shouldUseRems: QUERY_PARAM_CONFIG[QueryParamId.shouldUseRems].default,
  roundingDecimalPlaces: QUERY_PARAM_CONFIG[QueryParamId.roundingDecimalPlaces].default,
  fontFamily: QUERY_PARAM_CONFIG[QueryParamId.previewFont].default,
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
