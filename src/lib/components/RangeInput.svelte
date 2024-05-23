<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import Input from './Input.svelte';
	import Label from './Label.svelte';
	import type { Param } from '$lib/schema/schema';
	import type { SchemaConstraints, SchemaErrors } from '$lib/schema/schema';

	export let name: Param;
	export let value: HTMLInputAttributes['value'] | undefined = undefined;
	export let onInput: HTMLInputAttributes['on:input'];
	export let label: string;
	/** Error messages describing why this input's value is invalid */
	export let errors: SchemaErrors | undefined = undefined;
	/** HTML validation constraints to set on the input */
	export let constraints: SchemaConstraints | undefined = undefined;
</script>

<Label title={label}>
	<div class="inputs">
		<Input type="range" {name} {value} {errors} {constraints} step={1} {onInput} />
		<span aria-hidden="true">{value}</span>
	</div>
</Label>

<style>
	.inputs {
		display: flex;
		align-items: center;
		gap: var(--sp-sm);
		font-variant-numeric: tabular-nums;
	}
	span {
		/* minimize layout shifts */
		min-width: 5ch;
	}
</style>
