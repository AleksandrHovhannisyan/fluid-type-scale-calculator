import type { ButtonHTMLAttributes } from 'react';
import { useState } from 'react';
import Head from 'next/head';
import Alert from '../Alert/Alert';
import Button from '../Button/Button';

type CopyToClipboardButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** The text to copy to the clipboard on click. */
  text: string;
};

const BUTTON_ID = 'copy-to-clipboard-button';

const CopyToClipboardButton = (props: CopyToClipboardButtonProps) => {
  const { text, onClick, ...otherProps } = props;
  const [isCopied, setIsCopied] = useState(false);
  return (
    <>
      {/* Hide in a noscript environment since it's not possible to copy to clipboard without JS. */}
      <Head>
        <noscript>
          <style>{`#${BUTTON_ID} { display: none; }`}</style>
        </noscript>
      </Head>
      <Button
        id={BUTTON_ID}
        type="button"
        isFullWidth={true}
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
