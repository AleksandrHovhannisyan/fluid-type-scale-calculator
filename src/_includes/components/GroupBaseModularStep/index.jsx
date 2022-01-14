import { Action } from '../constants';
import Label from '../Label';
import Select from '../Select';

/**
 * @param {Pick<import('../typedefs').AppState, 'baseModularStep' | 'modularSteps'> & { dispatch: import('../typedefs').AppDispatcher }} props
 */
const GroupBaseModularStep = (props) => {
  const { baseModularStep, modularSteps, dispatch } = props;
  return (
    <Label
      title="Baseline modular step"
      description="Identify the name of the baseline font size step in your type scale. This must appear in the list entered above."
    >
      <Select
        defaultValue={baseModularStep}
        onChange={(e) =>
          dispatch({
            type: Action.SET_BASE_MODULAR_STEP,
            payload: e.target.value,
          })
        }
      >
        {modularSteps.map((step) => (
          <option key={step} value={step}>
            {step}
          </option>
        ))}
      </Select>
    </Label>
  );
};
export default GroupBaseModularStep;
