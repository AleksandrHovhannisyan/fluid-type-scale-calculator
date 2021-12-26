import { output, preview, inputs } from './elements.mjs';

/** Rounds the given value to a fixed number of decimal places, according to the user's specified value. */
export const round = (val) => val.toFixed(inputs.rounding.value);

export const generateOutput = () => {
  preview.innerHTML = '';

  const baseFontSize = inputs.baseFontSize.value;
  const typeScale = inputs.typeScale.value;
  const modularSteps = inputs.modularSteps.value.split(',').map((step) => step.trim());
  const baseModularStep = inputs.baseModularStep.value;
  const baseModularStepIndex = modularSteps.indexOf(baseModularStep);
  const variableNamingConvention = inputs.variableName.value;
  const shouldUseRems = inputs.shouldUseRems.checked;
  const unit = shouldUseRems ? 'rem' : 'px';
  let outputText = ``;

  if (baseModularStepIndex === -1) {
    output.innerHTML = `Base modular step not found.`;
    return;
  }

  const convertToDesiredUnit = (px) => (shouldUseRems ? px / 16 : px);

  modularSteps.forEach((step, i) => {
    const minFontSizePx = baseFontSize * Math.pow(typeScale, i - baseModularStepIndex);
    const minBreakpointPx = inputs.minBreakpoint.value;

    const maxFontSizePx = baseFontSize * Math.pow(typeScale, i - baseModularStepIndex + 1);
    const maxBreakpointPx = inputs.maxBreakpoint.value;

    const slope = (maxFontSizePx - minFontSizePx) / (maxBreakpointPx - minBreakpointPx);
    const slopeVw = round(slope * 100);
    const intercept = convertToDesiredUnit(minFontSizePx - slope * minBreakpointPx);

    const clampMin = `${round(convertToDesiredUnit(minFontSizePx))}${unit}`;
    const clampPreferredValue = `${slopeVw}vw + ${round(intercept)}${unit}`;
    const clampMax = `${round(convertToDesiredUnit(maxFontSizePx))}${unit}`;

    const customPropertyName = `--${variableNamingConvention}-${step}`;
    const customPropertyValue = `clamp(${clampMin}, ${clampPreferredValue}, ${clampMax})`;

    outputText += `${customPropertyName}: ${customPropertyValue};\n`;
    preview.innerHTML += `<tr>
      <td class="preview-step">${step}</td>
      <td class="preview-min numeric">${clampMin}</td>
      <td class="preview-max numeric">${clampMax}</td>
      <td class="preview-result" style="font-size: ${customPropertyValue}">${inputs.previewText.value}</td>
    </tr>`;
  });
  output.innerHTML = outputText;
};

/** Listens for changes to any of the interactive inputs. On change, saves the value in localStorage and re-generates the output. */
export const subscribeToInputChanges = () => {
  Object.values(inputs).forEach((input) => {
    input.addEventListener('input', (e) => {
      localStorage.setItem(input.id, input.type === 'checkbox' ? e.target.checked : e.target.value);
      generateOutput();
    });
  });
};

/** Loads the user's previously saved values from localStorage. */
export const loadValuesFromLocalStorage = () => {
  Object.values(inputs).forEach((input) => {
    const savedValue = localStorage.getItem(input.id);
    if (!savedValue) return;
    switch (input.nodeName) {
      case 'TEXTAREA':
        input.setAttribute('value', savedValue);
        break;
      case 'INPUT': {
        if (input.type === 'checkbox') {
          if (savedValue === 'true') {
            input.setAttribute('checked', true);
          } else {
            input.removeAttribute('checked');
          }
        } else {
          input.setAttribute('value', savedValue);
        }
        break;
      }
      case 'SELECT': {
        const options = Array.from(input.querySelectorAll('option'));
        options.forEach((option) => {
          if (option.hasAttribute('selected') && option.value !== savedValue) {
            option.removeAttribute('selected');
          }
          if (option.value === savedValue) {
            option.setAttribute('selected', true);
          }
        });
        break;
      }
      default:
        break;
    }
  });
};
