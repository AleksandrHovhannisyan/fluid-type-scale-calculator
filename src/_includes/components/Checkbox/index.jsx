import Input from '../Input';

const Checkbox = ({ children, ...otherProps }) => {
  return (
    <label className="label" data-flow="horizontal">
      <span className="label-title">{children}</span>
      <Input type="checkbox" {...otherProps} />
    </label>
  );
};

export default Checkbox;
