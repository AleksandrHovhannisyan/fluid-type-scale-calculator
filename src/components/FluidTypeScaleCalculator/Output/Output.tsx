import outdent from 'outdent';
import type { TypeScale } from '../../../types';
import { indent } from '../../../utils';
import CopyToClipboardButton from '../../CopyToClipboardButton/CopyToClipboardButton';
import { useFormState } from '../FluidTypeScaleCalculator.context';
import styles from './Output.module.scss';

type Props = {
  /** The output type scale. */
  typeScale: TypeScale;
};

const Output = (props: Props) => {
  const { state } = useFormState();
  const { typeScale } = props;
  const fontSizes = Array.from(typeScale.entries());

  /** Helper to assemble a CSS custom property for a given font size step. */
  const getCustomPropertyName = (step: string) => `--${state.namingConvention}-${step}`;

  const fluidFontSizeVariables = fontSizes
    .map(([step, { min, max, preferred }]) => {
      return `${getCustomPropertyName(step)}: clamp(${min}, ${preferred}, ${max});`;
    })
    .join('\n')
    .trim();

  let code: string | undefined;

  // Include fallbacks with feature queries for browsers that don't support clamp
  if (state.shouldIncludeFallbacks) {
    const minFallbackVariables = fontSizes
      .map(([step, { min }]) => `${getCustomPropertyName(step)}: ${min};`)
      .join('\n')
      .trim();

    const maxFallbackVariables = fontSizes
      .map(([step, { max }]) => `${getCustomPropertyName(step)}: ${max};`)
      .join('\n')
      .trim();

    // Outdent to prevent the static code indentation from influencing the output string indentation
    code = outdent`
    /* Fluid font size variables, for browsers that support clamp */
    @supports (font-size: clamp(1rem, 1vw, 1rem)) {
      :root {
    ${indent(fluidFontSizeVariables, 2)}
      }
    }
    /* Fallback variables for browsers that don't support clamp */
    @supports not (font-size: clamp(1rem, 1vw, 1rem)) {
      :root {
    ${indent(minFallbackVariables, 2)}
      }
      @media screen and (min-width: ${state.max.width}px) {
        :root {
    ${indent(maxFallbackVariables, 3)}
        }
      }
    }
    `;
  } else {
    code = fluidFontSizeVariables;
  }

  return (
    <aside className={styles.output}>
      <div className={styles['output-wrapper']} role="region" tabIndex={0} aria-label="Output">
        <output className={styles['output-code']}>
          <code className={styles.code}>{code}</code>
        </output>
      </div>
      <CopyToClipboardButton text={code} />
    </aside>
  );
};

export default Output;
