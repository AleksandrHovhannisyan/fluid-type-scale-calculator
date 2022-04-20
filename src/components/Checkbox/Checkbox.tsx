import Input, { InputProps } from '../Input/Input';
import Label from '../Label/Label';
import styles from './Checkbox.module.scss';

type CheckboxProps = Omit<InputProps, 'type'> & {
  /** The label for the checkbox. */
  children?: string;
};

const Checkbox = ({ children, ...otherProps }: CheckboxProps) => {
  return (
    <Label title={children} className={styles['checkbox-label']} layout="horizontal">
      <Input type="checkbox" {...otherProps} />
    </Label>
  );
};

export default Checkbox;
