import { Action } from '../../../constants';
import Input from '../../../Input/Input';
import Label from '../../../Label/Label';
import styles from './GroupRounding.module.scss';

/**
 * @param {Pick<import("../../../typedefs").AppState, 'roundingDecimalPlaces'> & { dispatch: import("../../../typedefs").AppDispatcher } } props
 */
const GroupRounding = (props) => {
  const { roundingDecimalPlaces, dispatch } = props;
  return (
    <div className={styles['group-rounding']}>
      <Label
        title="Rounding"
        description="The maximum number of decimal places in the output."
        htmlFor="group-rounding"
      />
      <Input
        id="group-rounding"
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
    </div>
  );
};
export default GroupRounding;
