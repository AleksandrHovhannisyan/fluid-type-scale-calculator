import { Action, Delay } from '../../constants';
import Input from '../../Input';

/**
 * @param {Pick<import("../../typedefs").AppState, 'modularSteps'> & { dispatch: import("../../typedefs").AppDispatcher } } props
 */
const GroupModularSteps = (props) => {
  const { modularSteps, dispatch } = props;
  return (
    <label className="label">
      <span className="label-title">Type scale steps</span>
      <span className="label-description">
        A comma-separated list of names for each step in your type scale, in ascending order of size. Use any convention
        you want.
      </span>
      <Input
        type="text"
        required
        spellCheck="false"
        pattern="^[a-zA-Z0-9-](?:(,\s*)?[a-zA-Z0-9-])*$"
        defaultValue={modularSteps.join(',')}
        delay={Delay.MEDIUM}
        onChange={(e) =>
          dispatch({
            type: Action.SET_MODULAR_STEPS,
            payload: e.target.value.split(',').map((step) => step.trim()),
          })
        }
      />
    </label>
  );
};

export default GroupModularSteps;
