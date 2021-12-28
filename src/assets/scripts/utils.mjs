import { code, preview, inputs } from './elements.mjs';

/** Generates a mapping from modular steps to min/max/preferred values for each step. Step order is preserved. */
export const generateFluidTypeScale = ({
  baseFontSizePx,
  breakpoints,
  typeScaleRatio,
  modularSteps,
  baseModularStep,
  shouldUseRems,
  decimalPlacesToKeep,
}) => {
  const baseModularStepIndex = modularSteps.indexOf(baseModularStep);

  /** Rounds the given value to a fixed number of decimal places, according to the user's specified value. */
  const round = (val) => val.toFixed(decimalPlacesToKeep);

  /** If we're using rems, converts the pixel arg to rems. Else, keeps it in pixels. */
  const convertToDesiredUnit = (px) => (shouldUseRems ? px / 16 : px);

  const unit = shouldUseRems ? 'rem' : 'px';
  /** Appends the unit to a unitless value. */
  const withUnit = (unitlessValue) => `${unitlessValue}${unit}`;

  // For each modular step, generate the corresponding CSS custom property
  const typeScale = modularSteps.reduce((steps, step, i) => {
    const min = {
      fontSize: baseFontSizePx * Math.pow(typeScaleRatio, i - baseModularStepIndex),
      breakpoint: breakpoints.min,
    };
    const max = {
      fontSize: baseFontSizePx * Math.pow(typeScaleRatio, i - baseModularStepIndex + 1),
      breakpoint: breakpoints.max,
    };

    const slope = (max.fontSize - min.fontSize) / (max.breakpoint - min.breakpoint);
    const slopeVw = round(slope * 100);
    const intercept = convertToDesiredUnit(min.fontSize - slope * min.breakpoint);

    steps[step] = {
      min: withUnit(round(convertToDesiredUnit(min.fontSize))),
      max: withUnit(round(convertToDesiredUnit(max.fontSize))),
      preferred: `${slopeVw}vw + ${withUnit(round(intercept))}`,
    };
    return steps;
  }, {});
  return typeScale;
};

/** Returns the modular steps currently entered, as an array of strings. */
const getModularSteps = (rawInput) => {
  return rawInput
    .split(',')
    .filter((step) => step.length)
    .map((step) => step.trim());
};

/** Helper that returns all necessary params for `generateFluidTypeScale` from UI inputs. */
export const getFluidTypeScaleParams = () => {
  const baseFontSizePx = Number(inputs.baseFontSize.value);
  const typeScaleRatio = Number(inputs.typeScale.value);
  const modularSteps = getModularSteps(inputs.modularSteps.value);
  const baseModularStep = inputs.baseModularStep.value;
  const shouldUseRems = inputs.shouldUseRems.checked;
  const decimalPlacesToKeep = Number(inputs.rounding.value);
  const breakpoints = {
    min: Number(inputs.minBreakpoint.value),
    max: Number(inputs.maxBreakpoint.value),
  };
  return {
    baseFontSizePx,
    typeScaleRatio,
    modularSteps,
    baseModularStep,
    shouldUseRems,
    decimalPlacesToKeep,
    breakpoints,
  };
};

const reset = () => {
  code.innerHTML = '';
  preview.innerHTML = '';
};

/** Updates the app UI. */
export const render = () => {
  reset();

  const typeScaleParams = getFluidTypeScaleParams();
  const typeScale = generateFluidTypeScale(typeScaleParams);
  const variableNamingConvention = inputs.variableName.value;
  let cssOutput = '',
    previewText = '';

  Object.entries(typeScale).forEach(([step, clamp]) => {
    const customPropertyName = `--${variableNamingConvention}-${step}`;
    const customPropertyValue = `clamp(${clamp.min}, ${clamp.preferred}, ${clamp.max})`;

    cssOutput += `${customPropertyName}: ${customPropertyValue};\n`;
    previewText += `<tr>
        <td class="preview-step">${step}</td>
        <td class="preview-min numeric">${clamp.min}</td>
        <td class="preview-max numeric">${clamp.max}</td>
        <td class="preview-text" style="font-size: ${customPropertyValue}">${inputs.previewText.value}</td>
      </tr>`;
  });

  // DOM updates at the very end for performance
  code.innerHTML = cssOutput;
  preview.innerHTML = previewText;
};

/** Checks and updates the validity state for the given input. Returns the validity state (`true` if valid, `false` otherwise). */
const updateValidityState = (input) => {
  const isValid = input.checkValidity();
  if (isValid) {
    input.setAttribute('aria-valid', true);
  } else {
    input.reportValidity();
    input.setAttribute('aria-valid', false);
  }
  return isValid;
};

/** Keeps the base modular step and the list of all modular steps in sync with each other and updates their validity states. */
const validateModularSteps = (baseModularStep, allSteps) => {
  const modularStepInputs = [inputs.baseModularStep, inputs.modularSteps];
  if (!allSteps.includes(baseModularStep)) {
    modularStepInputs.forEach((input) => {
      input.setAttribute('aria-valid', false);
      input.setCustomValidity('The base modular step must exist in the list of all modular steps.');
      input.reportValidity();
    });
    return false;
  } else {
    modularStepInputs.forEach((input) => {
      input.setCustomValidity('');
      input.setAttribute('aria-valid', true);
    });
    return true;
  }
};

/** Listens for changes to any of the interactive inputs. On change, re-renders the app. */
export const subscribeToInputChanges = () => {
  let isValid = true;

  // Keep min breakpoint in sync with max
  inputs.minBreakpoint.addEventListener('input', (e) => {
    const min = Number(e.target.value);
    inputs.maxBreakpoint.min = min + 1;
  });

  // Keep max breakpoint in sync with min
  inputs.maxBreakpoint.addEventListener('input', (e) => {
    const max = Number(e.target.value);
    inputs.minBreakpoint.max = max - 1;
  });

  // Manual validation for base modular steps
  inputs.modularSteps.addEventListener('input', (e) => {
    const baseStep = inputs.baseModularStep.value;
    const allSteps = getModularSteps(e.target.value);
    isValid = validateModularSteps(baseStep, allSteps);
  });
  inputs.baseModularStep.addEventListener('input', (e) => {
    const baseStep = e.target.value;
    const allSteps = getModularSteps(inputs.modularSteps.value);
    isValid = validateModularSteps(baseStep, allSteps);
  });

  // Whenever any input changes, re-render if the app is in a valid state
  Object.values(inputs).forEach((input) => {
    input.addEventListener('input', () => {
      isValid = updateValidityState(input);
      if (!isValid) return;
      render();
    });
  });
};
