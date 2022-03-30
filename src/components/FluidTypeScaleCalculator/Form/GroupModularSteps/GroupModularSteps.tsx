import { Delay } from '../../../../constants';
import Input from '../../../Input/Input';
import Label from '../../../Label/Label';
import LabelGroup from '../../../Label/LabelGroup/LabelGroup';
import Select from '../../../Select/Select';
import { useFormState } from '../../FluidTypeScaleCalculator.context';

const GroupModularSteps = () => {
  const { state, dispatch } = useFormState();
  return (
    <Label
      as="fieldset"
      title="Type scale"
      description="Provide a comma-separated list of names for each step in your type scale, in ascending order of size. Use any convention you want. Be sure to also select your base modular step."
    >
      <LabelGroup>
        <Label>
          All steps
          <Input
            type="text"
            required
            spellCheck="false"
            pattern="^[a-zA-Z0-9-](?:(,\s*)?[a-zA-Z0-9-])*$"
            defaultValue={state.modularSteps.join(',')}
            delay={Delay.MEDIUM}
            onChange={(e) =>
              dispatch({
                type: 'setModularSteps',
                payload: e.target.value.split(',').map((step) => step.trim()),
              })
            }
          />
        </Label>
        <Label>
          Baseline step
          <Select
            defaultValue={state.baseModularStep}
            onChange={(e) =>
              dispatch({
                type: 'setBaseModularStep',
                payload: e.target.value,
              })
            }
          >
            {state.modularSteps.map((step) => (
              <option key={step} value={step}>
                {step}
              </option>
            ))}
          </Select>
        </Label>
      </LabelGroup>
    </Label>
  );
};

export default GroupModularSteps;
