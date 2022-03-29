import type { ChangeEventHandler, HTMLProps } from 'react';
import { forwardRef, useMemo } from 'react';
import debounce from 'lodash/debounce';

export type SelectProps = Omit<HTMLProps<HTMLSelectElement>, 'ref' | 'onChange'> & {
  /** The delay (in milliseconds) for the change event. Defaults to `0` (no delay). */
  delay?: number;
  /** Callback for the change event. */
  onChange: ChangeEventHandler<HTMLSelectElement>;
};

// eslint-disable-next-line react/display-name
const Select = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
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
