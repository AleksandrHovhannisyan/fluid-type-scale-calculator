const Cache = require('@11ty/eleventy-cache-assets');

const googleFonts = async () => {
  try {
    const fonts = await Cache(
      `https://www.googleapis.com/webfonts/v1/webfonts?sort=alpha&key=${process.env.GOOGLE_FONTS_API_KEY}`,
      {
        duration: '1d',
        type: 'json',
      }
    );
    return fonts.items.map((font) => font.family);
  } catch (e) {
    return ['Inter'];
  }
};

module.exports = googleFonts;
