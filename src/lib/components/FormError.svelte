<script lang="ts">
	import type { SchemaErrors } from "$lib/schema/schema";

    /** A unique HTML ID for the error message. Used to associate the error with an input via `aria-describedby`. */
    export let id: string;
	/** The error message to display. */
	export let message: SchemaErrors | undefined;
</script>

{#if message}
	<span class="error" id={id}>{message}</span>
{/if}
<style>
.error {
	font-size: var(--sp-xs);
	color: var(--color-danger);
	line-height: 1.2;
	margin-bottom: var(--sp-2xs);
}
</style>