import { QueryParamKey } from '../../../../types';
import Input from '../../../Input/Input';
import Label from '../../../Label/Label';
import { useFormState } from '../../FluidTypeScaleCalculator.context';

const GroupNamingConvention = () => {
  const { state, dispatch } = useFormState();
  return (
    <Label
      title="Variable naming convention"
      description="Prefixed to each modular step to create unique variable names."
    >
      <Input
        name={QueryParamKey.namingConvention}
        type="text"
        required={true}
        defaultValue={state.namingConvention}
        delay={0}
        onChange={(e) =>
          dispatch({
            type: 'setNamingConvention',
            payload: e.target.value,
          })
        }
      />
    </Label>
  );
};

export default GroupNamingConvention;
