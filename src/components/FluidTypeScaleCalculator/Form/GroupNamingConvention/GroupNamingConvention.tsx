import type { AppState, WithDispatch } from '../../../../types';
import Input from '../../../Input/Input';
import Label from '../../../Label/Label';

type Props = WithDispatch & Pick<AppState, 'namingConvention'>;

const GroupNamingConvention = (props: Props) => {
  const { namingConvention, dispatch } = props;
  return (
    <Label
      title="Variable naming convention"
      description="Prefixed to each modular step to create unique variable names."
    >
      <Input
        type="text"
        required={true}
        defaultValue={namingConvention}
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
