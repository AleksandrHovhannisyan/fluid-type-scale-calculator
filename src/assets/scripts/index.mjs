import { code, googleFontPicker } from './elements.mjs';
import { getStylesheetTag, onFontLoaded, render, subscribeToInputChanges } from './utils.mjs';

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
googleFontPicker.addEventListener('input', async (e) => {
  const fontFamily = e.target.value;
  const linkTag = getStylesheetTag('user-selected-font');
  document.head.appendChild(linkTag);
  linkTag.addEventListener('load', onFontLoaded(fontFamily));
  linkTag.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(/ /g, '+')}&display=swap`;
});

subscribeToInputChanges();
render();
