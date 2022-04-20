import { QUERY_PARAM_CONFIG } from '../../../../api/api.constants';
import Input from '../../../Input/Input';
import Label from '../../../Label/Label';
import { useFormState } from '../../FluidTypeScaleCalculator.context';
import styles from './GroupRounding.module.scss';

const GroupRounding = () => {
  const { state, dispatch } = useFormState();
  return (
    <Label title="Rounding" description="The maximum number of decimal places in the output." layout="to-horizontal">
      <Input
        name="decimals"
        className={styles['rounding-input']}
        type="number"
        step={1}
        min={QUERY_PARAM_CONFIG.decimals.min}
        max={QUERY_PARAM_CONFIG.decimals.max}
        required={true}
        defaultValue={state.roundingDecimalPlaces}
        onChange={(e) =>
          dispatch({
            type: 'setRoundingDecimalPlaces',
            payload: e.target.valueAsNumber,
          })
        }
      />
    </Label>
  );
};
export default GroupRounding;
