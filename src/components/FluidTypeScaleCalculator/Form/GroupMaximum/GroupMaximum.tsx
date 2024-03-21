import { memo } from 'react';
import { QueryParamId } from '../../../../schema/schema.types';
import Fieldset from '../../../Fieldset/Fieldset';
import Input from '../../../Input/Input';
import Label from '../../../Label/Label';
import type { ActionSetMax, FormState } from '../../FluidTypeScaleCalculator.types';
import TypeScalePicker from '../../TypeScalePicker/TypeScalePicker';

type Props = Pick<FormState, 'max' | 'shouldUseContainerWidth'> & {
  /** Function to update the value for this input. */
  onChange: (payload: ActionSetMax['payload']) => void;
  /** The minimum allowed value for the screen/container width input. */
  minWidth: FormState['min']['width'];
};

const GroupMaximum = (props: Props) => {
  const { max, minWidth, shouldUseContainerWidth, onChange } = props;

  return (
    <Fieldset
      title="Maximum (Desktop)"
      description={`Define the maximum font size and ${
        shouldUseContainerWidth ? 'container' : 'screen'
      } width for your type scale's baseline step. The max font size for all other steps is this baseline font size scaled up/down by your chosen type scale ratio.`}
    >
      <Label>
        Base font size (px)
        <Input
          name={QueryParamId.maxFontSize}
          type="number"
          required={true}
          min={0}
          defaultValue={max.fontSize}
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
          name={QueryParamId.maxWidth}
          type="number"
          required={true}
          min={minWidth}
          defaultValue={max.width}
          onChange={(e) =>
            onChange({
              width: e.target.valueAsNumber,
            })
          }
        />
      </Label>
      <TypeScalePicker
        name={QueryParamId.maxRatio}
        id="type-scale-max"
        ratio={max.ratio}
        min={0}
        onChange={(e) => onChange({ ratio: e.target.valueAsNumber })}
      />
    </Fieldset>
  );
};

export default memo(GroupMaximum);
