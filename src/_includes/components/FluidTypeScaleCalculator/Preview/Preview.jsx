import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { initialState } from '../../constants';
import GoogleFontsPicker from '../../GoogleFontsPicker/GoogleFontsPicker';
import Input from '../../Input/Input';
import Label from '../../Label/Label';
import RangeInput from '../../RangeInput/RangeInput';
import { defaultFonts } from './Preview.constants';
import { getGoogleFontLinkHref } from './Preview.utils';
import styles from './Preview.module.scss';

/**
 * @typedef PreviewProps
 * @property {import('../typedefs').TypeScale} typeScale The type scale to preview
 * @property {string[]} fonts All font families
 */

/** @param {PreviewProps} props */
const Preview = (props) => {
  const { fonts, typeScale } = props;
  const [previewText, setPreviewText] = useState('Almost before we knew it, we had left the ground');
  const [previewFont, setPreviewFont] = useState(defaultFonts[0]);
  const [screenWidth, setScreenWidth] = useState(initialState.max.screenWidth);

  useEffect(() => {
    // Since Slinkity uses SSR, this must be done on mount
    setScreenWidth(window.innerWidth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={styles.preview}>
      {!defaultFonts.includes(previewFont) && (
        <link rel="stylesheet" type="text/css" href={getGoogleFontLinkHref(previewFont)} />
      )}
      <h2>Preview your type scale</h2>
      <div id="preview-inputs" className={styles['label-group']}>
        <Label title="Font family">
          <GoogleFontsPicker
            fonts={fonts}
            defaultValue={previewFont}
            onChange={(e) => setPreviewFont(e.target.value)}
          />
        </Label>
        <Label title="Preview text" className={clsx('label', styles['preview-text-label'])}>
          <Input
            type="text"
            required
            defaultValue={previewText}
            delay={0}
            onChange={(e) => setPreviewText(e.target.value)}
          />
        </Label>
        <RangeInput
          id="screen-width-range"
          label="Screen width (pixels)"
          defaultValue={screenWidth}
          onChange={(e) => setScreenWidth(Number(e.target.value))}
          min={0}
          // TODO: better pattern?
          max={1920}
        />
      </div>
      <div className="table-wrapper">
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
              return (
                <tr key={step}>
                  <td>{step}</td>
                  <td className="numeric">{min}</td>
                  <td className="numeric">{max}</td>
                  <td className="numeric">{getFontSizeAtScreenWidth(screenWidth)}</td>
                  <td className="nowrap" style={{ fontSize, fontFamily: previewFont }}>
                    {previewText}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Preview;
