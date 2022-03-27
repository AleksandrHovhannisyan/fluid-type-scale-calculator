import { forwardRef, useMemo } from 'react';
import debounce from 'lodash/debounce';

/**
 * @typedef SelectProps
 * @property {number} delay The delay (in milliseconds) for the change event. Defaults to `0` (no delay).
 */

/**
 * @type React.FC<SelectProps & Omit<React.HTMLProps<HTMLSelectElement>, 'ref'>>
 */
const Select = forwardRef((props, ref) => {
  const { delay = 0, children, onChange, ...otherProps } = props;

  const handleChange = useMemo(() => {
    if (delay === 0) {
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
