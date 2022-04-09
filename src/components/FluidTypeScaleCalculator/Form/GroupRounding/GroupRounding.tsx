import { QueryParamKey } from '../../../../api/api.constants';
import Input from '../../../Input/Input';
import Label from '../../../Label/Label';
import { useFormState } from '../../FluidTypeScaleCalculator.context';
import styles from './GroupRounding.module.scss';

const GroupRounding = () => {
  const { state, dispatch } = useFormState();
  return (
    <div className={styles['group-rounding']}>
      <Label
        title="Rounding"
        description="The maximum number of decimal places in the output."
        htmlFor="group-rounding"
      />
      <Input
        name={QueryParamKey.roundingDecimalPlaces}
        id="group-rounding"
        type="number"
        step={1}
        min={0}
        required={true}
        defaultValue={state.roundingDecimalPlaces}
        onChange={(e) =>
          dispatch({
            type: 'setRoundingDecimalPlaces',
            payload: e.target.valueAsNumber,
          })
        }
      />
    </div>
  );
};
export default GroupRounding;
