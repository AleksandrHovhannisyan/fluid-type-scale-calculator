/** Global site data reused throughout templates. */
export const site = {
  title: `Fluid Type Scale Calculator`,
  metaTitle: `Fluid Type Scale - Generate responsive font-size variables`,
  description: `Generate font size variables for a fluid type scale with CSS clamp. Grab the output CSS and drop it into any existing design system.`,
  author: `Aleksandr Hovhannisyan`,
  keywords: ['fluid type scale', 'type scale', 'CSS clamp'],
  url: `https://www.fluid-type-scale.com`,
} as const;

/** Social media profiles and links. */
export const socials = {
  linkedin: {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/aleksandr-hovhannisyan-ba154b120/',
  },
  github: {
    name: 'GitHub',
    url: 'https://github.com/AleksandrHovhannisyan',
  },
  twitter: {
    name: 'Twitter',
    handle: '@hovhaDovah',
    url: 'https://twitter.com/hovhaDovah',
  },
  stackexchange: {
    name: 'Stack Exchange',
    url: 'https://stackexchange.com/users/6935154/aleksandrh',
  },
  buymeacoffee: {
    name: 'Buy Me a Coffee',
    url: 'https://www.buymeacoffee.com/ahovhannisyan',
  },
} as const;
