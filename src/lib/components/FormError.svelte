<script lang="ts">
	import type { SchemaErrors } from '$lib/schema/schema';

	/** A unique HTML ID for the error message. Used to associate the error with an input via `aria-describedby`. */
	export let id: string;
	/** The error messages to display. */
	export let errors: SchemaErrors | undefined;
</script>

{#if errors}
	<span class="error" {id} role="alert">{errors}</span>
{/if}

<style>
	.error {
		font-size: var(--sp-xs);
		color: var(--color-danger);
		line-height: 1.2;
	}
</style>
