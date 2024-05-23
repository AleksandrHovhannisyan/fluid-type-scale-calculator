<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import clsx from 'clsx';

	export let id: HTMLButtonAttributes['id'] = undefined;
	export let type: HTMLButtonAttributes['type'] = undefined;
	export let onClick: HTMLButtonAttributes['on:click'] = undefined;
	/** Whether the button should occupy the full width of its containing block/formatting context. By default,
	 * buttons will only occupy as much space as their content.
	 */
	export let isFullWidth: boolean | undefined = undefined;
</script>

<button {id} {type} on:click={onClick} class={clsx({ 'full-width': isFullWidth })}><slot /></button>

<style lang="scss">
	button {
		cursor: pointer;
		text-align: center;
		border: none;
		background: var(--color-surface-dark);
		color: var(--color-surface-light);
		padding: var(--sp-md);

		&:focus-visible {
			outline: solid 4px var(--color-surface-dark);
			outline-offset: 4px;
		}
	}
	.full-width {
		width: 100%;
	}
</style>
