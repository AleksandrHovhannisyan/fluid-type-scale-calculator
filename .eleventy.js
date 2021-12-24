const { toISOString, toAbsoluteUrl, compileAndMinifyScss } = require("./11ty/filters");
const dir = require("./11ty/constants/dir");
const imageShortcode = require("./11ty/shortcodes/image");
const faviconShortcode = require("./11ty/shortcodes/favicon");
const socialIconShortcode = require("./11ty/shortcodes/socialIcon");
const esbuild = require('esbuild');

// Template language for the site: https://www.11ty.dev/docs/languages/liquid/
const TEMPLATE_ENGINE = 'liquid';

module.exports = (eleventyConfig) => {
  // Pass-through copy
  eleventyConfig.addPassthroughCopy(`${dir.input}/assets/fonts`);

  // Watch targets
  eleventyConfig.addWatchTarget(`${dir.input}/assets/styles`);
  eleventyConfig.addWatchTarget(`${dir.input}/assets/scripts`);

  // Custom shortcodes
  eleventyConfig.addShortcode('image', imageShortcode);
  eleventyConfig.addShortcode('favicon', faviconShortcode);
  eleventyConfig.addShortcode('socialIcon', socialIconShortcode);

  // Custom filters
  eleventyConfig.addFilter('compileAndMinifyScss', compileAndMinifyScss);
  eleventyConfig.addFilter('toAbsoluteUrl', toAbsoluteUrl);
  eleventyConfig.addFilter('toIsoString', toISOString);
  eleventyConfig.addFilter('toJson', JSON.stringify);
  eleventyConfig.addFilter('fromJson', JSON.parse);
  eleventyConfig.addFilter('keys', Object.keys);
  eleventyConfig.addFilter('values', Object.values);
  eleventyConfig.addFilter('entries', Object.entries);

  // Post-processing
  eleventyConfig.on('afterBuild', () => {
    return esbuild.build({
      entryPoints: ['src/assets/scripts/index.mjs'],
      entryNames: '[dir]/[name]',
      outdir: `${dir.output}/assets/scripts`,
      format: 'esm',
      outExtension: { '.js': '.mjs' },
      bundle: true,
      minify: process.env.ELEVENTY_ENV === 'production',
      sourcemap: process.env.ELEVENTY_ENV !== 'production',
    });
  });

  return {
    dir,
    dataTemplateEngine: TEMPLATE_ENGINE,
    markdownTemplateEngine: TEMPLATE_ENGINE,
    htmlTemplateEngine: TEMPLATE_ENGINE,
    templateFormats: ['html', 'md', TEMPLATE_ENGINE],
  };
};
