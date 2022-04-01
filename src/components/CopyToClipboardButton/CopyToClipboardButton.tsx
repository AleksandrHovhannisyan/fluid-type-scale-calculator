import type { ButtonHTMLAttributes } from 'react';
import { useState } from 'react';
import Alert from '../Alert/Alert';
import Button from '../Button/Button';

type CopyToClipboardButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** The text to copy to the clipboard on click. */
  text: string;
};

const CopyToClipboardButton = (props: CopyToClipboardButtonProps) => {
  const { text, onClick, ...otherProps } = props;
  const [isCopied, setIsCopied] = useState(false);
  return (
    <>
      <Button
        id="copy-to-clipboard-button"
        type="button"
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
      </Button>
      {isCopied && <Alert className="sr-only">Copied</Alert>}
    </>
  );
};

export default CopyToClipboardButton;
