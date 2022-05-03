import { QUERY_PARAM_CONFIG } from '../../../../api/api.constants';
import { QueryParamId } from '../../../../api/api.types';
import Fieldset from '../../../Fieldset/Fieldset';
import Input from '../../../Input/Input';
import Label from '../../../Label/Label';
import { useFormState } from '../../FluidTypeScaleCalculator.context';
import TypeScalePicker from '../../TypeScalePicker/TypeScalePicker';

const GroupMaximum = () => {
  const { state, dispatch } = useFormState();

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
          min={QUERY_PARAM_CONFIG[QueryParamId.maxFontSize].min}
          max={QUERY_PARAM_CONFIG[QueryParamId.maxFontSize].max}
          defaultValue={state.max.fontSize}
          onChange={(e) =>
            dispatch({
              type: 'setMax',
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
          name={QueryParamId.maxWidth}
          type="number"
          required={true}
          min={state.min.screenWidth + 1}
          max={QUERY_PARAM_CONFIG[QueryParamId.maxWidth].max}
          defaultValue={state.max.screenWidth}
          onChange={(e) =>
            dispatch({
              type: 'setMax',
              payload: {
                screenWidth: e.target.valueAsNumber,
              },
            })
          }
        />
      </Label>
      <TypeScalePicker
        name={QueryParamId.maxRatio}
        id="type-scale-max"
        ratio={state.max.ratio}
        min={QUERY_PARAM_CONFIG[QueryParamId.maxRatio].min}
        max={QUERY_PARAM_CONFIG[QueryParamId.maxRatio].max}
        onChange={(e) => dispatch({ type: 'setMax', payload: { ratio: e.target.valueAsNumber } })}
      />
    </Fieldset>
  );
};

export default GroupMaximum;
