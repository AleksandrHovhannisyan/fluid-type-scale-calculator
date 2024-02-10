import { memo } from 'react';
import { QueryParamId } from '../../../../schema/schema.types';
import Input from '../../../Input/Input';
import Label from '../../../Label/Label';
import type { ActionSetRemValueInPx, FormState } from '../../FluidTypeScaleCalculator.types';
import styles from './GroupRemValueInPx.module.scss';

type Props = Pick<FormState, 'remValueInPx'> & {
  /** Function to update the value for this input. */
  onChange: (payload: ActionSetRemValueInPx['payload']) => void;
};

const GroupRemValueInPx = (props: Props) => {
  const { remValueInPx, onChange } = props;

  return (
    <Label
      title="Rem value (pixels)"
      description="The pixel value of 1rem. Defaults to 16px in all browsers but can be changed with CSS. For example, if you set your root font size to 62.5%, then 1rem equals 10px."
      layout="to-horizontal"
    >
      <Input
        name={QueryParamId.remValueInPx}
        className={styles['rem-input']}
        type="number"
        step={1}
        // TODO: read from zod schema
        min={1}
        defaultValue={remValueInPx}
        required={true}
        onChange={(e) => onChange(e.target.valueAsNumber)}
      />
    </Label>
  );
};
export default memo(GroupRemValueInPx);
