import { createContext, useContext } from 'react';
import { schema } from '../../schema/schema';
import { QueryParamId } from '../../schema/schema.types';
import { FormAction, FormState, WithDispatch } from './FluidTypeScaleCalculator.types';
import { getStateFromSchema } from './FluidTypeScaleCalculator.utils';

export const initialFormState = getStateFromSchema(schema, {
  // HACK: HTML forms do not serialize unchecked checkbox inputs, so they don't appear in the URL query params. The .preprocess() logic for this param checks if it's undefined and, if so, returns false. Otherwise, it checks if the value is 'on' (what HTML serializes checked checkboxes to) or 'true' (custom alias). For the initial state, we need to pass this override to force useRems=true. Otherwise, we'll fall back to false and that's not the desired default.
  [QueryParamId.shouldUseRems]: 'true',
});

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
      const remValueInPx = shouldUseRems ? state.remValueInPx : 16;
      return { ...state, shouldUseRems, remValueInPx };
    }
    case 'setRemValueInPx': {
      return { ...state, remValueInPx: action.payload };
    }
    case 'setRoundingDecimalPlaces': {
      // TODO: read from zod schema
      const min = 0;
      const max = 10;
      // To prevent client-side errors (e.g., because we can't rounding to negative decimal places or it'll throw an error)
      const roundingDecimalPlaces = Math.max(Math.min(action.payload, max), min);
      return { ...state, roundingDecimalPlaces };
    }
    case 'setPreview': {
      return { ...state, preview: { ...state.preview, ...action.payload } };
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
