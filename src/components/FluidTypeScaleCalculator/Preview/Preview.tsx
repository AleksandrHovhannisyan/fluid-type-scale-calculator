import { ChangeEvent } from 'react';
import { useCallback } from 'react';
import clsx from 'clsx';
import Head from 'next/head';
import { DEFAULT_FONT_FAMILY, Fonts } from '../../../constants';
import { schema } from '../../../schema/schema';
import { QueryParamId } from '../../../schema/schema.types';
import type { TypeScale, WithFonts } from '../../../types';
import { getGoogleFontLinkTagHref } from '../../../utils';
import Button from '../../Button/Button';
import Fieldset from '../../Fieldset/Fieldset';
import GoogleFontsPicker from '../../GoogleFontsPicker/GoogleFontsPicker';
import Input from '../../Input/Input';
import Label from '../../Label/Label';
import RangeInput from '../../RangeInput/RangeInput';
import { initialFormState, useFormState } from '../FluidTypeScaleCalculator.context';
import styles from './Preview.module.scss';

type Props = WithFonts & {
  /** The type scale to preview. */
  typeScale: TypeScale;
};

const Preview = (props: Props) => {
  const { fonts, typeScale } = props;
  const { state, dispatch } = useFormState();
  const isDefaultFontFamily = state.preview.fontFamily === DEFAULT_FONT_FAMILY;

  const handlePreviewFontChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const fontFamily = e.target.value;
    dispatch({ type: 'setPreview', payload: { fontFamily } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePreviewTextChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const previewText = e.target.value;
    dispatch({ type: 'setPreview', payload: { text: previewText } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePreviewWidthChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const previewWidth = e.target.valueAsNumber;
    dispatch({ type: 'setPreview', payload: { width: previewWidth } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* Don't make a duplicate request for the default font since we're self-hosting that. */}
      {!isDefaultFontFamily && (
        <Head>
          <link
            rel="stylesheet"
            type="text/css"
            href={getGoogleFontLinkTagHref({ family: state.preview.fontFamily, display: 'swap' })}
          />
        </Head>
      )}
      <section className={styles.preview}>
        <h2>Preview your type scale</h2>
        <Fieldset
          title="Preview controls"
          isLegendVisuallyHidden={true}
          labelGroupClassName={styles['label-group']}
        >
          <Label title="Font family">
            <GoogleFontsPicker
              name={QueryParamId.previewFont}
              fonts={fonts}
              defaultValue={state.preview.fontFamily}
              onChange={handlePreviewFontChange}
            />
          </Label>
          <Label title="Preview text" className={clsx('label', styles['preview-text-label'])}>
            <Input
              name={QueryParamId.previewText}
              type="text"
              required={true}
              defaultValue={state.preview.text}
              delay={0}
              onChange={handlePreviewTextChange}
            />
          </Label>
          <RangeInput
            id="screen-width-range"
            name={QueryParamId.previewWidth}
            min={schema[QueryParamId.previewWidth].min}
            max={schema[QueryParamId.previewWidth].max}
            label="Screen width (pixels)"
            value={state.preview.width}
            onChange={handlePreviewWidthChange}
            required={true}
            numericInputClassName={styles['preview-width-input']}
          />
        </Fieldset>
        <noscript>
          <Button type="submit" className={styles['submit-button']}>
            Update table
          </Button>
        </noscript>
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
              {Array.from(typeScale.entries()).map(
                ([step, { min, max, getFontSizeAtScreenWidth }]) => {
                  const fontSize = getFontSizeAtScreenWidth(state.preview.width);
                  const remValue = state.shouldUseRems
                    ? state.remValueInPx
                    : initialFormState.remValueInPx;
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
                          fontFamily: isDefaultFontFamily
                            ? Fonts.BODY.style.fontFamily
                            : state.preview.fontFamily,
                        }}
                      >
                        {state.preview.text}
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default Preview;
