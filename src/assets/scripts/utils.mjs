import { output, preview, inputs } from './elements.mjs';

/** Rounds the given value to a fixed number of decimal places, according to the user's specified value. */
export const round = (val) => val.toFixed(inputs.rounding.value);

export const generateFluidTypeScale = () => {
  const baseFontSize = inputs.baseFontSize.value;
  const typeScale = inputs.typeScale.value;
  const modularSteps = inputs.modularSteps.value.split(',').map((step) => step.trim());
  const baseModularStep = inputs.baseModularStep.value;
  const baseModularStepIndex = modularSteps.indexOf(baseModularStep);
  const variableNamingConvention = inputs.variableName.value;
  const shouldUseRems = inputs.shouldUseRems.checked;
  const unit = shouldUseRems ? 'rem' : 'px';

  let outputText,
    previewText = ``;

  if (baseModularStepIndex === -1) {
    output.innerHTML = `Base modular step not found.`;
    return;
  }

  /** If we're using rems, converts the pixel arg to rems. Else, keeps it in pixels. */
  const convertToDesiredUnit = (px) => (shouldUseRems ? px / 16 : px);

  /** Appends the unit to a unitless value. */
  const withUnit = (unitlessValue) => `${unitlessValue}${unit}`;

  // For each modular step, generate the corresponding CSS custom property
  modularSteps.forEach((step, i) => {
    const min = {
      fontSize: baseFontSize * Math.pow(typeScale, i - baseModularStepIndex),
      breakpoint: inputs.minBreakpoint.value,
    };
    const max = {
      fontSize: baseFontSize * Math.pow(typeScale, i - baseModularStepIndex + 1),
      breakpoint: inputs.maxBreakpoint.value,
    };

    const slope = (max.fontSize - min.fontSize) / (max.breakpoint - min.breakpoint);
    const slopeVw = round(slope * 100);
    const intercept = convertToDesiredUnit(min.fontSize - slope * min.breakpoint);

    const clamp = {
      min: withUnit(round(convertToDesiredUnit(min.fontSize))),
      preferred: `${slopeVw}vw + ${withUnit(round(intercept))}`,
      max: withUnit(round(convertToDesiredUnit(max.fontSize))),
    };

    const customPropertyName = `--${variableNamingConvention}-${step}`;
    const customPropertyValue = `clamp(${clamp.min}, ${clamp.preferred}, ${clamp.max})`;

    outputText += `${customPropertyName}: ${customPropertyValue};\n`;
    previewText += `<tr>
      <td class="preview-step">${step}</td>
      <td class="preview-min numeric">${clamp.min}</td>
      <td class="preview-max numeric">${clamp.max}</td>
      <td class="preview-result" style="font-size: ${customPropertyValue}">${inputs.previewText.value}</td>
    </tr>`;
  });

  // DOM updates at the very end for performance
  output.innerHTML = outputText;
  preview.innerHTML = previewText;
};

/** Listens for changes to any of the interactive inputs. On change, saves the value in localStorage and re-generates the output. */
export const subscribeToInputChanges = () => {
  Object.values(inputs).forEach((input) => {
    input.addEventListener('input', (e) => {
      localStorage.setItem(input.id, input.type === 'checkbox' ? e.target.checked : e.target.value);
      generateFluidTypeScale();
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
