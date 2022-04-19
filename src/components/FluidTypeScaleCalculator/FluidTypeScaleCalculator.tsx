import { useReducer } from 'react';
import type { TypeScale, WithFonts } from '../../types';
import Stack from '../Stack/Stack';
import Form from './Form/Form';
import Output from './Output/Output';
import Preview from './Preview/Preview';
import { FormStateContext, formStateReducer, initialFormState } from './FluidTypeScaleCalculator.context';
import { FormState } from './FluidTypeScaleCalculator.types';
import { getTypeScale } from './FluidTypeScaleCalculator.utils';
import styles from './FluidTypeScaleCalculator.module.scss';

type Props = WithFonts & {
  /** An optional initial state (e.g., from server-side query params). */
  initialState?: FormState;
};

const FluidTypeScaleCalculator = (props: Props) => {
  const [state, dispatch] = useReducer(formStateReducer, props.initialState ?? initialFormState);

  // Derived state. Could also store this in the state itself, but this also works.
  const typeScale = getTypeScale(state);

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
