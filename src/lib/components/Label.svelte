<script lang="ts">
	import clsx from "clsx";

	/** An optional title to display prominently above the input. */
	export let title: string | undefined = undefined;
	/** An optional, extended description of the label's contents. */
	export let description: string | undefined = undefined;
	/** Dictates the label's layout/content arrangement. If `'to-horizontal'` is specified, the label will
	 * automatically switch from a vertical arrangement to a horizontal one at a target breakpoint. Default: `'vertical'`. */
	export let layout: 'vertical' | 'horizontal' | 'to-horizontal' | undefined = 'vertical';
	/** Whether to hide this label and its input. */
	export let isHidden: boolean | undefined = false;
</script>

<label class={clsx(layout, { hidden: isHidden })} {...$$restProps}>
	{#if !!title || !!description}
		<span class="label-text">
			{#if title}
				<span class="label-title">{title}</span>
			{/if}
			{#if description}
				<span>{description}</span>
			{/if}
		</span>
	{/if}
	<slot />
</label>

<style lang="scss">
	@import '../styles/functions';
	@import '../styles/mixins';

	label {
		display: flex;
		gap: var(--sp-2xs);
	}
	label :global(input[type='range']) {
		flex: 1;
	}
	.hidden {
		display: none;
	}
	.label-text {
		display: flex;
		flex-direction: column;
		gap: 0.2em;
	}
	.label-title {
		font-weight: var(--fw-body-bold);
	}
	.to-horizontal,
	.vertical {
		flex-direction: column;
		justify-content: end;
	}
	.horizontal {
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
	.horizontal :global(input) {
		max-width: to-rems(120px);
	}
	@include mobile-lg {
		.to-horizontal {
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
		}
		.to-horizontal :global(input) {
			max-width: to-rems(120px);
		}
	}
</style>
