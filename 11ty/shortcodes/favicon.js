const path = require('path');
const Image = require('@11ty/eleventy-img');
const dir = require('../constants/dir');
const site = require('../../src/_data/site');

/** Returns link tags for the site's favicon. */
async function faviconShortcode(src) {
  const { dir: faviconDir } = path.parse(src);
  const faviconSrc = path.join(dir.input, src);

  const props = {
    widths: site.favicon.widths,
    formats: [site.favicon.format],
    outputDir: path.join(dir.output, faviconDir),
    urlPath: faviconDir,
  };

  const metadata = await Image(faviconSrc, props);

  return metadata[site.favicon.format]
    .map((image) => `<link rel="icon" href="${image.url}" sizes="${image.width}x${image.width}">`)
    .join('\n');
}

module.exports = faviconShortcode;
