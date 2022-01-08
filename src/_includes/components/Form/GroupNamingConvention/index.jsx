import { Action } from '../../constants';
import Input from '../../Input';
import Label from '../../Label';

/**
 * @param {Pick<import("../../typedefs").AppState, 'namingConvention'> & { dispatch: import("../../typedefs").AppDispatcher } } props
 */
const GroupNamingConvention = (props) => {
  const { namingConvention, dispatch } = props;
  return (
    <Label
      title="Variable naming convention"
      description="Prefixed to each modular step to create unique variable names."
    >
      <Input
        type="text"
        required={true}
        defaultValue={namingConvention}
        delay={0}
        onChange={(e) =>
          dispatch({
            type: Action.SET_NAMING_CONVENTION,
            payload: e.target.value,
          })
        }
      />
    </Label>
  );
};

export default GroupNamingConvention;
