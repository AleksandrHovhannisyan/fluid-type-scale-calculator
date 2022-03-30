import Input from '../../../Input/Input';
import Label from '../../../Label/Label';
import LabelGroup from '../../../Label/LabelGroup/LabelGroup';
import { useFormState } from '../../FluidTypeScaleCalculator.context';
import TypeScalePicker from '../../TypeScalePicker/TypeScalePicker';

const GroupMaximum = () => {
  const { state, dispatch } = useFormState();

  return (
    <Label
      as="fieldset"
      title="Maximum (Desktop)"
      description="Define the maximum font size and viewport width for your type scale's baseline step. The max font size for all other steps is this baseline font size scaled up/down by your chosen type scale ratio."
    >
      <LabelGroup>
        <Label>
          Base font size (pixels)
          <Input
            type="number"
            required={true}
            min={0}
            defaultValue={state.max.fontSize}
            onChange={(e) =>
              dispatch({
                type: 'setMax',
                payload: {
                  fontSize: Number(e.target.value),
                },
              })
            }
          />
        </Label>
        <Label>
          Screen width (pixels)
          <Input
            type="number"
            required={true}
            min={state.min.screenWidth + 1}
            defaultValue={state.max.screenWidth}
            onChange={(e) =>
              dispatch({
                type: 'setMax',
                payload: {
                  screenWidth: Number(e.target.value),
                },
              })
            }
          />
        </Label>
        <TypeScalePicker
          id="type-scale-max"
          ratio={state.max.modularRatio}
          onChange={(e) => dispatch({ type: 'setMax', payload: { modularRatio: Number(e.target.value) } })}
        />
      </LabelGroup>
    </Label>
  );
};

export default GroupMaximum;
