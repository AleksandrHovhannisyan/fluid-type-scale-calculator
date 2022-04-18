import type { DetailedHTMLProps, SelectHTMLAttributes } from 'react';
import { forwardRef, useMemo } from 'react';
import debounce from 'lodash/debounce';
import { InputProps } from '../Input/Input';

export type SelectProps = Pick<InputProps, 'name'> &
  Omit<DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>, 'ref' | 'name'> & {
    /** The delay (in milliseconds) for the change event. Defaults to `0` (no delay). */
    delay?: number;
  };

// eslint-disable-next-line react/display-name
const Select = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
  const { delay = 0, children, onChange, ...otherProps } = props;

  const handleChange = useMemo(() => {
    if (!onChange || delay === 0) {
      return onChange;
    }
    return debounce(onChange, delay);
  }, [onChange, delay]);

  return (
    <select ref={ref} onChange={handleChange} {...otherProps}>
      {children}
    </select>
  );
});

export default Select;
