import type { ChangeEvent, DetailedHTMLProps, HTMLInputTypeAttribute, HTMLProps, InputHTMLAttributes } from 'react';
import { useMemo, useState } from 'react';
import debounce from 'lodash/debounce';
import { Delay } from '../../constants';

type InputType = NonNullable<HTMLInputTypeAttribute>;

/** Props by input type. */
const specializedPropsByType: Partial<Record<InputType, Partial<HTMLProps<HTMLInputElement>>>> = {
  number: {
    inputMode: 'decimal',
  },
};

export type InputProps = Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'type'> & {
  /** The delay (in milliseconds) for the change event. Defaults to a short delay if not specified and `0` for checkboxes, radio buttons, and range inputs. */
  delay?: Delay;
  /** The type of input. */
  type: InputType;
};

const Input = (props: InputProps) => {
  const { onChange, type, step, pattern, delay = Delay.SHORT, ...otherProps } = props;
  const htmlStep = type === 'number' ? step ?? 'any' : undefined;
  const finalDelay = ['checkbox', 'radio', 'range'].includes(type) ? 0 : delay;
  const [isValid, setIsValid] = useState(true);

  // RegExp throws an error if the provided regex pattern is invalid. HTML doesn't perform any validation on the
  // pattern attribute (or any attribute, really), so best to let the error go uncaught and force the SSR build to fail.
  if (pattern) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const regexp = new RegExp(pattern);
  }

  const debouncedHandleChange = useMemo(
    () => {
      const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const isValid = e.target.checkValidity();
        setIsValid(isValid);
        if (isValid) {
          onChange?.(e);
        } else {
          e.target.reportValidity();
        }
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

  return (
    <input
      {...otherProps}
      {...specializedPropsByType[type]}
      type={type}
      step={htmlStep}
      aria-invalid={!isValid}
      pattern={pattern}
      onChange={debouncedHandleChange}
    />
  );
};

export default Input;
