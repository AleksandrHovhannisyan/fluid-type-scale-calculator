import outdent from 'outdent';
import type { TypeScale } from '../../../types';
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

  const getFluidFontSizeVariables = (separator = '\n') =>
    fontSizes
      .map(([step, { min, max, preferred }]) => {
        return `${getCustomPropertyName(step)}: clamp(${min}, ${preferred}, ${max});`;
      })
      .join(separator);

  let code: string | undefined;

  // Include fallbacks with feature queries for browsers that don't support clamp
  if (state.shouldIncludeFallbacks) {
    code = outdent`
      /* Fluid font size variables, for browsers that support clamp */
      @supports (font-size: clamp(1rem, 1vw, 1rem)) {
        :root {
          ${getFluidFontSizeVariables('\n\t\t')}
        }
      }
      /* Fallback variables for browsers that don't support clamp */
      @supports not (font-size: clamp(1rem, 1vw, 1rem)) {
        :root {
          ${fontSizes
            .map(([step, { min }]) => {
              return `\t${getCustomPropertyName(step)}: ${min};`;
            })
            // Extra tabs are needed for proper indentation
            .join('\n\t\t')}
        }
        @media screen and (min-width: ${state.max.screenWidth}px) {
          :root {
            ${fontSizes
              .map(([step, { max }]) => {
                return `\t${getCustomPropertyName(step)}: ${max};`;
              })
              // Extra tabs are needed for proper indentation
              .join('\n\t\t\t')}
          }
        }
      }`;
  } else {
    code = getFluidFontSizeVariables();
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
