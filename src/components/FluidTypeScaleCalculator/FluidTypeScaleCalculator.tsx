import { ChangeEvent, useReducer } from 'react';
import type { WithFonts } from '../../types';
import Button from '../Button/Button';
import Switcher from '../Switcher/Switcher';
import Output from './Output/Output';
import Preview from './Preview/Preview';
import { FormStateContext, formStateReducer, initialFormState } from './FluidTypeScaleCalculator.context';
import { FormState } from './FluidTypeScaleCalculator.types';
import { getTypeScale } from './FluidTypeScaleCalculator.utils';
import {
  GroupMaximum,
  GroupMinimum,
  GroupNamingConvention,
  GroupRemValueInPx,
  GroupRounding,
  GroupTypeScaleSteps,
  GroupUseRems,
} from './Form';
import styles from './FluidTypeScaleCalculator.module.scss';

type Props = WithFonts & {
  /** An optional initial state (e.g., from server-side query params). */
  initialState?: FormState;
};

const FluidTypeScaleCalculator = (props: Props) => {
  const [state, dispatch] = useReducer(formStateReducer, props.initialState ?? initialFormState);

  // Derived state. Could also store this in the state itself, but this also works.
  const typeScale = getTypeScale(state);

  // Whenever a form value changes, serialize the form data and update the URL shallowly.
  // Nice way to expose the link sharing functionality natively without having to do a dedicated copy button.
  const handleChange = (e: ChangeEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    const formData = new FormData(form);
    const urlParams = new URLSearchParams(formData as unknown as Record<string, string>).toString();
    const newUrl = `${form.action}?${urlParams}`;
    // We could also do this routing with Next.js's router, but that would trigger a page reload (even with shallow: true)
    // because we're requesting a new page. Why two pages? Because I want the home page to be SSG for better TTFB but the
    // calculate route to be SSR for link sharing via query params.
    // Solution: https://github.com/vercel/next.js/discussions/18072#discussioncomment-109059
    window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);
  };

  return (
    <FormStateContext.Provider value={{ state, dispatch }}>
      <form
        className={styles['type-scale-calculator']}
        action="/calculate"
        method="GET"
        onSubmit={(e) => e.preventDefault()}
        onChange={handleChange}
      >
        <Switcher className={styles['type-scale-stack']}>
          <div className={styles['form']}>
            <GroupMinimum />
            <GroupMaximum />
            <GroupTypeScaleSteps />
            <GroupNamingConvention />
            <GroupRounding />
            <GroupUseRems />
            {state.shouldUseRems && <GroupRemValueInPx />}
            <noscript>
              <Button type="submit" isFullWidth={true}>
                Generate type scale variables
              </Button>
            </noscript>
          </div>
          <Output typeScale={typeScale} />
        </Switcher>
        <Preview typeScale={typeScale} fonts={props.fonts} />
      </form>
    </FormStateContext.Provider>
  );
};

export default FluidTypeScaleCalculator;
