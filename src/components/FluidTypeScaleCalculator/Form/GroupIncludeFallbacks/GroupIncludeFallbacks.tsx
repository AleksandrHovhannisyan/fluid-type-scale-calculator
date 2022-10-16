import { QueryParamId } from '../../../../api/api.types';
import Input from '../../../Input/Input';
import Label from '../../../Label/Label';
import { useFormState } from '../../FluidTypeScaleCalculator.context';

const GroupIncludeFallbacks = () => {
  const { state, dispatch } = useFormState();
  return (
    <Label
      title="Include fallback CSS"
      description="Some older browsers don't support CSS clamp. If enabled, this option tests for clamp support and outputs fallback variables."
      layout="horizontal"
    >
      <Input
        type="checkbox"
        name={QueryParamId.shouldIncludeFallbacks}
        checked={state.shouldIncludeFallbacks}
        onChange={(e) =>
          dispatch({
            type: 'setShouldIncludeFallbacks',
            payload: e.target.checked,
          })
        }
      />
    </Label>
  );
};

export default GroupIncludeFallbacks;
