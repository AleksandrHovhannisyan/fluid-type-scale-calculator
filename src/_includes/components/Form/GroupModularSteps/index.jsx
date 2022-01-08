import { Action, Delay } from '../../constants';
import Input from '../../Input';
import Label from '../../Label';

/**
 * @param {Pick<import("../../typedefs").AppState, 'modularSteps'> & { dispatch: import("../../typedefs").AppDispatcher } } props
 */
const GroupModularSteps = (props) => {
  const { modularSteps, dispatch } = props;
  return (
    <Label
      title="Type scale steps"
      description="A comma-separated list of names for each step in your type scale, in ascending order of size. Use any convention you want."
    >
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
    </Label>
  );
};

export default GroupModularSteps;
