import type { FormState, WithDispatch } from '../../../types';
import GroupMaximum from './GroupMaximum/GroupMaximum';
import GroupMinimum from './GroupMinimum/GroupMinimum';
import GroupModularSteps from './GroupModularSteps/GroupModularSteps';
import GroupNamingConvention from './GroupNamingConvention/GroupNamingConvention';
import GroupRounding from './GroupRounding/GroupRounding';
import GroupUseRems from './GroupUseRems/GroupUseRems';
import styles from './Form.module.scss';

type Props = WithDispatch & FormState;

const Form = (props: Props) => {
  const { min, max, shouldUseRems, modularSteps, baseModularStep, namingConvention, roundingDecimalPlaces, dispatch } =
    props;

  return (
    <form className={styles.form}>
      <GroupMinimum min={min} maxScreenWidth={max.screenWidth} dispatch={dispatch} />
      <GroupMaximum max={max} minScreenWidth={min.screenWidth} dispatch={dispatch} />
      <GroupModularSteps modularSteps={modularSteps} baseModularStep={baseModularStep} dispatch={dispatch} />
      <GroupNamingConvention namingConvention={namingConvention} dispatch={dispatch} />
      <GroupRounding roundingDecimalPlaces={roundingDecimalPlaces} dispatch={dispatch} />
      <GroupUseRems shouldUseRems={shouldUseRems} dispatch={dispatch} />
    </form>
  );
};

export default Form;
