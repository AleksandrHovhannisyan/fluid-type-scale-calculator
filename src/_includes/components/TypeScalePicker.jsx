import { modularRatios } from './constants';

const TypeScalePicker = ({ onChange, ratio }) => {
  return (
    <label>
      Type scale ratio
      <select defaultValue={ratio} onChange={onChange}>
        {Object.entries(modularRatios).map(([key, { ratio }]) => {
          return (
            <option key={key} value={ratio}>
              {ratio}
            </option>
          );
        })}
      </select>
    </label>
  );
};

export default TypeScalePicker;
