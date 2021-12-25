import { output, inputs } from './elements.mjs';
import { generateTypographyVariables } from './utils.mjs';

// Copy to clipboard functionality for keyboard users
const copyToClipboardButton = document.querySelector('#copy-to-clipboard');
copyToClipboardButton.addEventListener('click', () => {
  window.navigator.clipboard.writeText(output.textContent);
  copyToClipboardButton.dataset.copied = true;
  setTimeout(() => {
    copyToClipboardButton.dataset.copied = false;
  }, 2000);
});

// Whenever any input value changes, recompute the output
Object.values(inputs).forEach((el) => {
  el.addEventListener('input', generateTypographyVariables);
});

// Compute initial output
generateTypographyVariables();
