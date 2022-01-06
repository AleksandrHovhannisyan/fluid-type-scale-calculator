import { Action } from '../constants';
import Input from '../Input';

/**
 * @param {Pick<import('../typedefs').AppState, 'baseModularStep'> & { dispatch: import('../typedefs').AppDispatcher }} props
 */
const GroupBaseModularStep = (props) => {
  const { baseModularStep, dispatch } = props;
  return (
    <label className="label">
      <span className="label-title">Baseline modular step</span>
      <span className="label-description">
        Identify the name of the baseline font size step in your type scale. This must appear in the list entered above.
      </span>
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
    </label>
  );
};
export default GroupBaseModularStep;
