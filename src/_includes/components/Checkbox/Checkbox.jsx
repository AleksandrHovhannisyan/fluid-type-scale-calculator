import Input from '../Input/Input';
import Label from '../Label/Label';

/**
 * @type React.FC<React.HTMLProps<HTMLInputElement>>
 */
const Checkbox = ({ children, ...otherProps }) => {
  return (
    <Label title={children} direction="horizontal">
      <Input type="checkbox" {...otherProps} />
    </Label>
  );
};

export default Checkbox;
