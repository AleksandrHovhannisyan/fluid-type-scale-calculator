import { QueryParamId } from '../../../../api/api.types';
import Checkbox from '../../../Checkbox/Checkbox';
import { useFormState } from '../../FluidTypeScaleCalculator.context';

const GroupUseRems = () => {
  const { state, dispatch } = useFormState();
  return (
    <Checkbox
      name={QueryParamId.shouldUseRems}
      checked={state.shouldUseRems}
      onChange={(e) =>
        dispatch({
          type: 'setShouldUseRems',
          payload: e.target.checked,
        })
      }
    >
      Show output in rems
    </Checkbox>
  );
};

export default GroupUseRems;
