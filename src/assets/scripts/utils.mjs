import elements from './elements.mjs';

export const round = (val) => Number(val.toFixed(elements.rounding.value));

export const generateTypographyVariables = () => {
  const previewBody = document.querySelector('#preview tbody');
  previewBody.innerHTML = '';

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
    const customPropertyValue = `clamp(${clampMin}, ${clampPreferredValue}, ${clampMax})`;

    outputText += `${customPropertyName}: ${customPropertyValue};\n`;
    previewBody.innerHTML += `<tr>
      <td class="preview-step">${step}</td>
      <td class="preview-result"style="font-size: ${customPropertyValue}">${elements.previewText.value}.</td>
    </tr>`;
  });
  elements.output.innerHTML = outputText;
};
