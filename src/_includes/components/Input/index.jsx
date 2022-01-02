import { useState } from 'react';

const specializedPropsByType = {
  number: {
    inputMode: 'decimal',
  },
};

/**
 * @param {React.HTMLProps<HTMLInputElement>} props
 */
const Input = (props) => {
  const { onChange, type, step = 'any', ...otherProps } = props;
  const [isValid, setIsValid] = useState(true);

  return (
    <input
      {...otherProps}
      {...specializedPropsByType[type]}
      type={type}
      step={step}
      aria-invalid={!isValid}
      onChange={(e) => {
        const isValid = e.target.checkValidity();
        setIsValid(isValid);
        if (isValid) {
          // clear validity
          e.target.setCustomValidity('');
          onChange?.(e);
        } else {
          e.target.reportValidity();
        }
      }}
    />
  );
};

export default Input;
