import { useState } from 'react';
import styles from './styles.module.scss';

const CopyToClipboardButton = ({ text, onClick, ...otherProps }) => {
  const [isCopied, setIsCopied] = useState(false);
  return (
    <button
      type="button"
      className={styles['copy-to-clipboard-button']}
      onClick={() => {
        window.navigator.clipboard.writeText(text);
        setIsCopied(true);
        onClick?.();
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      }}
      {...otherProps}
    >
      {isCopied ? 'Copied! 🎉' : 'Copy to clipboard 📋'}
    </button>
  );
};

export default CopyToClipboardButton;
