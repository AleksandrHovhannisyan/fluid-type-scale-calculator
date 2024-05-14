import clsx from 'clsx';
import Input, { InputProps } from '../Input/Input';
import Label from '../Label/Label';
import styles from './RangeInput.module.scss';

type RangeInputProps = Omit<InputProps, 'label' | 'type' | 'id'> &
  Required<Pick<InputProps, 'id'>> & {
    /** A string to label the range input. */
    label?: string;
    /** Optional styles for the range input slider. */
    sliderClassName?: string;
    /** Optional styles for the numeric input. */
    numericInputClassName?: string;
  };

/**
 * Displays a range input slider along with a custom input box to allow for manual inputs.
 */
const RangeInput = (props: RangeInputProps) => {
  const {
    id,
    name,
    label,
    required,
    sliderClassName,
    numericInputClassName,
    className,
    ...otherProps
  } = props;

  return (
    <Label title={label}>
      <div className={styles['range-input']}>
        <Input
          type="range"
          id={id}
          step={1}
          className={clsx(styles['range-slider'], sliderClassName)}
          {...otherProps}
        />
        <span>{otherProps.value}</span>
      </div>
    </Label>
  );
};

export default RangeInput;
