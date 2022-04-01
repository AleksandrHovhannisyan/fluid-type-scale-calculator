import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Button from '../../Button/Button';
import { useFormState } from '../FluidTypeScaleCalculator.context';
import GroupMaximum from './GroupMaximum/GroupMaximum';
import GroupMinimum from './GroupMinimum/GroupMinimum';
import GroupModularSteps from './GroupModularSteps/GroupModularSteps';
import GroupNamingConvention from './GroupNamingConvention/GroupNamingConvention';
import GroupRounding from './GroupRounding/GroupRounding';
import GroupUseRems from './GroupUseRems/GroupUseRems';
import { TYPE_SCALE_FORM_ID } from './Form.constants';
import styles from './Form.module.scss';

const Form = () => {
  const [isFirstRender, setIsFirstRender] = useState(true);
  const formRef = useRef<HTMLFormElement>(null);
  const { state } = useFormState();

  useEffect(() => {
    if (!formRef.current) return;
    // Don't update the URL on mount. Only when the state actually changes.
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }
    // Why not just serialize the app state and feed it to URLSearchParams? Because some state keys contain object data for convenience (e.g., min/max),
    // but the form itself has separate inputs for those aggregate data. In a no-JS environment, those inputs will be serialized individually per standard HTML behavior.
    // So to keep the API consistent for those two experiences, it's better to serialize the form here rather than the state.
    const formData = new FormData(formRef.current) as unknown as Record<string, string>;
    const urlParams = new URLSearchParams(formData).toString();
    const newUrl = `/calculate?${urlParams}`;
    // We could also do this routing with Next.js's router, but that would trigger a page reload (even with shallow: true)
    // because we're requesting a new page. Why two pages? Because I want the home page to be SSG for better TTFB but the calculate route to be SSR for link sharing via query params.
    // Also, this ensures that pressing the back button forces the page to re-render and update the view rather than showing stale data in the UI and cycling through history.
    // See here for the solution: https://github.com/vercel/next.js/discussions/18072#discussioncomment-109059
    window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, formRef]);

  return (
    <>
      <Head>
        <noscript>
          <style>{`.${styles['submit-button']} { display: unset !important; }`}</style>
        </noscript>
      </Head>
      <form
        id={TYPE_SCALE_FORM_ID}
        className={styles.form}
        action="/calculate"
        method="GET"
        ref={formRef}
        onSubmit={(e) => e.preventDefault()}
      >
        <GroupMinimum />
        <GroupMaximum />
        <GroupModularSteps />
        <GroupNamingConvention />
        <GroupRounding />
        <GroupUseRems />
        <Button className={styles['submit-button']} type="submit">
          Generate type scale variables
        </Button>
      </form>
    </>
  );
};

export default Form;
