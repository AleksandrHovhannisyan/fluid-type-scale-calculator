const environmentSpecificVariables = {
  development: {
    url: 'http://localhost:8080',
  },
  production: {
    url: '',
  },
};

module.exports = {
  title: 'Modular Fluid Typography',
  author: 'Aleksandr Hovhannisyan',
  email: 'aleksandrhovhannisyan@gmail.com',
  description: 'Generate fluid typography variables with a modular type scale.',
  keywords: ['fluid typography', 'modular scale', 'type scale'],
  language: 'en-US',
  favicon: {
    widths: [32, 57, 76, 96, 128, 192, 228],
    format: 'png',
  },
  ...environmentSpecificVariables[process.env.ELEVENTY_ENV],
};
