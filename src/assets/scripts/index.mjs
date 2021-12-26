import { output } from './elements.mjs';
import { generateFluidTypeScale, loadValuesFromLocalStorage, subscribeToInputChanges } from './utils.mjs';

// Copy to clipboard functionality for keyboard users
const copyToClipboardButton = document.querySelector('#copy-to-clipboard');
copyToClipboardButton.addEventListener('click', () => {
  window.navigator.clipboard.writeText(output.textContent);
  copyToClipboardButton.dataset.copied = true;
  setTimeout(() => {
    copyToClipboardButton.dataset.copied = false;
  }, 2000);
});

loadValuesFromLocalStorage();
subscribeToInputChanges();
generateFluidTypeScale();
