import { useEffect, useRef, useState } from 'react';
import { Delay } from '../constants';
import Select from '../Select/Select';

/**
 * @typedef GoogleFontsPickerProps
 * @property {string[]} fonts An array of all font families to display
 */

/**
 * @param {GoogleFontsPickerProps & React.HTMLProps<HTMLSelectElement>} props
 */
const GoogleFontsPicker = (props) => {
  const { defaultValue, fonts: allFonts, onChange } = props;
  const [fonts, setFonts] = useState([defaultValue]);
  const pickerRef = useRef(null);

  /* Set fonts from static props (async 11ty data) on intersection, for several reasons:
    1. Scalability: Don't want to fetch Google Fonts on mount because that would require using serverless functions. Without a cache, assuming decent traffic, this would quickly blow the Netlify limit.
    2. SEO: Don't want the initially server-side rendered HTML to return ~1k font family names, or this will start matching really absurd and irrelevant search queries (already seeing this in Google Search Console).
    3. Performance: This sends less HTML over the wire initially and on mount. */
  useEffect(() => {
    if (!pickerRef.current) return;
    const intersectionObserver = new IntersectionObserver(
      (entries, self) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setFonts(allFonts);
            self.unobserve(entry.target);
          }
        });
      },
      { rootMargin: `400px 0px 400px 0px` }
    );
    intersectionObserver.observe(pickerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Select ref={pickerRef} defaultValue={defaultValue} onChange={onChange} delay={Delay.LONG}>
      {fonts.map((fontFamily) => (
        <option key={fontFamily} value={fontFamily}>
          {fontFamily}
        </option>
      ))}
    </Select>
  );
};

export default GoogleFontsPicker;
