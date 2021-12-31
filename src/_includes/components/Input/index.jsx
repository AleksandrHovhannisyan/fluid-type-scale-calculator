import { useState } from 'react';

const Input = ({ onChange, ...otherProps }) => {
  const [isValid, setIsValid] = useState(true);

  return (
    <input
      {...otherProps}
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
