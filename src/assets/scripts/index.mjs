import { code, preview } from './elements.mjs';
import { getStylesheetTag, render, subscribeToInputChanges } from './utils.mjs';

// Copy to clipboard functionality for keyboard users
const copyToClipboardButton = document.querySelector('#copy-to-clipboard');
copyToClipboardButton.addEventListener('click', () => {
  window.navigator.clipboard.writeText(code.textContent);
  copyToClipboardButton.dataset.copied = true;
  setTimeout(() => {
    copyToClipboardButton.dataset.copied = false;
  }, 2000);
});

// Custom font picker for preview text
preview.fontPicker.addEventListener('input', async (e) => {
  if (!preview.textInput.value) return;
  const fontFamily = e.target.value;
  const linkTag = getStylesheetTag('user-selected-font');
  document.head.appendChild(linkTag);
  linkTag.addEventListener('load', async () => {
    await document.fonts.load(`1em ${fontFamily}`, preview.textInput.value);
    // TODO: only render preview
    render();
  });
  linkTag.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(/ /g, '+')}&display=swap`;
});

subscribeToInputChanges();
render();
