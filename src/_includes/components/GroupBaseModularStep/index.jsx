import { Action } from '../constants';
import Input from '../Input';
import Label from '../Label';

/**
 * @param {Pick<import('../typedefs').AppState, 'baseModularStep'> & { dispatch: import('../typedefs').AppDispatcher }} props
 */
const GroupBaseModularStep = (props) => {
  const { baseModularStep, dispatch } = props;
  return (
    <Label
      title="Baseline modular step"
      description="Identify the name of the baseline font size step in your type scale. This must appear in the list entered above."
    >
      <Input
        type="text"
        required={true}
        defaultValue={baseModularStep}
        onChange={(e) =>
          dispatch({
            type: Action.SET_BASE_MODULAR_STEP,
            payload: e.target.value,
          })
        }
      />
    </Label>
  );
};
export default GroupBaseModularStep;
