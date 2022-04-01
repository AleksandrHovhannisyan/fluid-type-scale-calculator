import { useState } from 'react';
import { Alert } from '../Alert/Alert';
import styles from './CopyToClipboardButton.module.scss';

/**
 * @typedef CopyToClipboardButtonProps
 * @property {string} text The text to copy to the clipboard on click
 */

/**
 *
 * @param {CopyToClipboardButtonProps & React.HTMLProps<HTMLButtonElement>} props
 */
const CopyToClipboardButton = (props) => {
  const { text, onClick, ...otherProps } = props;
  const [isCopied, setIsCopied] = useState(false);
  return (
    <>
      <button
        id="copy-to-clipboard-button"
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
        {isCopied ? (
          <>
            Copied! <span aria-hidden="true">🎉</span>
          </>
        ) : (
          <>
            Copy to clipboard <span aria-hidden="true">📋</span>
          </>
        )}
      </button>
      {isCopied && <Alert className="sr-only">Copied</Alert>}
    </>
  );
};

export default CopyToClipboardButton;