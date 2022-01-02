const environmentSpecificVariables = {
  development: {
    url: 'http://localhost:8080',
  },
  production: {
    url: 'https://www.fluid-type-scale.com',
  },
};

module.exports = {
  title: 'Fluid Type Scale Calculator',
  author: 'Aleksandr Hovhannisyan',
  email: 'aleksandrhovhannisyan@gmail.com',
  description:
    'Generate font size variables for a fluid type scale with CSS clamp. Grab the output CSS and drop it into any existing design system.',
  keywords: ['fluid type scale', 'type scale', 'CSS clamp'],
  language: 'en-US',
  favicon: {
    widths: [32, 57, 76, 96, 128, 192, 228],
    format: 'png',
  },
  ...environmentSpecificVariables[process.env.ELEVENTY_ENV],
};
