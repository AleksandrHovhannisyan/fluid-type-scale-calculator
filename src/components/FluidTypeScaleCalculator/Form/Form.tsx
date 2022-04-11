import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Button from '../../Button/Button';
import { useFormState } from '../FluidTypeScaleCalculator.context';
import GroupMaximum from './GroupMaximum/GroupMaximum';
import GroupMinimum from './GroupMinimum/GroupMinimum';
import GroupNamingConvention from './GroupNamingConvention/GroupNamingConvention';
import GroupRounding from './GroupRounding/GroupRounding';
import GroupTypeScaleSteps from './GroupTypeScaleSteps/GroupTypeScaleSteps';
import GroupUseRems from './GroupUseRems/GroupUseRems';
import { TYPE_SCALE_FORM_ACTION, TYPE_SCALE_FORM_ID } from './Form.constants';
import styles from './Form.module.scss';

const Form = () => {
  const [isFirstRender, setIsFirstRender] = useState(true);
  const formRef = useRef<HTMLFormElement>(null);
  const { state } = useFormState();

  // Update on state change rather than form onChange for a few reasons:
  // 1. onChange fires immediately even if the individual inputs are debounced.
  // 2. we validate individual inputs based on their HTML constraints; onChange disregards those.
  // 3. onChange doesn't fire when inputs outside the form change, even if they're associated with the form.
  useEffect(() => {
    if (!formRef.current) return;
    // Don't update the URL on mount. Only when the state actually changes.
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }
    const formData = new FormData(formRef.current) as unknown as Record<string, string>;
    const urlParams = new URLSearchParams(formData).toString();
    const newUrl = `${TYPE_SCALE_FORM_ACTION}?${urlParams}`;
    // We could also do this routing with Next.js's router, but that would trigger a page reload (even with shallow: true)
    // because we're requesting a new page. Why two pages? Because I want the home page to be SSG for better TTFB but the
    // calculate route to be SSR for link sharing via query params.
    // Solution: https://github.com/vercel/next.js/discussions/18072#discussioncomment-109059
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
        ref={formRef}
        className={styles.form}
        action={TYPE_SCALE_FORM_ACTION}
        method="GET"
        onSubmit={(e) => e.preventDefault()}
      >
        <GroupMinimum />
        <GroupMaximum />
        <GroupTypeScaleSteps />
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
