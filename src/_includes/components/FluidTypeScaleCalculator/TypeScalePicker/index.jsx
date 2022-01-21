import { modularRatios } from '../../constants';
import Input from '../../Input';
import Label from '../../Label';

/**
 * @typedef TypeScalePickerProps
 * @property {ChangeEventHandler<HTMLInputElement>} onChange - callback for when a type scale is clicked
 * @property {number} ratio - the currently selected numerical ratio
 */

/**
 * Dropdown menu for modular type scales
 * @param {TypeScalePickerProps & React.HTMLProps<HTMLInputElement>} props
 */
const TypeScalePicker = (props) => {
  const { onChange, ratio, id } = props;
  return (
    <Label>
      Type scale ratio
      <Input type="number" step="any" list={id} min={0} defaultValue={ratio} onChange={onChange} required={true} />
      <datalist id={id}>
        {Object.entries(modularRatios).map(([key, { name, ratio }]) => {
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
