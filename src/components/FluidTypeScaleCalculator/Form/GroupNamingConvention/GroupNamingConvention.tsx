import { memo } from 'react';
import { QueryParamId } from '../../../../schema/schema.types';
import Input from '../../../Input/Input';
import Label from '../../../Label/Label';
import type { ActionSetNamingConvention, FormState } from '../../FluidTypeScaleCalculator.types';

type Props = Pick<FormState, 'namingConvention'> & {
  /** Function to update the value for this input. */
  onChange: (action: ActionSetNamingConvention['payload']) => void;
};

const GroupNamingConvention = (props: Props) => {
  const { namingConvention, onChange } = props;
  return (
    <Label
      title="Variable prefix"
      description="Use whatever naming convention you prefer."
      layout="to-horizontal"
    >
      <Input
        name={QueryParamId.namingConvention}
        type="text"
        size={10}
        required={true}
        defaultValue={namingConvention}
        delay={0}
        onChange={(e) => onChange(e.target.value)}
      />
    </Label>
  );
};

export default memo(GroupNamingConvention);
