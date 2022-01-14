import GroupMaximum from './GroupMaximum';
import GroupMinimum from './GroupMinimum';
import GroupModularSteps from './GroupModularSteps';
import GroupNamingConvention from './GroupNamingConvention';
import GroupUseRems from './GroupUseRems';
import styles from './styles.module.scss';

/**
 * @param {import('../typedefs').AppState & { dispatch: import("../../typedefs").AppDispatcher }} props
 */
const Form = (props) => {
  const { min, max, shouldUseRems, modularSteps, baseModularStep, namingConvention, dispatch } = props;

  return (
    <form className={styles.form}>
      <GroupMinimum min={min} maxScreenWidth={max.screenWidth} dispatch={dispatch} />
      <GroupMaximum max={max} minScreenWidth={min.screenWidth} dispatch={dispatch} />
      <GroupModularSteps modularSteps={modularSteps} baseModularStep={baseModularStep} dispatch={dispatch} />
      <GroupNamingConvention namingConvention={namingConvention} dispatch={dispatch} />
      <GroupUseRems shouldUseRems={shouldUseRems} dispatch={dispatch} />
    </form>
  );
};

export default Form;
