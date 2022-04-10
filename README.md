# Fluid Type Scale Calculator

> Generate font size variables for a fluid type scale with CSS clamp.

## Overview

Customize everything, grab the output CSS, and drop it into any existing design system. Share the URL with your team members or drop it into your CSS as an inline comment for docs.

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
- URL sharing.

### API: URL Sharing

The `/calculate` route accepts the following query parameters and types. All parameters are optional. If a parameter is not specified, it will fall back to the default for that value (this applies to all parameters except `useRems`; see table below). If a parameter is invalid, you will be shown an appropriate error message.

| Param         | Description                                                                                | Type     | Constraints                                                                                                               | Default                     |
| ------------- | ------------------------------------------------------------------------------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `minFontSize` | The minimum font size for the base step                                                    | `number` | Non-negative                                                                                                              | `16`                        |
| `minWidth`    | The screen width corresponding to the minimum font size                                    | `number` | Non-negative and `< maxScreenWidth`                                                                                       | `400`                       |
| `minRatio`    | The type scale ratio for the minimum font size of each step                                | `number` | Non-negative                                                                                                              | `1.25`                      |
| `maxFontSize` | The maximum font size for the base step                                                    | `number` | Non-negative                                                                                                              | `19`                        |
| `maxWidth`    | The screen width corresponding to the maximum font size                                    | `number` | Non-negative and `> minScreenWidth`                                                                                       | `1280`                      |
| `maxRatio`    | The type scale ratio for the maximum font size of each step                                | `number` | Non-negative                                                                                                              | `1.333`                     |
| `steps`       | A comma-separated list of names for your type scale steps, in ascending order of font size | `string` | Comma-separated list. Step names must be alphanumeric, with no spaces.                                                    | `sm,base,md,lg,xl,xxl,xxxl` |
| `base`        | The name of the base step                                                                  | `string` | Must exist in `steps`                                                                                                     | `base`                      |
| `prefix`      | The naming convention to use for the output CSS variables                                  | `string` | Non-empty                                                                                                                 | `font-size`                 |
| `useRems`     | Whether to use rems for font sizing.                                                       | `on`     | If specified, must be `on`. Omitting it implies that pixels will be used.                                                 | `on`                        |
| `decimals`    | The number of decimal places to round the output to.                                       | `number` | Non-negative integer                                                                                                      | `2`                         |
| `font`        | The font family to render in the preview.                                                  | `string` | Spaces must be escaped (e.g., `Libre+Baskerville`). The font must be a valid Google Font. Custom fonts are not supported. | `Inter`                     |

Example URL: https://www.fluid-type-scale.com/calculate?minFontSize=15&minWidth=400&minRatio=1.25&maxFontSize=17&maxWidth=1280&maxRatio=1.333&steps=sm%2Cbase%2Cmd%2Clg%2Cxl%2Cxxl%2Cxxxl&base=base&prefix=font-size&decimals=2&useRems=on&font=Libre+Baskerville

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
