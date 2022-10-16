import { QueryParamId } from '../../../../api/api.types';
import Input from '../../../Input/Input';
import Label from '../../../Label/Label';
import { useFormState } from '../../FluidTypeScaleCalculator.context';

const GroupUseRems = () => {
  const { state, dispatch } = useFormState();
  return (
    <Label
      title="Show output in rems"
      description="It's recommended that you use rems for font size to respect user preferences in browser settings."
      layout="horizontal"
    >
      <Input
        type="checkbox"
        name={QueryParamId.shouldUseRems}
        checked={state.shouldUseRems}
        onChange={(e) =>
          dispatch({
            type: 'setShouldUseRems',
            payload: e.target.checked,
          })
        }
      />
    </Label>
  );
};

export default GroupUseRems;
