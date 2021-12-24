const elements = {
  output: document.querySelector('#output'),
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

const round = (val) => Number(val.toFixed(elements.rounding.value));

const generateTypographyVariables = () => {
  const baseFontSize = elements.baseFontSize.value;
  const typeScale = elements.typeScale.value;
  const modularSteps = elements.modularSteps.value.split(',').map((step) => step.trim());
  const baseModularStep = elements.baseModularStep.value;
  const baseModularStepIndex = modularSteps.indexOf(baseModularStep);
  const variableNamingConvention = elements.variableName.value;
  const shouldUseRems = elements.shouldUseRems.checked;
  const unit = shouldUseRems ? 'rem' : 'px';
  let outputText = ``;

  if (baseModularStepIndex === -1) {
    elements.output.innerHTML = `Base modular step not found.`;
    return;
  }

  const convertToDesiredUnit = (px) => (shouldUseRems ? px / 16 : px);

  modularSteps.forEach((step, i) => {
    const minFontSizePx = baseFontSize * Math.pow(typeScale, i - baseModularStepIndex);
    const minBreakpointPx = elements.minBreakpoint.value;

    const maxFontSizePx = baseFontSize * Math.pow(typeScale, i - baseModularStepIndex + 1);
    const maxBreakpointPx = elements.maxBreakpoint.value;

    const slope = (maxFontSizePx - minFontSizePx) / (maxBreakpointPx - minBreakpointPx);
    const slopeVw = round(slope * 100);
    const intercept = convertToDesiredUnit(minFontSizePx - slope * minBreakpointPx);

    const clampMin = `${round(convertToDesiredUnit(minFontSizePx))}${unit}`;
    const clampPreferredValue = `${slopeVw}vw + ${round(intercept)}${unit}`;
    const clampMax = `${round(convertToDesiredUnit(maxFontSizePx))}${unit}`;

    const customPropertyName = `--${variableNamingConvention}-${step}`;
    // eslint-disable-next-line prettier/prettier
    const customPropertyValue = `clamp(${clampMin}, ${clampPreferredValue}, ${clampMax})`;
    outputText += `${customPropertyName}: ${customPropertyValue};\n`;
  });
  elements.output.innerHTML = outputText;
};

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
