import { QUERY_PARAM_CONFIG } from '../../../../api/api.constants';
import { QueryParamId } from '../../../../api/api.types';
import Fieldset from '../../../Fieldset/Fieldset';
import Input from '../../../Input/Input';
import Label from '../../../Label/Label';
import { useFormState } from '../../FluidTypeScaleCalculator.context';
import TypeScalePicker from '../../TypeScalePicker/TypeScalePicker';

const GroupMinimum = () => {
  const { state, dispatch } = useFormState();
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
          min={QUERY_PARAM_CONFIG[QueryParamId.minFontSize].min}
          max={QUERY_PARAM_CONFIG[QueryParamId.minFontSize].max}
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
          name={QueryParamId.minWidth}
          type="number"
          required={true}
          min={QUERY_PARAM_CONFIG[QueryParamId.minWidth].min}
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
        name={QueryParamId.minRatio}
        id="type-scale-min"
        ratio={state.min.ratio}
        min={QUERY_PARAM_CONFIG[QueryParamId.minRatio].min}
        max={QUERY_PARAM_CONFIG[QueryParamId.minRatio].max}
        onChange={(e) => dispatch({ type: 'setMin', payload: { ratio: e.target.valueAsNumber } })}
      />
    </Fieldset>
  );
};

export default GroupMinimum;
