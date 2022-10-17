import { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { DEFAULT_FONT_FAMILY } from '../../../constants';
import type { TypeScale, WithFonts } from '../../../types';
import { getGoogleFontLinkTagHref } from '../../../utils';
import Fieldset from '../../Fieldset/Fieldset';
import GoogleFontsPicker from '../../GoogleFontsPicker/GoogleFontsPicker';
import Input from '../../Input/Input';
import Label from '../../Label/Label';
import RangeInput from '../../RangeInput/RangeInput';
import { initialFormState, useFormState } from '../FluidTypeScaleCalculator.context';
import { MAX_ALLOWED_SCREEN_WIDTH_PX } from './Preview.constants';
import styles from './Preview.module.scss';

type Props = WithFonts & {
  /** The type scale to preview. */
  typeScale: TypeScale;
};

const Preview = (props: Props) => {
  const { fonts, typeScale } = props;
  const { state, dispatch } = useFormState();
  const [arePreviewControlsDisabled, setArePreviewControlsDisabled] = useState(true);
  const [previewText, setPreviewText] = useState('Almost before we knew it, we had left the ground');
  const [screenWidth, setScreenWidth] = useState(initialFormState.max.screenWidth);

  useEffect(() => {
    // Since we use SSR, this must be done on mount
    setScreenWidth(window.innerWidth);
    // If JS is enabled, enable the preview controls; else, keep them disabled (since this won't run)
    setArePreviewControlsDisabled(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFontSelected = (e: ChangeEvent<HTMLSelectElement>) => {
    const fontFamily = e.target.value;
    dispatch({ type: 'setFontFamily', payload: fontFamily });
  };

  return (
    <>
      {/* Don't make a duplicate request for the default font since we're self-hosting that. */}
      {state.fontFamily !== DEFAULT_FONT_FAMILY && (
        // Don't render in Head to bypass Next.js font optimization (which breaks in a no-JS environment)
        <link
          rel="stylesheet"
          type="text/css"
          href={getGoogleFontLinkTagHref({ family: state.fontFamily, display: 'swap' })}
        />
      )}
      <section className={styles.preview}>
        <h2>Preview your type scale</h2>
        <Fieldset
          title="Preview controls"
          isLegendVisuallyHidden={true}
          disabled={arePreviewControlsDisabled}
          labelGroupClassName={styles['label-group']}
        >
          <Label title="Font family">
            <GoogleFontsPicker fonts={fonts} defaultValue={state.fontFamily} onChange={onFontSelected} />
          </Label>
          <Label title="Preview text" className={clsx('label', styles['preview-text-label'])}>
            <Input
              type="text"
              required={true}
              defaultValue={previewText}
              delay={0}
              onChange={(e) => setPreviewText(e.target.value)}
            />
          </Label>
          <RangeInput
            id="screen-width-range"
            label="Screen width (pixels)"
            defaultValue={screenWidth}
            onChange={(e) => setScreenWidth(e.target.valueAsNumber)}
            min={0}
            max={MAX_ALLOWED_SCREEN_WIDTH_PX}
            required={true}
            numericInputClassName={styles['preview-width-input']}
          />
        </Fieldset>
        <div className="table-wrapper" tabIndex={0} role="region" aria-label="Size previews">
          <table>
            <thead>
              <tr>
                <th scope="col">Step</th>
                <th scope="col" className="numeric nowrap">
                  Min
                </th>
                <th scope="col" className="numeric nowrap">
                  Max
                </th>
                <th scope="col" className="numeric nowrap">
                  Rendered
                </th>
                <th scope="col" className={clsx(styles['preview-text'], 'nowrap')}>
                  Preview
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.from(typeScale.entries()).map(([step, { min, max, getFontSizeAtScreenWidth }]) => {
                const fontSize = getFontSizeAtScreenWidth(screenWidth);
                const remValue = state.shouldUseRems ? state.remValueInPx : initialFormState.remValueInPx;
                return (
                  <tr key={step}>
                    <td>{step}</td>
                    <td className="numeric">{min}</td>
                    <td className="numeric">{max}</td>
                    <td className="numeric">{fontSize}</td>
                    <td
                      className="nowrap"
                      style={{
                        fontSize: `calc(${fontSize} * ${remValue}/${initialFormState.remValueInPx})`,
                        fontFamily: state.fontFamily,
                      }}
                    >
                      {previewText}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default Preview;
