import { useState } from 'react';

const Input = ({ onChange, ...otherProps }) => {
  const [isValid, setIsValid] = useState(true);

  return (
    <input
      {...otherProps}
      aria-invalid={!isValid}
      onInvalid={(e) => e.target.reportValidity()}
      onChange={(e) => {
        const isValid = e.target.checkValidity();
        setIsValid(isValid);
        if (isValid) {
          // clear validity
          e.target.setCustomValidity('');
          onChange?.(e);
        }
      }}
    />
  );
};

export default Input;
