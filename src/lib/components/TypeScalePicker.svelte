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

	export let id: Param.minRatio | Param.maxRatio;
	export let name: Param.minRatio | Param.maxRatio;
	export let value: HTMLInputAttributes['value'] = undefined;
	export let onInput: HTMLInputAttributes['on:input'] = undefined;
	/** Error messages describing why this input's value is invalid */
	export let errors: SchemaErrors | undefined = undefined;
	/** HTML validation constraints to set on the input */
	export let constraints: SchemaConstraints | undefined = undefined;

	const dataListId = createId('datalist');
</script>

<Label title="Type scale ratio" htmlFor={id}>
	<Input
		{id}
		type="number"
		inputmode="decimal"
		step="any"
		list={dataListId}
		{name}
		{value}
		{onInput}
		{errors}
		{constraints}
	/>
</Label>

<datalist id={dataListId}>
	{#each Object.entries(typeScaleRatios) as [_key, { name, ratio }]}
		<option value={ratio}>
			{name}
		</option>
	{/each}
</datalist>
