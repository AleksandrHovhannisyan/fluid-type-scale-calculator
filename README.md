# Fluid Type Scale Calculator

> Generate font size variables for a fluid type scale with CSS clamp.

## Overview

Customize everything, grab the output CSS, and drop it into any existing design system.

![](./public/assets/images/thumbnail.png)

### Features

- Fully customizable parameters for everything:
  - Baseline min font size, screen width, type scale
  - Baseline max font size, screen width, type scale
  - All of your modular steps
  - Custom naming convention for CSS variables
  - Rounding behavior
  - Whether to show output in rems or pixels
- Output CSS variables for fluid font sizing.
- Live preview table. Pick a font and enter some sample text to fine-tune the results.

### Tech Stack

Fluid Type Scale Calculator runs on [Next.js](https://nextjs.org/).

- React
- TypeScript
- Sass + CSS Modules

### Running Locally

1. Clone the repo.
2. Run `yarn` to install dependencies.
3. Run `yarn dev` and visit `localhost:8080` to view the app.

## Similar Tools

- [Utopia.fyi fluid type scale calculator](https://utopia.fyi/type/calculator/) by James Gilyead and Trys Mudford
- [Type Scale](https://type-scale.com/) by Jeremy Church
- [Modern fluid typography editor](https://modern-fluid-typography.vercel.app/) by Adrian Bece
- [Fluid Typography](https://fluid-typography.netlify.app/) by Erik André Jakobsen
- [fluidtypography.com](https://fluidtypography.com/) by Kip Hughes

## Learn More

- [Creating a Fluid Type Scale with CSS Clamp](https://www.aleksandrhovhannisyan.com/blog/fluid-type-scale-with-css-clamp/), a deep dive I wrote on this topic. The technique covered in the article is the basis for this app.
- [Generating `font-size` CSS Rules and Creating a Fluid Type Scale](https://moderncss.dev/generating-font-size-css-rules-and-creating-a-fluid-type-scale/) by Stephanie Eckles
- [Consistent, Fluidly Scaling Type and Spacing](https://css-tricks.com/consistent-fluidly-scaling-type-and-spacing/) by Andy Bell
