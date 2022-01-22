import { Action } from '../../../constants';
import Input from '../../../Input';
import Label from '../../../Label';

/**
 * @param {Pick<import("../../../typedefs").AppState, 'roundingDecimalPlaces'> & { dispatch: import("../../../typedefs").AppDispatcher } } props
 */
const GroupRounding = (props) => {
  const { roundingDecimalPlaces, dispatch } = props;
  return (
    <Label title="Rounding" description="Control the maximum number of decimal places in the output.">
      <Input
        type="number"
        step={1}
        min={0}
        max={5}
        required={true}
        defaultValue={roundingDecimalPlaces}
        onChange={(e) =>
          dispatch({
            type: Action.SET_ROUNDING_DECIMAL_PLACES,
            payload: Number(e.target.value),
          })
        }
      />
    </Label>
  );
};
export default GroupRounding;
