import { QueryParamKey } from '../../../../api/api.constants';
import Input from '../../../Input/Input';
import Label from '../../../Label/Label';
import LabelGroup from '../../../Label/LabelGroup/LabelGroup';
import { useFormState } from '../../FluidTypeScaleCalculator.context';
import TypeScalePicker from '../../TypeScalePicker/TypeScalePicker';

const GroupMinimum = () => {
  const { state, dispatch } = useFormState();
  return (
    <Label
      as="fieldset"
      title="Minimum (Mobile)"
      description="Define the minimum font size and viewport width for your type scale's baseline step. The minimum font size for all other steps is this baseline font size scaled up/down by your chosen type scale ratio."
    >
      <LabelGroup>
        <Label>
          Base font size (pixels)
          <Input
            type="number"
            name={QueryParamKey.minFontSize}
            required={true}
            min={0}
            defaultValue={state.min.fontSize}
            onChange={(e) =>
              dispatch({
                type: 'setMin',
                payload: {
                  fontSize: e.target.valueAsNumber,
                },
              })
            }
          />
        </Label>
        <Label>
          Screen width (pixels)
          <Input
            name={QueryParamKey.minScreenWidth}
            type="number"
            required={true}
            min={0}
            max={state.max.screenWidth - 1}
            defaultValue={state.min.screenWidth}
            onChange={(e) =>
              dispatch({
                type: 'setMin',
                payload: {
                  screenWidth: e.target.valueAsNumber,
                },
              })
            }
          />
        </Label>
        <TypeScalePicker
          name={QueryParamKey.minRatio}
          id="type-scale-min"
          ratio={state.min.modularRatio}
          onChange={(e) => dispatch({ type: 'setMin', payload: { modularRatio: e.target.valueAsNumber } })}
        />
      </LabelGroup>
    </Label>
  );
};

export default GroupMinimum;
