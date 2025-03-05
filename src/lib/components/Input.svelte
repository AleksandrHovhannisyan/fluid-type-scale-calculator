<script lang="ts">
	import { Param } from '$lib/schema/schema';
	import { createId } from '$lib/utils';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { SchemaConstraints, SchemaErrors } from '$lib/schema/schema';
	import FormError from './FormError.svelte';

	export let id: Param;
	export let name: Param;
	export let value: HTMLInputAttributes['value'] = undefined;
	export let checked: HTMLInputAttributes['checked'] = undefined;
	export let type: HTMLInputAttributes['type'];
	export let title: HTMLInputAttributes['title'] = undefined;
	export let step: HTMLInputAttributes['step'] = undefined;
	export let list: HTMLInputAttributes['list'] = undefined;
	export let inputmode: HTMLInputAttributes['inputmode'] = undefined;
	export let spellcheck: HTMLInputAttributes['spellcheck'] = undefined;
	export let onInput: HTMLInputAttributes['on:input'] = undefined;
	/** Error messages describing why this input's value is invalid */
	export let errors: SchemaErrors | undefined = undefined;
	/** HTML validation constraints to set on the input */
	export let constraints: SchemaConstraints | undefined = undefined;

	let errorMessageId = createId();
	$: isInvalid = !!errors && errors.length > 0;
</script>

<FormError id={errorMessageId} {errors}></FormError>
<input
	{id}
	{type}
	{name}
	{inputmode}
	{step}
	{list}
	{title}
	{spellcheck}
	{value}
	{checked}
	on:input={onInput}
	aria-invalid={isInvalid ? 'true' : 'false'}
	aria-describedby={isInvalid ? errorMessageId : undefined}
	{...constraints}
/>

<style lang="scss">
	@import '../styles/mixins';
	input {
		flex-shrink: 0;

		// Reset for datalist dropdown icon: https://stackoverflow.com/a/20941546/5323344
		&::-webkit-calendar-picker-indicator {
			opacity: 0;
			pointer-events: none;
		}

		&[type='checkbox'] {
			outline-offset: 4px;
			min-width: var(--sp-base);
			min-height: var(--sp-base);
		}
	}
	input[type='range'] {
		padding: 4px 0;
	}
</style>
