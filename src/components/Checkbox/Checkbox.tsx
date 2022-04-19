import Input, { InputProps } from '../Input/Input';
import Label from '../Label/Label';
import styles from './Checkbox.module.scss';

type CheckboxProps = Omit<InputProps, 'type'> & {
  /** The label for the checkbox. */
  children?: string;
};

const Checkbox = ({ children, ...otherProps }: CheckboxProps) => {
  return (
    <Label title={children} direction="horizontal" className={styles['checkbox-label']}>
      <Input type="checkbox" {...otherProps} />
    </Label>
  );
};

export default Checkbox;
