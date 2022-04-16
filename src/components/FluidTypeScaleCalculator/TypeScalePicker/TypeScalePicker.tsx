import typeScaleRatios from '../../../data/typeScaleRatios.json';
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
  const { onChange, ratio, name, id, min, max } = props;
  return (
    <Label>
      Type scale ratio
      <Input
        name={name}
        type="number"
        step="any"
        list={id}
        min={min}
        max={max}
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
