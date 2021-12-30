const { defineConfig } = require('vite');

export default defineConfig({
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
  css: {
    preprocessorOptions: {
      scss: {
        style: 'compressed',
      },
    },
  },
});
