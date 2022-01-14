import { Action, Delay } from '../../../constants';
import Input from '../../../Input';
import Label from '../../../Label';
import LabelGroup from '../../../Label/LabelGroup';
import Select from '../../../Select';

/**
 * @param {Pick<import("../../typedefs").AppState, 'modularSteps' | 'baseModularStep'> & { dispatch: import("../../typedefs").AppDispatcher } } props
 */
const GroupModularSteps = (props) => {
  const { modularSteps, baseModularStep, dispatch } = props;
  return (
    <Label
      as="fieldset"
      title="Type scale"
      description="Provide a comma-separated list of names for each step in your type scale, in ascending order of size. Use any convention you want. Be sure to also select your base modular step."
    >
      <LabelGroup>
        <label>
          All steps
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
        <label>
          Baseline step
          <Select
            defaultValue={baseModularStep}
            onChange={(e) =>
              dispatch({
                type: Action.SET_BASE_MODULAR_STEP,
                payload: e.target.value,
              })
            }
          >
            {modularSteps.map((step) => (
              <option key={step} value={step}>
                {step}
              </option>
            ))}
          </Select>
        </label>
      </LabelGroup>
    </Label>
  );
};

export default GroupModularSteps;
