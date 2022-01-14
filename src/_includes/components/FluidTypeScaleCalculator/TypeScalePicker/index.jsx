import { modularRatios } from '../../constants';
import Select from '../../Select';

/**
 * @typedef TypeScalePickerProps
 * @property {ChangeEventHandler<HTMLSelectElement>} onChange - callback for when a type scale is clicked
 * @property {number} ratio - the currently selected numerical ratio
 */

/**
 * Dropdown menu for modular type scales
 * @param {TypeScalePickerProps} props
 */
const TypeScalePicker = (props) => {
  const { onChange, ratio } = props;
  return (
    <label>
      Type scale ratio
      <Select defaultValue={ratio} onChange={onChange}>
        {Object.entries(modularRatios).map(([key, { ratio }]) => {
          return (
            <option key={key} value={ratio}>
              {ratio}
            </option>
          );
        })}
      </Select>
    </label>
  );
};

export default TypeScalePicker;
