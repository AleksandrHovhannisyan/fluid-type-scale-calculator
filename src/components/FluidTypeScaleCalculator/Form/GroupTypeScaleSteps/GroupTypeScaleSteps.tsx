import { COMMA_SEPARATED_LIST_REGEX, Delay } from '../../../../constants';
import { toCommaSeparatedList } from '../../../../utils';
import Fieldset from '../../../Fieldset/Fieldset';
import Input from '../../../Input/Input';
import Label from '../../../Label/Label';
import Select from '../../../Select/Select';
import { useFormState } from '../../FluidTypeScaleCalculator.context';

const GroupTypeScaleSteps = () => {
  const { state, dispatch } = useFormState();
  return (
    <Fieldset
      title="Type scale"
      description="Provide a comma-separated list of names for each step in your type scale, in ascending order of font size. Use any convention you want. Be sure to also identify the name of your base step."
    >
      <Label>
        All steps
        <Input
          name="steps"
          type="text"
          title="Comma-separated list"
          required
          spellCheck="false"
          pattern={COMMA_SEPARATED_LIST_REGEX.source}
          defaultValue={state.typeScaleSteps.all.join(',')}
          delay={Delay.MEDIUM}
          onChange={(e) =>
            dispatch({
              type: 'setTypeScaleSteps',
              payload: { all: toCommaSeparatedList(e.target.value) },
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
    </Fieldset>
  );
};

export default GroupTypeScaleSteps;
