<script lang="ts" context="module">
	import typeScaleRatios from '../data/typeScaleRatios.json';
</script>

<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { createId } from '$lib/utils';
	import Input from './Input.svelte';
	import Label from './Label.svelte';
	import type { Param } from '$lib/schema/schema';
	import type { SchemaConstraints, SchemaErrors } from '$lib/schema/schema';

	export let name: Param.minRatio | Param.maxRatio;
	export let value: HTMLInputAttributes['value'] = undefined;
	export let onInput: HTMLInputAttributes['on:input'] = undefined;
	/** Error messages describing why this input's value is invalid */
	export let errors: SchemaErrors | undefined = undefined;
	/** HTML validation constraints to set on the input */
	export let constraints: SchemaConstraints | undefined = undefined;

	const id = createId('datalist');
</script>

<Label>
	Type scale ratio
	<Input
		{name}
		type="number"
		inputmode="decimal"
		step="any"
		list={id}
		{value}
		{onInput}
		{errors}
		{constraints}
	/>
	<datalist {id}>
		{#each Object.entries(typeScaleRatios) as [_key, { name, ratio }]}
			<option value={ratio}>
				{name}
			</option>
		{/each}
	</datalist>
</Label>
