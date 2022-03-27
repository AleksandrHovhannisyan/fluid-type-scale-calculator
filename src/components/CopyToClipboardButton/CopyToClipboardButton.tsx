import { ButtonHTMLAttributes, useState } from 'react';
import Alert from '../Alert/Alert';
import styles from './CopyToClipboardButton.module.scss';

type CopyToClipboardButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** The text to copy to the clipboard on click. */
  text: string;
};

const CopyToClipboardButton = (props: CopyToClipboardButtonProps) => {
  const { text, onClick, ...otherProps } = props;
  const [isCopied, setIsCopied] = useState(false);
  return (
    <>
      <button
        id="copy-to-clipboard-button"
        type="button"
        className={styles['copy-to-clipboard-button']}
        onClick={(e) => {
          window.navigator.clipboard.writeText(text);
          setIsCopied(true);
          onClick?.(e);
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
