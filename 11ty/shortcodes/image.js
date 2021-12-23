const path = require('path');
const Image = require('@11ty/eleventy-img');
const dir = require('../constants/dir');

/** Returns optimized image markup. Expects to receive a source-relative image path (e.g., /assets/images/image.png).
 * Example usage: `{% image '/assets/images/image.png', 'Alt text' %}`.
 */
async function imageShortcode(src, alt = '', widths = [300, 600], formats = ['avif', 'jpeg'], sizes = '100vw') {
  const { dir: imgDir } = path.parse(src);
  const fullyQualifiedSrc = path.join(dir.input, src);

  const metadata = await Image(fullyQualifiedSrc, {
    widths,
    formats,
    outputDir: path.join(dir.output, imgDir),
    urlPath: imgDir,
  });

  const imageAttributes = {
    alt,
    sizes,
    loading: 'lazy',
    decoding: 'async',
  };

  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = imageShortcode;
