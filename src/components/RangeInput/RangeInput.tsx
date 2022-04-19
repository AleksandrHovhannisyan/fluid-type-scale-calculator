import Input, { InputProps } from '../Input/Input';
import Label from '../Label/Label';
import styles from './RangeInput.module.scss';

type RangeInputProps = Omit<InputProps, 'label' | 'type'> & {
  /** A string to label the range input. */
  label?: string;
};

/**
 * Displays a range input slider along with a custom input box to allow for manual inputs.
 */
const RangeInput = (props: RangeInputProps) => {
  const { id, label, required, ...otherProps } = props;
  const numericInputId = `${id}-numeric`;
  return (
    <div className={styles.range}>
      <Label htmlFor={id} title={label} />
      <div className={styles['range-display']}>
        <Input type="range" id={id} step={1} {...otherProps} />
        {/* Hide this label in an accessible manner since sighted users don't need to see it (the range label is sufficient). */}
        <Label title="Custom screen width" className="sr-only" htmlFor={numericInputId} />
        <Input id={numericInputId} type="number" step={1} delay={0} required={required} {...otherProps} />
      </div>
    </div>
  );
};

export default RangeInput;
