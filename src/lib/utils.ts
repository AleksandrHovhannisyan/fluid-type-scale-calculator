import { GOOGLE_FONTS_BASE_URL } from './constants';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<Callback extends (...args: any[]) => unknown>(
	callback: Callback,
	delayMs: number
) {
	let timeoutId: number;
	return (...args: unknown[]) => {
		clearTimeout(timeoutId);
		// @ts-expect-error idk why it's typing this as NodeJs.Timeout
		timeoutId = setTimeout(() => callback(...args), delayMs);
	};
}

/** Returns a value clamped between a min and a max value, inclusive. */
export const clamp = ({
	value,
	min,
	max
}: {
	/** The value to clamp. */
	value: number;
	/** The minimum (inclusive) allowed value. */
	min: number;
	/** The maximum (inclusive) allowed value. */
	max: number;
}) => Math.max(Math.min(value, max), min);

/** Prefixes the given relative url string with the base site URL. */
export const toAbsoluteUrl = (url: string, baseUrl: string | URL) =>
	new URL(url, baseUrl).toString();

/** Given a font family, returns the properly formatted href that can be used to link to that font's @font-face CSS on Google's servers. */
export const getGoogleFontLinkTagHref = (options: {
	family: string;
	display: 'auto' | 'block' | 'fallback' | 'optional' | 'swap';
}) => {
	const url = new URL(GOOGLE_FONTS_BASE_URL);
	url.search = new URLSearchParams(options).toString();
	return url.toString();
};

/** Parses the given string to a comma-separated string array. */
export const toCommaSeparatedList = (rawValue: string): string[] => {
	return rawValue
		.split(',')
		.map((el) => el.trim())
		.filter((el) => !!el);
};

/** Indents the given text by a certain level. If the text is already indented, each line will be indented by the specified level.
 * Uses tabs by default, but you can also indent by spaces.
 */
export const indent = (text: string, indentLevel: number, indentChar: ' ' | '\t' = '\t') => {
	if (indentLevel <= 0) {
		throw new Error(`Invalid indentation level: ${indentLevel}`);
	}
	const tabIndent = Array.from({ length: indentLevel }, () => indentChar).join('');
	return text
		.split('\n')
		.map((line) => `${tabIndent}${line}`)
		.join('\n');
};

/** Generates unique IDs for use in HTML. */
export const createId = (() => {
	let id = 0;
	return (prefix = 'uuid') => `${prefix}-${id++}`;
})();
