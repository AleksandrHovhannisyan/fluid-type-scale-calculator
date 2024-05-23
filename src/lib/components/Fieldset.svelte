<script lang="ts">
	import clsx from 'clsx';

	/** A title to display prominently above the label group. */
	export let title: string;
	/** An extended description for the label group. */
	export let description: string | undefined = undefined;
	/** Whether the legend is visually (accessibly) hidden. */
	export let isLegendVisuallyHidden: boolean | undefined = undefined;
</script>

<fieldset>
	<legend class={clsx({ 'sr-only': isLegendVisuallyHidden })}>
		<span class="legend">
			{#if !!title}
				<span class="legend-title">{title}</span>
			{/if}
			{#if !!description}
				<span>{description}</span>
			{/if}
		</span>
	</legend>
	<div class="label-group"><slot /></div>
</fieldset>

<style lang="scss">
	@import "../styles/functions";

	fieldset {
		border: none;
		max-width: to-rems(1200px);
	}
	.legend {
		display: flex;
		flex-direction: column;
		gap: 0.2em;

		&-title {
			font-weight: var(--fw-body-bold);
		}
	}
	.label-group {
		display: flex;
		flex-wrap: wrap;
		gap: var(--sp-sm);

		> :global(*) {
			flex: 1;
			min-width: min(175px, 100%);
		}

		> :global(label) {
			/* to emphasize proximity, enforce a fixed small gap on the label children */
			gap: 4px;
		}
	}
	/* stylelint-disable-next-line selector-pseudo-class-no-unknown */
	:global(:not(legend.sr-only)) + .label-group {
		/* Ideally, we'd use a grid parent layout at the fieldset level, but fieldsets don't support flex/grid. The alternative
  is to wrap all of the fieldset's children in a div, but that clobbers the legend in the accessibility tree. Plus this solution is lighter. */
		margin-block-start: var(--sp-md);
	}
</style>
