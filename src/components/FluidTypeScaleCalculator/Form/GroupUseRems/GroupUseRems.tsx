import { memo } from 'react';
import { QueryParamId } from '../../../../schema/schema.types';
import Input from '../../../Input/Input';
import Label from '../../../Label/Label';
import type { ActionSetShouldUseRems, FormState } from '../../FluidTypeScaleCalculator.types';

type Props = Pick<FormState, 'shouldUseRems'> & {
  /** Function to update the value for this input. */
  onChange: (payload: ActionSetShouldUseRems['payload']) => void;
};

const GroupUseRems = (props: Props) => {
  const { shouldUseRems, onChange } = props;

  return (
    <Label
      title="Show output in rems"
      description="It's recommended that you use rems for font size to respect user preferences in browser settings."
      layout="horizontal"
    >
      <Input
        type="checkbox"
        name={QueryParamId.shouldUseRems}
        checked={shouldUseRems}
        onChange={(e) => onChange(e.target.checked)}
      />
    </Label>
  );
};

export default memo(GroupUseRems);
