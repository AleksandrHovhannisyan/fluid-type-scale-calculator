import { memo } from 'react';
import { COMMA_SEPARATED_LIST_REGEX, Delay } from '../../../../constants';
import { QueryParamId } from '../../../../schema/schema.types';
import { toCommaSeparatedList } from '../../../../utils';
import Fieldset from '../../../Fieldset/Fieldset';
import Input from '../../../Input/Input';
import Label from '../../../Label/Label';
import Select from '../../../Select/Select';
import type { ActionSetTypeScaleSteps, FormState } from '../../FluidTypeScaleCalculator.types';

type Props = Pick<FormState, 'typeScaleSteps'> & {
  /** Function to update the value for this input. */
  onChange: (payload: ActionSetTypeScaleSteps['payload']) => void;
};

const GroupTypeScaleSteps = (props: Props) => {
  const { typeScaleSteps, onChange } = props;

  return (
    <Fieldset
      title="Type scale"
      description="Provide a comma-separated list of names for each step in your type scale, in ascending order of font size. Use any convention you want. Be sure to also identify the name of your base step."
    >
      <Label>
        All steps
        <Input
          name={QueryParamId.allSteps}
          type="text"
          title="Comma-separated list"
          required
          spellCheck="false"
          pattern={COMMA_SEPARATED_LIST_REGEX.source}
          defaultValue={typeScaleSteps.all.join(',')}
          delay={Delay.MEDIUM}
          onChange={(e) =>
            onChange({
              all: toCommaSeparatedList(e.target.value),
            })
          }
        />
      </Label>
      <Label>
        Baseline step
        <Select
          name={QueryParamId.baseStep}
          defaultValue={typeScaleSteps.base}
          onChange={(e) => onChange({ base: e.target.value })}
        >
          {typeScaleSteps.all.map((step) => (
            <option key={step} value={step}>
              {step}
            </option>
          ))}
        </Select>
      </Label>
    </Fieldset>
  );
};

export default memo(GroupTypeScaleSteps);
