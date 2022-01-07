/**
 * @typedef ClampDeclaration
 * @property {string} min - the minimum value for CSS `clamp`
 * @property {string} preferred - the preferred value for CSS `clamp`
 * @property {string} max - the maximum value for CSS `clamp`
 */

/**
 * @callback GetFontSizeCallback
 * @param {number} width - the target screen width
 * @returns {string} a CSS font size value for this particular screen width
 */

/**
 * @typedef {ClampDeclaration} TypeScaleEntry
 * @property {GetFontSizeCallback} getFontSizeAtScreenWidth
 */

/**
 * @typedef {Map<string, TypeScaleEntry>} TypeScale
 */

/**
 * @typedef BreakpointConfig
 * @property {number} fontSize - the font size at this particular breakpoint
 * @property {number} screenWidth - the viewport width
 * @property {number} modularRatio - the type scale ratio at this breakpoint
 */

/**
 * @typedef AppState
 * @property {BreakpointConfig} min - the minimum (mobile) config
 * @property {BreakpointConfig} max - the maximum (desktop) config
 * @property {string[]} modularSteps - a list of modular step names
 * @property {string} baseModularStep - the name of the base modular step in the type scale
 * @property {string} namingConvention - a string to prefix to each CSS custom property in the output
 * @property {boolean} shouldUseRems - whether to use rems for font sizing in the output
 */

/**
 * @typedef AppAction
 * @property {string} type - an identifier for the type of action being dispatched
 * @property {*} payload - the payload used to update the state
 */

/**
 * @typedef {React.Dispatch<AppAction>} AppDispatcher
 */

export {};
