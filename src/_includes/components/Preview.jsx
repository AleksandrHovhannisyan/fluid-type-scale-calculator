import { useEffect, useState } from 'react';
import Input from './Input';
import RangeInput from './RangeInput';

// No need to use a Head lib
const getFontLinkTag = (id) => {
  const existingLink = document.getElementById(id);
  if (existingLink) {
    document.head.removeChild(existingLink);
  }
  const link = document.createElement('link');
  link.removeEventListener('load', onLinkLoaded);
  link.id = id;
  link.rel = 'stylesheet';
  return link;
};

const onLinkLoaded = (fontFamily, previewText, setFont) => async () => {
  await document.fonts.load(`1em ${fontFamily}`, previewText);
  setFont(fontFamily);
};

const Preview = ({ baseSizes, typeScale, fonts }) => {
  const [previewText, setPreviewText] = useState('Almost before we knew it, we had left the ground');
  const [previewFont, setPreviewFont] = useState('Inter');
  const [screenWidth, setScreenWidth] = useState(baseSizes.max.screenWidth);

  // Since Slinkity uses SSR
  useEffect(() => {
    setScreenWidth(window.innerWidth);
  }, []);

  const onFontSelected = async (fontFamily) => {
    const link = getFontLinkTag('user-selected-font');
    document.head.appendChild(link);
    link.addEventListener('load', onLinkLoaded(fontFamily, previewText, setPreviewFont));
    link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(/ /g, '+')}&display=swap`;
  };

  return (
    <div id="preview" className="flow">
      <h2>Preview your type scale</h2>
      <div className="preview-label-group">
        <RangeInput
          id="screen-width-range"
          label="Screen width (pixels)"
          value={screenWidth}
          onChange={(e) => setScreenWidth(Number(e.target.value))}
          min={0}
          // TODO: better pattern?
          max={1920}
        />
        <label className="label">
          <span className="label-title">Font family</span>
          <select defaultValue={previewFont} onChange={(e) => onFontSelected(e.target.value)}>
            {fonts.map((fontFamily) => (
              <option key={fontFamily} value={fontFamily}>
                {fontFamily}
              </option>
            ))}
          </select>
        </label>
        <label className="label preview-text-input">
          <span className="label-title">Preview text</span>
          <Input type="text" required defaultValue={previewText} onChange={(e) => setPreviewText(e.target.value)} />
        </label>
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
              <th scope="col" className="preview-text">
                Preview
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(typeScale).map(([step, { min, max, getFontSizeAtScreenWidth }]) => {
              const fontSize = getFontSizeAtScreenWidth(screenWidth);
              return (
                <tr key={step}>
                  <td>{step}</td>
                  <td className="numeric">{min}</td>
                  <td className="numeric">{max}</td>
                  <td className="numeric">{getFontSizeAtScreenWidth(screenWidth)}</td>
                  <td className="preview-text nowrap" style={{ fontSize, fontFamily: previewFont }}>
                    {previewText}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Preview;
