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
  if (breakpoints.max <= breakpoints.min) {
    throw new Error('The max breakpoint must be greater than the min breakpoint.');
  }
  if (!modularSteps.length) {
    throw new Error('You must provide a set of modular steps');
  }

  const baseModularStepIndex = modularSteps.indexOf(baseModularStep);
  if (baseModularStepIndex === -1) {
    throw new Error('The base modular step must appear in the list of all modular steps.');
  }

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

/** Helper that returns all necessary params for `generateFluidTypeScale` from UI inputs. */
export const getFluidTypeScaleParams = () => {
  const baseFontSizePx = Number(inputs.baseFontSize.value);
  const typeScaleRatio = Number(inputs.typeScale.value);
  const modularSteps = inputs.modularSteps.value
    .split(',')
    .filter((step) => step.length)
    .map((step) => step.trim());
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

  try {
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
  } catch (e) {
    code.innerHTML = e;
  }
};

/** Listens for changes to any of the interactive inputs. On change, re-renders the app. */
export const subscribeToInputChanges = () => {
  Object.values(inputs).forEach((input) => {
    input.addEventListener('input', render);
  });
};
