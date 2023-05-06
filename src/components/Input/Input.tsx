import {
  ChangeEvent,
  DetailedHTMLProps,
  FocusEvent,
  HTMLInputTypeAttribute,
  HTMLProps,
  InputHTMLAttributes,
  useId,
} from 'react';
import { useMemo, useState } from 'react';
import debounce from 'lodash/debounce';
import { Delay } from '../../constants';
import styles from './Input.module.scss';

type InputType = NonNullable<HTMLInputTypeAttribute>;

/** Props by input type. */
const specializedPropsByType: Partial<Record<InputType, Partial<HTMLProps<HTMLInputElement>>>> = {
  number: {
    inputMode: 'decimal',
  },
};

export type InputProps = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'type'
> & {
  /** The delay (in milliseconds) for the change event. Defaults to a short delay if not specified and `0` for checkboxes, radio buttons, and range inputs. */
  delay?: 0 | Delay;
  /** The type of input. */
  type: InputType;
};

const Input = (props: InputProps) => {
  const { onChange, type, step, pattern, delay = Delay.SHORT, ...otherProps } = props;
  const htmlStep = type === 'number' ? step ?? 'any' : undefined;
  const finalDelay = ['checkbox', 'radio', 'range'].includes(type) ? 0 : delay;
  const [errorMessage, setErrorMessage] = useState('');
  const errorMessageId = useId();

  const debouncedHandleChange = useMemo(
    () => {
      const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e);
      };
      // Sub-optimization: don't debounce if no delay
      if (finalDelay === 0) {
        return handleChange;
      }
      return debounce(handleChange, finalDelay);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [finalDelay]
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Clear the previous validation message immediately
    if (errorMessage) {
      setErrorMessage('');
    }
    // Handle the actual change debounced
    debouncedHandleChange(e);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const input = e.target;
    // If we already validated this input and the user hasn't typed anything since then, abort
    if (errorMessage) {
      return;
    }
    // Update validation message
    const newValidationMessage = input.validationMessage;
    if (newValidationMessage !== errorMessage) {
      setErrorMessage(newValidationMessage);
    }
    // If invalid, focus the input so the message gets narrated
    if (newValidationMessage) {
      e.preventDefault();
      input.focus();
    }
  };

  return (
    <>
      {errorMessage && (
        <span className={styles.error} id={errorMessageId}>
          {errorMessage}
        </span>
      )}
      <input
        {...otherProps}
        {...specializedPropsByType[type]}
        type={type}
        step={htmlStep}
        aria-invalid={!!errorMessage}
        pattern={pattern}
        aria-describedby={errorMessage ? errorMessageId : undefined}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </>
  );
};

export default Input;
