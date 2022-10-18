import { memo } from 'react';
import { QueryParamId } from '../../../../schema/schema.types';
import Input from '../../../Input/Input';
import Label from '../../../Label/Label';
import type { ActionSetShouldIncludeFallbacks, FormState } from '../../FluidTypeScaleCalculator.types';

type Props = Pick<FormState, 'shouldIncludeFallbacks'> & {
  /** Function to update the value for this input. */
  onChange: (payload: ActionSetShouldIncludeFallbacks['payload']) => void;
};

const GroupIncludeFallbacks = (props: Props) => {
  const { shouldIncludeFallbacks, onChange } = props;

  return (
    <Label
      title="Include fallback CSS"
      description="Some older browsers don't support CSS clamp. If enabled, this option tests for clamp support and outputs fallback variables."
      layout="horizontal"
    >
      <Input
        type="checkbox"
        name={QueryParamId.shouldIncludeFallbacks}
        checked={shouldIncludeFallbacks}
        onChange={(e) => onChange(e.target.checked)}
      />
    </Label>
  );
};

export default memo(GroupIncludeFallbacks);
