import { output, preview, inputs } from './elements.mjs';

/** Rounds the given value to a fixed number of decimal places, according to the user's specified value. */
export const round = (val) => Number(val.toFixed(inputs.rounding.value));

export const generateTypographyVariables = () => {
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
      <td class="preview-result"style="font-size: ${customPropertyValue}">${inputs.previewText.value}.</td>
    </tr>`;
  });
  output.innerHTML = outputText;
};
