<script lang="ts">
	import type { SchemaConstraints, SchemaErrors } from '$lib/schema/schema';
	import type { Param } from '$lib/schema/schema';
	import { createId } from '$lib/utils';
	import FormError from './FormError.svelte';
	import type { SelectProps } from './Select.types';

	/** A reference to the rendered select element, for `this` binding. */
	export let ref: HTMLSelectElement | undefined = undefined; 
	export let name: Param;
	export let value: SelectProps['value'] = undefined;
	export let options: SelectProps['options'];
	/** Error messages describing why this input's value is invalid */
	export let errors: SchemaErrors | undefined = undefined;
	/** HTML validation constraints to set on the input */
	export let constraints: SchemaConstraints | undefined = undefined;
	export let onInput: SelectProps['onInput'] = undefined;

	let errorMessageId = createId();
	$: isInvalid = !!errors && errors.length > 0;
</script>

<FormError id={errorMessageId} message={errors}></FormError>
<select
	{value}
	{name}
	{...constraints}
	bind:this={ref}
	on:input={onInput}
	aria-invalid={isInvalid ? 'true' : 'false'}
	aria-describedby={isInvalid ? errorMessageId : undefined}
>
	{#each options as option}
		<option value={option.value} selected={option.selected || option.value === value}
			>{option.label || option.value}</option
		>
	{/each}
</select>

<style>
	select {
		appearance: none;
		background-color: var(--color-surface-light);
		background-image: url('data:image/svg+xml;utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 24 24"><path d="M2 4l10 12l10-12" stroke-width="4" stroke="currentColor" stroke-linejoin="round" stroke-linecap="round" fill="none"/></svg>');
		background-repeat: no-repeat;
		background-position: calc(100% - var(--input-padding)) center;
		padding-inline-end: calc(3 * var(--input-padding));
	}
</style>
