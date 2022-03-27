export const getFontLinkTag = (id: string) => {
  const existingLink = document.getElementById(id);
  if (existingLink) {
    document.head.removeChild(existingLink);
  }
  const link = document.createElement('link');
  link.id = id;
  link.rel = 'stylesheet';
  return link;
};

export const onLinkLoaded = (fontFamily: string, previewText: string, setFont: (font: string) => void) => async () => {
  await document.fonts.load(`1em ${fontFamily}`, previewText);
  setFont(fontFamily);
};
