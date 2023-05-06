import { memo } from 'react';
import { schema } from '../../../../schema/schema';
import { QueryParamId } from '../../../../schema/schema.types';
import Input from '../../../Input/Input';
import Label from '../../../Label/Label';
import type {
  ActionSetRoundingDecimalPlaces,
  FormState,
} from '../../FluidTypeScaleCalculator.types';
import styles from './GroupRounding.module.scss';

type Props = Pick<FormState, 'roundingDecimalPlaces'> & {
  /** Function to update the value for this input. */
  onChange: (payload: ActionSetRoundingDecimalPlaces['payload']) => void;
};

const GroupRounding = (props: Props) => {
  const { roundingDecimalPlaces, onChange } = props;
  return (
    <Label
      title="Rounding"
      description="The maximum number of decimal places in the output."
      layout="to-horizontal"
    >
      <Input
        name={QueryParamId.roundingDecimalPlaces}
        className={styles['rounding-input']}
        type="number"
        step={1}
        min={schema[QueryParamId.roundingDecimalPlaces].min}
        max={schema[QueryParamId.roundingDecimalPlaces].max}
        required={true}
        defaultValue={roundingDecimalPlaces}
        onChange={(e) => onChange(e.target.valueAsNumber)}
      />
    </Label>
  );
};
export default memo(GroupRounding);
