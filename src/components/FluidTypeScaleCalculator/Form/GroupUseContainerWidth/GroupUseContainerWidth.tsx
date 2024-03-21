import { memo } from 'react';
import { QueryParamId } from '../../../../schema/schema.types';
import Input from '../../../Input/Input';
import Label from '../../../Label/Label';
import type { ActionSetShouldUseRems, FormState } from '../../FluidTypeScaleCalculator.types';

type Props = Pick<FormState, 'shouldUseContainerWidth'> & {
  /** Function to update the value for this input. */
  onChange: (payload: ActionSetShouldUseRems['payload']) => void;
};

const GroupUseContainerWidth = (props: Props) => {
  const { shouldUseContainerWidth, onChange } = props;

  return (
    <Label
      title="Use container inline size (cqi) instead of viewport width"
      description="Note: Container queries may not be supported by all browsers."
      layout="horizontal"
    >
      <Input
        type="checkbox"
        name={QueryParamId.shouldUseContainerWidth}
        checked={shouldUseContainerWidth}
        onChange={(e) => onChange(e.target.checked)}
      />
    </Label>
  );
};

export default memo(GroupUseContainerWidth);
