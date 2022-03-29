import type { AppState, WithDispatch } from '../../../../types';
import Input from '../../../Input/Input';
import Label from '../../../Label/Label';
import styles from './GroupRounding.module.scss';

type Props = WithDispatch & Pick<AppState, 'roundingDecimalPlaces'>;

const GroupRounding = (props: Props) => {
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
            type: 'setRoundingDecimalPlaces',
            payload: Number(e.target.value),
          })
        }
      />
    </div>
  );
};
export default GroupRounding;
