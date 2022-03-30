import GroupMaximum from './GroupMaximum/GroupMaximum';
import GroupMinimum from './GroupMinimum/GroupMinimum';
import GroupModularSteps from './GroupModularSteps/GroupModularSteps';
import GroupNamingConvention from './GroupNamingConvention/GroupNamingConvention';
import GroupRounding from './GroupRounding/GroupRounding';
import GroupUseRems from './GroupUseRems/GroupUseRems';
import styles from './Form.module.scss';

const Form = () => {
  return (
    <form className={styles.form}>
      <GroupMinimum />
      <GroupMaximum />
      <GroupModularSteps />
      <GroupNamingConvention />
      <GroupRounding />
      <GroupUseRems />
    </form>
  );
};

export default Form;
