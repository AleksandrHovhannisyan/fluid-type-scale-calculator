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
import { useRouter } from 'next/router';

const Form = () => {
  const [isFirstRender, setIsFirstRender] = useState(true);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
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
    router.push({ pathname: '/', query: urlParams }, undefined, { shallow: true });
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
        action="/"
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
