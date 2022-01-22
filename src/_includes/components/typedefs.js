/**
 * @typedef ClampDeclaration
 * @property {string} min The minimum value for CSS `clamp`
 * @property {string} preferred The preferred value for CSS `clamp`
 * @property {string} max The maximum value for CSS `clamp`
 */

/**
 * @callback GetFontSizeCallback
 * @param {number} width The target screen width
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
 * @property {number} fontSize The font size at this particular breakpoint
 * @property {number} screenWidth The viewport width
 * @property {number} modularRatio The type scale ratio at this breakpoint
 */

/**
 * @typedef AppState
 * @property {BreakpointConfig} min The minimum (mobile) config
 * @property {BreakpointConfig} max The maximum (desktop) config
 * @property {string[]} modularSteps A list of modular step names
 * @property {string} baseModularStep The name of the base modular step in the type scale
 * @property {string} namingConvention A string to prefix to each CSS custom property in the output
 * @property {boolean} shouldUseRems Whether to use rems for font sizing in the output
 */

/**
 * @typedef AppAction
 * @property {string} type An identifier for the type of action being dispatched
 * @property {*} payload The payload used to update the state
 */

/**
 * @typedef {React.Dispatch<AppAction>} AppDispatcher
 */

export {};
