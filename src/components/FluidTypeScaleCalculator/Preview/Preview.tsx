import type { ChangeEvent } from 'react';
import { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import { initialFormState } from '../../../constants';
import type { TypeScale, WithFonts } from '../../../types';
import GoogleFontsPicker from '../../GoogleFontsPicker/GoogleFontsPicker';
import Input from '../../Input/Input';
import Label from '../../Label/Label';
import RangeInput from '../../RangeInput/RangeInput';
import { useFormState } from '../FluidTypeScaleCalculator.context';
import { GOOGLE_FONT_LINK_TAG_ID, MAX_ALLOWED_SCREEN_WIDTH_PX } from './Preview.constants';
import { getFontLinkTag } from './utils';
import styles from './Preview.module.scss';

type Props = WithFonts & {
  /** The type scale to preview. */
  typeScale: TypeScale;
};

const Preview = (props: Props) => {
  const { fonts, typeScale } = props;
  const { state, dispatch } = useFormState();
  const [previewText, setPreviewText] = useState('Almost before we knew it, we had left the ground');
  const [screenWidth, setScreenWidth] = useState(initialFormState.max.screenWidth);

  useEffect(() => {
    // Since we use SSR, this must be done on mount
    setScreenWidth(window.innerWidth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFontSelected = useCallback(
    async (e: ChangeEvent<HTMLSelectElement>) => {
      const fontFamily = e.target.value;
      const link = getFontLinkTag(GOOGLE_FONT_LINK_TAG_ID);
      document.head.appendChild(link);
      // TODO: potential memory leak, figure out how to remove event listener without confusing HOC logic
      link.addEventListener('load', async () => {
        await document.fonts.load(`1em ${fontFamily}`, previewText);
        dispatch({ type: 'setFontFamily', payload: fontFamily });
      });
      // Must set href after registering the listener
      link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(/ /g, '+')}&display=swap`;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [previewText]
  );

  return (
    <section className={styles.preview}>
      <h2>Preview your type scale</h2>
      <div id="preview-inputs" className={styles['label-group']}>
        <Label title="Font family">
          <GoogleFontsPicker fonts={fonts} defaultValue={state.fontFamily} onChange={onFontSelected} />
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
          max={MAX_ALLOWED_SCREEN_WIDTH_PX}
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
                  <td className="nowrap" style={{ fontSize, fontFamily: state.fontFamily }}>
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
