import { useMemo, useState } from 'react';
import debounce from 'lodash/debounce';
import { Delay } from '../constants';

const specializedPropsByType = {
  number: {
    inputMode: 'decimal',
  },
};

/**
 * @typedef InputProps
 * @property {number} delay - the delay (in milliseconds) for the change event. Defaults to a short delay if not specified and `0` for checkboxes, radio buttons, and range inputs.
 */

/**
 * @param {InputProps & React.HTMLProps<HTMLInputElement>} props
 */
const Input = (props) => {
  const { onChange, type, step, ...otherProps } = props;
  const htmlStep = type === 'number' ? step ?? 'any' : undefined;
  const delay = ['checkbox', 'radio', 'range'].includes(type) ? 0 : props.delay ?? Delay.SHORT;
  const [isValid, setIsValid] = useState(true);

  const debouncedHandleChange = useMemo(
    () => {
      const handleChange = (e) => {
        const isValid = e.target.checkValidity();
        setIsValid(isValid);
        if (isValid) {
          // clear validity
          e.target.setCustomValidity('');
          onChange?.(e);
        } else {
          e.target.reportValidity();
        }
      };
      // Sub-optimization: don't debounce if no delay
      if (delay === 0) {
        return handleChange;
      }
      return debounce(handleChange, delay);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [delay]
  );

  return (
    <input
      {...otherProps}
      {...specializedPropsByType[type]}
      type={type}
      step={htmlStep}
      aria-invalid={!isValid}
      onChange={debouncedHandleChange}
    />
  );
};

export default Input;
