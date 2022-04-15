import { COMMA_SEPARATED_LIST_REGEX, Delay } from '../../../../constants';
import Input from '../../../Input/Input';
import Label from '../../../Label/Label';
import LabelGroup from '../../../Label/LabelGroup/LabelGroup';
import Select from '../../../Select/Select';
import { useFormState } from '../../FluidTypeScaleCalculator.context';

const GroupTypeScaleSteps = () => {
  const { state, dispatch } = useFormState();
  return (
    <Label
      as="fieldset"
      title="Type scale"
      description="Provide a comma-separated list of names for each step in your type scale, in ascending order of font size. Use any convention you want. Be sure to also identify the name of your base step."
    >
      <LabelGroup>
        <Label>
          All steps
          <Input
            name="steps"
            type="text"
            required
            spellCheck="false"
            pattern={COMMA_SEPARATED_LIST_REGEX.source}
            defaultValue={state.typeScaleSteps.all.join(',')}
            delay={Delay.MEDIUM}
            onChange={(e) =>
              dispatch({
                type: 'setTypeScaleSteps',
                payload: { all: e.target.value.split(',').map((step) => step.trim()) },
              })
            }
          />
        </Label>
        <Label>
          Baseline step
          <Select
            name="baseStep"
            defaultValue={state.typeScaleSteps.base}
            onChange={(e) =>
              dispatch({
                type: 'setTypeScaleSteps',
                payload: { base: e.target.value },
              })
            }
          >
            {state.typeScaleSteps.all.map((step) => (
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

export default GroupTypeScaleSteps;
