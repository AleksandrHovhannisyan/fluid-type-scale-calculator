import { QUERY_PARAM_CONFIG } from '../../../../api/api.constants';
import { QueryParamId } from '../../../../api/api.types';
import Input from '../../../Input/Input';
import Label from '../../../Label/Label';
import { useFormState } from '../../FluidTypeScaleCalculator.context';
import styles from './GroupRounding.module.scss';

const GroupRounding = () => {
  const { state, dispatch } = useFormState();
  return (
    <Label title="Rounding" description="The maximum number of decimal places in the output." layout="to-horizontal">
      <Input
        name={QueryParamId.roundingDecimalPlaces}
        className={styles['rounding-input']}
        type="number"
        step={1}
        min={QUERY_PARAM_CONFIG[QueryParamId.roundingDecimalPlaces].min}
        max={QUERY_PARAM_CONFIG[QueryParamId.roundingDecimalPlaces].max}
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
