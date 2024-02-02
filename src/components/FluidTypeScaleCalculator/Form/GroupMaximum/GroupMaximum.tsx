import { memo } from 'react';
import { schema } from '../../../../schema/schema';
import { QueryParamId } from '../../../../schema/schema.types';
import Fieldset from '../../../Fieldset/Fieldset';
import Input from '../../../Input/Input';
import Label from '../../../Label/Label';
import type { ActionSetMax, FormState } from '../../FluidTypeScaleCalculator.types';
import TypeScalePicker from '../../TypeScalePicker/TypeScalePicker';

type Props = Pick<FormState, 'max'> & {
  /** Function to update the value for this input. */
  onChange: (payload: ActionSetMax['payload']) => void;
  /** The minimum allowed value for the screen width input. */
  minScreenWidth: FormState['min']['screenWidth'];
};

const GroupMaximum = (props: Props) => {
  const { max, minScreenWidth, onChange } = props;

  return (
    <Fieldset
      title="Maximum (Desktop)"
      description="Define the maximum font size and viewport width for your type scale's baseline step. The max font size for all other steps is this baseline font size scaled up/down by your chosen type scale ratio."
    >
      <Label>
        Base font size (pixels)
        <Input
          name={QueryParamId.maxFontSize}
          type="number"
          required={true}
          min={schema[QueryParamId.maxFontSize].min}
          defaultValue={max.fontSize}
          onChange={(e) =>
            onChange({
              fontSize: e.target.valueAsNumber,
            })
          }
        />
      </Label>
      <Label>
        Screen width (pixels)
        <Input
          name={QueryParamId.maxWidth}
          type="number"
          required={true}
          min={minScreenWidth}
          defaultValue={max.screenWidth}
          onChange={(e) =>
            onChange({
              screenWidth: e.target.valueAsNumber,
            })
          }
        />
      </Label>
      <TypeScalePicker
        name={QueryParamId.maxRatio}
        id="type-scale-max"
        ratio={max.ratio}
        min={schema[QueryParamId.maxRatio].min}
        onChange={(e) => onChange({ ratio: e.target.valueAsNumber })}
      />
    </Fieldset>
  );
};

export default memo(GroupMaximum);
