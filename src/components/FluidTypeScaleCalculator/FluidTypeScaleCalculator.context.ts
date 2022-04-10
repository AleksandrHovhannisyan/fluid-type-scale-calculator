import { createContext, useContext } from 'react';
import { queryParamDefaults, QueryParamKey } from '../../api/api.constants';
import { FormState, WithDispatch } from '../../types';

/** The initial values used to populate the app's form. */
export const initialFormState: FormState = {
  min: {
    fontSize: queryParamDefaults[QueryParamKey.minFontSize],
    screenWidth: queryParamDefaults[QueryParamKey.minScreenWidth],
    ratio: queryParamDefaults[QueryParamKey.minRatio],
  },
  max: {
    fontSize: queryParamDefaults[QueryParamKey.maxFontSize],
    screenWidth: queryParamDefaults[QueryParamKey.maxScreenWidth],
    ratio: queryParamDefaults[QueryParamKey.maxRatio],
  },
  typeScaleSteps: {
    all: queryParamDefaults[QueryParamKey.allSteps],
    base: queryParamDefaults[QueryParamKey.baseStep],
  },
  namingConvention: queryParamDefaults[QueryParamKey.namingConvention],
  shouldUseRems: queryParamDefaults[QueryParamKey.shouldUseRems],
  roundingDecimalPlaces: queryParamDefaults[QueryParamKey.roundingDecimalPlaces],
  fontFamily: queryParamDefaults[QueryParamKey.fontFamily],
};

type FormStateContext = WithDispatch & {
  state: FormState;
};

export const FormStateContext = createContext<FormStateContext>({
  state: initialFormState,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  dispatch: () => {},
});

export const useFormState = () => useContext(FormStateContext);
