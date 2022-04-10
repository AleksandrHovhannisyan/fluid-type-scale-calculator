import { typeScaleRatios } from '../../../constants';
import Input from '../../Input/Input';
import { InputProps } from '../../Input/Input';
import Label from '../../Label/Label';

type TypeScalePickerProps = Omit<InputProps, 'type'> & {
  /** The currently selected numeric type scale ratio. */
  ratio: number;
};

/**
 * Dropdown menu for modular type scales
 */
const TypeScalePicker = (props: TypeScalePickerProps) => {
  const { onChange, ratio, name, id } = props;
  return (
    <Label>
      Type scale ratio
      <Input
        name={name}
        type="number"
        step="any"
        list={id}
        min={0}
        defaultValue={ratio}
        onChange={onChange}
        required={true}
        delay={0}
      />
      <datalist id={id}>
        {Object.entries(typeScaleRatios).map(([key, { name, ratio }]) => {
          return (
            <option key={key} value={ratio}>
              {name}
            </option>
          );
        })}
      </datalist>
    </Label>
  );
};

export default TypeScalePicker;
