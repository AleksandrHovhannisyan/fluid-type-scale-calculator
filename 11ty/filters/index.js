const dayjs = require('dayjs');
const { default: slugify } = require('slugify');
const site = require('../../src/_data/site');

/** Converts the given string to a slug form. */
const slugifyString = (str) => {
  return slugify(str, {
    replacement: '-',
    remove: /[#,&,+()$~%.'":*?<>{}]/g,
    lower: true,
  });
};

/** Formats the given string as an absolute url. */
const toAbsoluteUrl = (url) => {
  // Replace trailing slash, e.g., site.com/ => site.com
  const siteUrl = site.url.replace(/\/$/, '');
  // Replace starting slash, e.g., /path/ => path/
  const relativeUrl = url.replace(/^\//, '');

  return `${siteUrl}/${relativeUrl}`;
};

/** Converts the given date string to ISO8610 format. */
const toISOString = (dateString) => dayjs(dateString).toISOString();

module.exports = {
  slugifyString,
  toAbsoluteUrl,
  toISOString,
};
