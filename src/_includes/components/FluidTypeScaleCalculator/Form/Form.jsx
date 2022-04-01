import GroupMaximum from './GroupMaximum/GroupMaximum';
import GroupMinimum from './GroupMinimum/GroupMinimum';
import GroupModularSteps from './GroupModularSteps/GroupModularSteps';
import GroupNamingConvention from './GroupNamingConvention/GroupNamingConvention';
import GroupRounding from './GroupRounding/GroupRounding';
import GroupUseRems from './GroupUseRems/GroupUseRems';
import styles from './Form.module.scss';

/**
 * @param {import('../typedefs').AppState & { dispatch: import("../../typedefs").AppDispatcher }} props
 */
const Form = (props) => {
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
