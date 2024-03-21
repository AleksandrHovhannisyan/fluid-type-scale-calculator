import { memo } from 'react';
import { QueryParamId } from '../../../../schema/schema.types';
import Fieldset from '../../../Fieldset/Fieldset';
import Input from '../../../Input/Input';
import Label from '../../../Label/Label';
import type { ActionSetMin, FormState } from '../../FluidTypeScaleCalculator.types';
import TypeScalePicker from '../../TypeScalePicker/TypeScalePicker';

type Props = Pick<FormState, 'min' | 'shouldUseContainerWidth'> & {
  /** Function to update the value for this input. */
  onChange: (payload: ActionSetMin['payload']) => void;
  /** The maximum allowed value for the screen/container width input. */
  maxWidth: FormState['max']['width'];
};

const GroupMinimum = (props: Props) => {
  const { min, maxWidth, shouldUseContainerWidth, onChange } = props;

  return (
    <Fieldset
      title="Minimum (Mobile)"
      description={`Define the minimum font size and ${
        shouldUseContainerWidth ? 'container' : 'screen'
      } width for your type scale's baseline step. The minimum font size for all other steps is this baseline font size scaled up/down by your chosen type scale ratio.`}
    >
      <Label>
        Base font size (px)
        <Input
          name={QueryParamId.minFontSize}
          type="number"
          required={true}
          min={0}
          defaultValue={min.fontSize}
          onChange={(e) =>
            onChange({
              fontSize: e.target.valueAsNumber,
            })
          }
        />
      </Label>
      <Label>
        {shouldUseContainerWidth ? 'Container' : 'Screen'} width (px)
        <Input
          name={QueryParamId.minWidth}
          type="number"
          required={true}
          min={0}
          max={maxWidth}
          defaultValue={min.width}
          onChange={(e) =>
            onChange({
              width: e.target.valueAsNumber,
            })
          }
        />
      </Label>
      <TypeScalePicker
        name={QueryParamId.minRatio}
        id="type-scale-min"
        ratio={min.ratio}
        min={0}
        onChange={(e) => onChange({ ratio: e.target.valueAsNumber })}
      />
    </Fieldset>
  );
};

export default memo(GroupMinimum);
