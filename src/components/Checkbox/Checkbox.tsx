import type { ChangeEventHandler, HTMLProps } from 'react';
import Input from '../Input/Input';
import Label from '../Label/Label';

type CheckboxProps = Omit<HTMLProps<HTMLInputElement>, 'onChange'> & {
  /** The label for the checkbox. */
  children?: string;
  /** Callback for the change event when the checkbox is toggled. */
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

const Checkbox = ({ children, ...otherProps }: CheckboxProps) => {
  return (
    <Label title={children} direction="horizontal">
      <Input type="checkbox" {...otherProps} />
    </Label>
  );
};

export default Checkbox;
