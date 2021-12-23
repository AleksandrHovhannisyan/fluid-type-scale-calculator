const environmentSpecificVariables = {
  development: {
    url: 'http://localhost:8080',
  },
  production: {
    url: '',
  },
};

module.exports = {
  title: 'Fluid Modular Typography',
  author: 'Aleksandr Hovhannisyan',
  email: 'aleksandrhovhannisyan@gmail.com',
  description: 'Generate fluid typography variables that conform to a modular scale.',
  keywords: ['fluid typography', 'modular scale'],
  language: 'en-US',
  favicon: {
    widths: [32, 57, 76, 96, 128, 192, 228],
    format: 'png',
  },
  ...environmentSpecificVariables[process.env.ELEVENTY_ENV],
};
