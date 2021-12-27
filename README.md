# Fluid Type Scale Generator

> Generate font size variables for a fluid type scale.

## Overview

Customize everything, grab the output CSS, and drop it into any existing design system.

![](./src/assets/images/thumbnail.png)

### Motivation

Most apps do one of two things:

1. They generate fluid typography variables, which are great for responsive sizing.
2. They generate a type scale, which defines a harmonic relationship between font size steps.

Why not do both?

### Features

- Fully customizable parameters.
- Output CSS variables for fluid font sizing.
- Live table updated with your modular steps, min and max font sizes, and preview text.
- Persistence to `localStorage`.

### Tech Stack

This project was bootstrapped with my [11ty-sass-images-seo](https://github.com/AleksandrHovhannisyan/11ty-sass-images-seo) starter and uses the following technologies:

- [11ty](https://github.com/11ty/eleventy/)
- Vanilla JavaScript
- Sass

## Running Locally

1. Clone the repo.
2. Run `yarn` to install dependencies.
3. Run `yarn serve` and visit `localhost:8080` to view the app.

## Additional Resources

- [Creating a Fluid Type Scale with CSS Clamp](https://www.aleksandrhovhannisyan.com/blog/fluid-type-scale-with-css-clamp/), a deep dive I wrote on this topic
- [Type Scale](https://type-scale.com/) by Jeremy Church
- [Modern fluid typography editor](https://modern-fluid-typography.vercel.app/) by Adrian Bece
- [Consistent, Fluidly Scaling Type and Spacing](https://css-tricks.com/consistent-fluidly-scaling-type-and-spacing/) by Andy Bell
