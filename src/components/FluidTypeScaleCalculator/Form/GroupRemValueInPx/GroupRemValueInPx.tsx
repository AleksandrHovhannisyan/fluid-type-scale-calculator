import { memo } from 'react';
import { QUERY_PARAM_CONFIG } from '../../../../api/api.constants';
import { QueryParamId } from '../../../../api/api.types';
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
        min={QUERY_PARAM_CONFIG[QueryParamId.remValueInPx].min}
        max={QUERY_PARAM_CONFIG[QueryParamId.remValueInPx].max}
        defaultValue={remValueInPx}
        required={true}
        onChange={(e) => onChange(e.target.valueAsNumber)}
      />
    </Label>
  );
};
export default memo(GroupRemValueInPx);
