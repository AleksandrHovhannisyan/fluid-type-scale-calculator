import elements from './elements.mjs';
import { generateTypographyVariables } from './utils.mjs';

// Copy to clipboard functionality for keyboard users
const copyToClipboardButton = document.querySelector('#copy-to-clipboard');
copyToClipboardButton.addEventListener('click', () => {
  window.navigator.clipboard.writeText(elements.output.textContent);
  copyToClipboardButton.dataset.copied = true;
  setTimeout(() => {
    copyToClipboardButton.dataset.copied = false;
  }, 2000);
});

// Whenever any input value changes, recompute the output
Object.values(elements).forEach((el) => {
  el.addEventListener('input', generateTypographyVariables);
});

// Compute initial output
generateTypographyVariables();
