import type { HTMLOptionAttributes, HTMLSelectAttributes } from 'svelte/elements';

export type SelectOption = Pick<HTMLOptionAttributes, 'selected' | 'value'> & {
	/** An optional text label to render. If not specified, defaults to rendering the value. */
	label?: string;
};

export type SelectProps = Pick<HTMLSelectAttributes, 'value' | 'name' | 'required'> & {
	/** The delay (in milliseconds) for the change event. Defaults to `0` (no delay). */
	delay?: number;
	/** The options to render. */
	options: SelectOption[];
	onInput?: HTMLSelectAttributes['on:input'];
};
