import { useState } from 'react';

const Output = ({ namingConvention, typeScale }) => {
  const [isCopied, setIsCopied] = useState(false);

  const code = Object.entries(typeScale)
    .map(([step, { min, max, preferred }]) => {
      return `--${namingConvention}-${step}: clamp(${min}, ${preferred}, ${max});`;
    })
    .join('\n');

  return (
    <aside className="output">
      <div className="output-wrapper">
        <output id="code">
          <noscript>This app relies on JavaScript. Please enable it if you can.</noscript>
          {code}
        </output>
      </div>
      <button
        type="button"
        id="copy-to-clipboard"
        aria-label={isCopied ? `Copied` : `Copy code to clipboard`}
        onClick={() => {
          window.navigator.clipboard.writeText(code);
          setIsCopied(true);
          setTimeout(() => {
            setIsCopied(false);
          }, 2000);
        }}
      >
        {isCopied ? `Copied! 🎉` : `Copy code to clipboard 📋`}
      </button>
    </aside>
  );
};

export default Output;
