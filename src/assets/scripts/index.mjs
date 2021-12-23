const input = {
  baseFontSize: document.querySelector('#input-base-font-size'),
  typeScale: document.querySelector('#select-type-scale'),
  modularSteps: document.querySelector('#input-modular-steps'),
  baseModularStep: document.querySelector('#input-base-modular-step'),
  variableName: document.querySelector('#input-variable-name'),
  mobileBreakpoint: document.querySelector('#input-mobile-breakpoint'),
  shouldUseRems: document.querySelector('#input-use-rems'),
  rounding: document.querySelector('#input-rounding'),
};
const output = document.querySelector('#output');

const toRems = (px) => px / 16;
const round = (val) => Number(val.toFixed(input.rounding.value));

const generateTypographyVariables = () => {
  const baseFontSize = input.baseFontSize.value;
  const typeScale = input.typeScale.value;
  const modularSteps = input.modularSteps.value.split(',').map((step) => step.trim());
  const baseModularStep = input.baseModularStep.value;
  const baseModularStepIndex = modularSteps.indexOf(baseModularStep);
  const variableNamingConvention = input.variableName.value;
  const mobileBreakpoint = input.mobileBreakpoint.value;
  const shouldUseRems = input.shouldUseRems.checked;
  let outputText = ``;

  if (baseModularStepIndex === -1) {
    output.innerHTML = `Base modular step not found.`;
    return;
  }

  modularSteps.forEach((step, i) => {
    const min = baseFontSize * Math.pow(typeScale, i - baseModularStepIndex);
    const max = baseFontSize * Math.pow(typeScale, i - baseModularStepIndex + 1);
    const preferredValue = round((min / mobileBreakpoint) * 100);

    const minFinal = shouldUseRems ? `${round(toRems(min))}rem` : `${round(min)}px`;
    const maxFinal = shouldUseRems ? `${round(toRems(max))}rem` : `${round(max)}px`;

    const customPropertyName = `--${variableNamingConvention}-${step}`;
    const customPropertyValue = `clamp(${minFinal}, ${preferredValue}vw, ${maxFinal})`;
    outputText += `${customPropertyName}: ${customPropertyValue};\n`;
  });
  output.innerHTML = outputText;
};

// Copy to clipboard functionality for keyboard users
const copyToClipboardButton = document.querySelector('#copy-to-clipboard');
copyToClipboardButton.addEventListener('click', () => {
  window.navigator.clipboard.writeText(output.textContent);
  copyToClipboardButton.dataset.copied = true;
  setTimeout(() => {
    copyToClipboardButton.dataset.copied = false;
  }, 1000);
});

// Whenever any input value changes, recompute the output
Object.values(input).forEach((el) => {
  el.addEventListener('input', (e) => {
    el.setAttribute('value', e.target.value);
    generateTypographyVariables();
  });
});

// Compute initial output
generateTypographyVariables();
