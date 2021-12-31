import Input from './Input';

const RangeInput = ({ id, label, ...otherProps }) => {
  return (
    <div className="range">
      <label htmlFor={id}>
        <span className="label-title">{label}</span>
      </label>
      <div className="range-display">
        <Input type="range" id={id} {...otherProps} />
        <label className="label" data-flow="horizontal">
          Custom <Input type="number" {...otherProps} />
        </label>
      </div>
    </div>
  );
};

export default RangeInput;
