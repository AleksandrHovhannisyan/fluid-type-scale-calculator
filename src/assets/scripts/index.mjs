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

console.log(elements);

const toRems = (px) => px / 16;
const round = (val) => Number(val.toFixed(elements.rounding.value));

const generateTypographyVariables = () => {
  const baseFontSize = elements.baseFontSize.value;
  const typeScale = elements.typeScale.value;
  const modularSteps = elements.modularSteps.value.split(',').map((step) => step.trim());
  const baseModularStep = elements.baseModularStep.value;
  const baseModularStepIndex = modularSteps.indexOf(baseModularStep);
  const variableNamingConvention = elements.variableName.value;
  const shouldUseRems = elements.shouldUseRems.checked;
  let outputText = ``;

  if (baseModularStepIndex === -1) {
    elements.output.innerHTML = `Base modular step not found.`;
    return;
  }

  modularSteps.forEach((step, i) => {
    const minFontSizePx = baseFontSize * Math.pow(typeScale, i - baseModularStepIndex);
    const minBreakpointPx = elements.minBreakpoint.value;

    const maxFontSizePx = baseFontSize * Math.pow(typeScale, i - baseModularStepIndex + 1);
    const maxBreakpointPx = elements.maxBreakpoint.value;

    const slope = (maxFontSizePx - minFontSizePx) / (maxBreakpointPx - minBreakpointPx);
    const slopeVw = round(slope * 100);

    let intercept = minFontSizePx - slope * minBreakpointPx;
    intercept = shouldUseRems ? `${round(toRems(intercept))}rem` : `${round(intercept)}px`;

    const minFontSizeFinal = shouldUseRems ? `${round(toRems(minFontSizePx))}rem` : `${round(minFontSizePx)}px`;
    const maxFontSizeFinal = shouldUseRems ? `${round(toRems(maxFontSizePx))}rem` : `${round(maxFontSizePx)}px`;

    const customPropertyName = `--${variableNamingConvention}-${step}`;
    const customPropertyValue = `clamp(${minFontSizeFinal}, ${slopeVw}vw + ${intercept}, ${maxFontSizeFinal})`;
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
  el.addEventListener('input', (e) => {
    el.setAttribute('value', e.target.value);
    generateTypographyVariables();
  });
});

// Compute initial output
generateTypographyVariables();
