import { useState } from 'react';
import Input from './Input';

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

const Preview = ({ typeScale, fonts }) => {
  const [previewText, setPreviewText] = useState('Almost before we knew it, we had left the ground');
  const [previewFont, setPreviewFont] = useState('Inter');

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
        <label className="label">
          <span className="label-title">Preview font</span>
          <select defaultValue={previewFont} onChange={(e) => onFontSelected(e.target.value)}>
            {fonts.map((fontFamily) => (
              <option key={fontFamily} value={fontFamily}>
                {fontFamily}
              </option>
            ))}
          </select>
        </label>
        <label className="label">
          <span className="label-title">Preview text</span>
          <Input type="text" required defaultValue={previewText} onChange={(e) => setPreviewText(e.target.value)} />
        </label>
      </div>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th scope="col">Step</th>
              <th scope="col" className="numeric">
                Min
              </th>
              <th scope="col" className="numeric">
                Max
              </th>
              <th scope="col" className="preview-text">
                Preview
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(typeScale).map(([step, { min, max, preferred }]) => {
              const fontSize = `clamp(${min}, ${preferred}, ${max})`;
              return (
                <tr key={step}>
                  <td className="preview-step">{step}</td>
                  <td className="preview-min numeric">{min}</td>
                  <td className="preview-max numeric">{max}</td>
                  <td className="preview-text" style={{ fontSize, fontFamily: previewFont }}>
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
