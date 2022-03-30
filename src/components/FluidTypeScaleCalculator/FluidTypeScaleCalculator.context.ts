import { createContext, useContext } from 'react';
import { initialFormState } from '../../constants';
import { FormState, WithDispatch } from '../../types';

type FormStateContext = WithDispatch & {
  state: FormState;
};

export const FormStateContext = createContext<FormStateContext>({
  state: initialFormState,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  dispatch: () => {},
});

export const useFormState = () => useContext(FormStateContext);
