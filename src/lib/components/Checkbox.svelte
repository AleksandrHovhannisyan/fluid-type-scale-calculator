<script lang="ts">
	import type { SchemaConstraints, SchemaErrors } from '$lib/schema/schema';
	import type { Param } from '$lib/schema/schema';
	import Input from './Input.svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';

	export let name: Param;
	export let checked: HTMLInputAttributes['checked'];
	export let onInput: HTMLInputAttributes['on:input'] = undefined;
	export let errors: SchemaErrors | undefined = undefined;
	export let constraints: SchemaConstraints | undefined = undefined;
</script>

<Input type="checkbox" {name} {checked} {errors} {constraints} {onInput} />
