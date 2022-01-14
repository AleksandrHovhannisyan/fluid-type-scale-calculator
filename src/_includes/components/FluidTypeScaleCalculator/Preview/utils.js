// No need to use a Head lib
export const getFontLinkTag = (id) => {
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

export const onLinkLoaded = (fontFamily, previewText, setFont) => async () => {
  await document.fonts.load(`1em ${fontFamily}`, previewText);
  setFont(fontFamily);
};
