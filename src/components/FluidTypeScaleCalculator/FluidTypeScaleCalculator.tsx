import { useCallback, useMemo, useReducer } from 'react';
import debounce from 'lodash/debounce';
import { Delay } from '../../constants';
import type { WithFonts } from '../../types';
import Button from '../Button/Button';
import Switcher from '../Switcher/Switcher';
import GroupUseContainerWidth from './Form/GroupUseContainerWidth/GroupUseContainerWidth';
import Output from './Output/Output';
import Preview from './Preview/Preview';
import {
  FormStateContext,
  formStateReducer,
  initialFormState,
} from './FluidTypeScaleCalculator.context';
import {
  ActionSetMax,
  ActionSetMin,
  ActionSetNamingConvention,
  ActionSetRemValueInPx,
  ActionSetRoundingDecimalPlaces,
  ActionSetShouldIncludeFallbacks,
  ActionSetShouldUseContainerWidth,
  ActionSetShouldUseRems,
  ActionSetTypeScaleSteps,
  FormState,
} from './FluidTypeScaleCalculator.types';
import { getTypeScale } from './FluidTypeScaleCalculator.utils';
import {
  GroupIncludeFallbacks,
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

  // Whenever a form value changes, serialize the form data and update the URL shallowly. Nice way to expose the link sharing functionality natively without having to do a dedicated copy button.
  const handleFormChange = useMemo(() => {
    return debounce((form: HTMLFormElement) => {
      const formData = new FormData(form);
      const searchParams = new URLSearchParams(formData as unknown as Record<string, string>);
      const url = new URL(form.action);
      url.search = searchParams.toString();
      const newUrl = url.toString();
      // We could also do this routing with Next.js's router, but that would trigger a page reload (even with shallow: true) because we're requesting a new page. Why two pages? Because I want the home page to be SSG for better TTFB but the /calculate route to be SSR for link sharing via query params. Solution: https://github.com/vercel/next.js/discussions/18072#discussioncomment-109059
      window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);
    }, Delay.LONG);
  }, []);

  // Prefer defining these memoized event handlers here as opposed to consuming the dispatch function in each sub-component (which could allow a component to accidentally change slices of state that it should not be concerned with, and would defeat the purpose of using React.memo)
  const handleMinChange = useCallback(
    (payload: ActionSetMin['payload']) => dispatch({ type: 'setMin', payload }),
    []
  );
  const handleMaxChange = useCallback(
    (payload: ActionSetMax['payload']) => dispatch({ type: 'setMax', payload }),
    []
  );
  const handleStepsChange = useCallback(
    (payload: ActionSetTypeScaleSteps['payload']) =>
      dispatch({ type: 'setTypeScaleSteps', payload }),
    []
  );
  const handleNamingConventionChange = useCallback(
    (payload: ActionSetNamingConvention['payload']) =>
      dispatch({ type: 'setNamingConvention', payload }),
    []
  );
  const handleRoundingChange = useCallback(
    (payload: ActionSetRoundingDecimalPlaces['payload']) =>
      dispatch({ type: 'setRoundingDecimalPlaces', payload }),
    []
  );
  const handleShouldUseContainerWidthChange = useCallback(
    (payload: ActionSetShouldUseContainerWidth['payload']) =>
      dispatch({ type: 'setShouldUseContainerWidth', payload }),
    []
  );
  const handleFallbacksChange = useCallback(
    (payload: ActionSetShouldIncludeFallbacks['payload']) =>
      dispatch({ type: 'setShouldIncludeFallbacks', payload }),
    []
  );
  const handleShouldUseRemsChange = useCallback(
    (payload: ActionSetShouldUseRems['payload']) => dispatch({ type: 'setShouldUseRems', payload }),
    []
  );
  const handleRemValueInPxChange = useCallback(
    (payload: ActionSetRemValueInPx['payload']) => dispatch({ type: 'setRemValueInPx', payload }),
    []
  );

  // NOTE: No use memoizing the context value since state changes on every render anyway
  return (
    <FormStateContext.Provider value={{ state, dispatch }}>
      <form
        className={styles['type-scale-calculator']}
        action="/calculate"
        method="GET"
        onSubmit={(e) => e.preventDefault()}
        onChange={(e) => handleFormChange(e.currentTarget)}
      >
        <Switcher className={styles['type-scale-stack']}>
          <div className={styles['form']}>
            {/* Pass in props explicitly to each of these sub-components so we can memoize them. Otherwise, if we consume the context in each component, they will all re-render whenever some unrelated piece of state updates. */}
            <GroupMinimum
              min={state.min}
              maxWidth={state.max.width - 1}
              shouldUseContainerWidth={state.shouldUseContainerWidth}
              onChange={handleMinChange}
            />
            <GroupMaximum
              max={state.max}
              minWidth={state.min.width + 1}
              shouldUseContainerWidth={state.shouldUseContainerWidth}
              onChange={handleMaxChange}
            />
            <GroupTypeScaleSteps
              typeScaleSteps={state.typeScaleSteps}
              onChange={handleStepsChange}
            />
            <GroupNamingConvention
              namingConvention={state.namingConvention}
              onChange={handleNamingConventionChange}
            />
            <GroupRounding
              roundingDecimalPlaces={state.roundingDecimalPlaces}
              onChange={handleRoundingChange}
            />
            <GroupUseContainerWidth
              shouldUseContainerWidth={state.shouldUseContainerWidth}
              onChange={handleShouldUseContainerWidthChange}
            />
            <GroupIncludeFallbacks
              shouldIncludeFallbacks={state.shouldIncludeFallbacks}
              onChange={handleFallbacksChange}
            />
            <GroupUseRems
              shouldUseRems={state.shouldUseRems}
              onChange={handleShouldUseRemsChange}
            />
            {state.shouldUseRems && (
              <GroupRemValueInPx
                remValueInPx={state.remValueInPx}
                onChange={handleRemValueInPxChange}
              />
            )}
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
