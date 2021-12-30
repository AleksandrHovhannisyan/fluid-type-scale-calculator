const { toISOString, toAbsoluteUrl, compileAndMinifyScss } = require("./11ty/filters");
const dir = require("./11ty/constants/dir");
const socialIconShortcode = require("./11ty/shortcodes/socialIcon");

// Template language for the site: https://www.11ty.dev/docs/languages/liquid/
const TEMPLATE_ENGINE = 'liquid';

module.exports = (eleventyConfig) => {
  // Pass-through copy
  eleventyConfig.addPassthroughCopy(`public`);

  // Custom shortcodes
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

  return {
    dir,
    dataTemplateEngine: TEMPLATE_ENGINE,
    markdownTemplateEngine: TEMPLATE_ENGINE,
    htmlTemplateEngine: TEMPLATE_ENGINE,
    templateFormats: ['html', 'md', TEMPLATE_ENGINE],
  };
};
