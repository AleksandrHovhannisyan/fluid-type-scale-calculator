import { ButtonHTMLAttributes, useId } from 'react';
import { useState } from 'react';
import Head from 'next/head';
import Alert from '../Alert/Alert';
import Button from '../Button/Button';

type CopyToClipboardButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** The text to copy to the clipboard on click. */
  text: string;
};

const CopyToClipboardButton = (props: CopyToClipboardButtonProps) => {
  const { text, onClick, ...otherProps } = props;
  const [isCopied, setIsCopied] = useState(false);
  const id = useId();

  return (
    <>
      {/* Hide in a noscript environment since it's not possible to copy to clipboard without JS. */}
      <Head>
        <noscript>
          <style>{`#${id} { display: none; }`}</style>
        </noscript>
      </Head>
      <Button
        id={id}
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
        <Alert className="sr-only">{isCopied && 'Copied'}</Alert>
      </Button>
    </>
  );
};

export default CopyToClipboardButton;
