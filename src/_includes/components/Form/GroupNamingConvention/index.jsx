import { Action } from '../../constants';
import Input from '../../Input';

/**
 * @param {Pick<import("../../typedefs").AppState, 'namingConvention'> & { dispatch: import("../../typedefs").AppDispatcher } } props
 */
const GroupNamingConvention = (props) => {
  const { namingConvention, dispatch } = props;
  return (
    <label className="label">
      <span className="label-title">Variable naming convention</span>
      <span className="label-description">Prefixed to each modular step to create unique variable names.</span>
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
    </label>
  );
};

export default GroupNamingConvention;
