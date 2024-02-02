import { memo } from 'react';
import { schema } from '../../../../schema/schema';
import { QueryParamId } from '../../../../schema/schema.types';
import Fieldset from '../../../Fieldset/Fieldset';
import Input from '../../../Input/Input';
import Label from '../../../Label/Label';
import type { ActionSetMin, FormState } from '../../FluidTypeScaleCalculator.types';
import TypeScalePicker from '../../TypeScalePicker/TypeScalePicker';

type Props = Pick<FormState, 'min'> & {
  /** Function to update the value for this input. */
  onChange: (payload: ActionSetMin['payload']) => void;
  /** The maximum allowed value for the screen width input. */
  maxScreenWidth: FormState['max']['screenWidth'];
};

const GroupMinimum = (props: Props) => {
  const { min, maxScreenWidth, onChange } = props;

  return (
    <Fieldset
      title="Minimum (Mobile)"
      description="Define the minimum font size and viewport width for your type scale's baseline step. The minimum font size for all other steps is this baseline font size scaled up/down by your chosen type scale ratio."
    >
      <Label>
        Base font size (pixels)
        <Input
          name={QueryParamId.minFontSize}
          type="number"
          required={true}
          min={schema[QueryParamId.minFontSize].min}
          defaultValue={min.fontSize}
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
          name={QueryParamId.minWidth}
          type="number"
          required={true}
          min={schema[QueryParamId.minWidth].min}
          max={maxScreenWidth}
          defaultValue={min.screenWidth}
          onChange={(e) =>
            onChange({
              screenWidth: e.target.valueAsNumber,
            })
          }
        />
      </Label>
      <TypeScalePicker
        name={QueryParamId.minRatio}
        id="type-scale-min"
        ratio={min.ratio}
        min={schema[QueryParamId.minRatio].min}
        onChange={(e) => onChange({ ratio: e.target.valueAsNumber })}
      />
    </Fieldset>
  );
};

export default memo(GroupMinimum);
