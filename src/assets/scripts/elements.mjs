/** The element that outputs the CSS code for the app. */
export const code = document.querySelector('#code');

/** The preview element where sample text is shown to the user. */
export const preview = {
  fontPicker: document.querySelector('#font-picker'),
  textInput: document.querySelector('#input-preview-text'),
  tableBody: document.querySelector('#preview tbody'),
};

/** All interactive inputs that the user can customize. */
export const inputs = {
  baseFontSize: document.querySelector('#input-base-font-size'),
  typeScale: document.querySelector('#input-type-scale'),
  modularSteps: document.querySelector('#input-modular-steps'),
  baseModularStep: document.querySelector('#input-base-modular-step'),
  variableName: document.querySelector('#input-variable-name'),
  minBreakpoint: document.querySelector('#input-min-breakpoint'),
  maxBreakpoint: document.querySelector('#input-max-breakpoint'),
  shouldUseRems: document.querySelector('#input-use-rems'),
  rounding: document.querySelector('#input-rounding'),
};
