const link = (content, href) => {
  const isExternalLink = /https?:\/\//.test(href);
  const attributes = isExternalLink ? ` rel="noreferrer noopener" target="_blank"` : '';
  return `<a href="${href}"${attributes}>${content}</a>`;
};

module.exports = link;
