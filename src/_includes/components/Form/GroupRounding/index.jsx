import { Action } from '../../constants';
import Input from '../../Input';

/**
 * @param {Pick<import("../../typedefs").AppState, 'roundingDecimalPlaces'> & { dispatch: import("../../typedefs").AppDispatcher } } props
 */
const GroupRounding = (props) => {
  const { roundingDecimalPlaces, dispatch } = props;
  return (
    <label className="label">
      <span className="label-title">Rounding</span>
      <span className="label-description">Control how many decimal places are shown in the output.</span>
      <Input
        type="number"
        step={1}
        min={0}
        required={true}
        defaultValue={roundingDecimalPlaces}
        onChange={(e) =>
          dispatch({
            type: Action.SET_ROUNDING_DECIMAL_PLACES,
            payload: Number(e.target.value),
          })
        }
      />
    </label>
  );
};
export default GroupRounding;
