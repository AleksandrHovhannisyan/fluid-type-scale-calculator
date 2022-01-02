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
  const { onChange, type, step, ...otherProps } = props;
  const htmlStep = type === 'number' ? step ?? 'any' : undefined;
  const [isValid, setIsValid] = useState(true);

  return (
    <input
      {...otherProps}
      {...specializedPropsByType[type]}
      type={type}
      step={htmlStep}
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
