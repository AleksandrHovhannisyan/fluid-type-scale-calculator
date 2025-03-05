<script lang="ts">
	import clsx from 'clsx';

	/** The ID of the form input with which this label is associated. */
	export let htmlFor: string;
	/** The main label text. */
	export let title: string;
	/** Whether to bold the title. Not bold by default unless a description is also provided. */
	export let isTitleBold: boolean | undefined = undefined;
	/** An optional extended description of the label's contents. */
	export let description: string | undefined = undefined;
	/** Whether to hide this label and its input. */
	export let isHidden: boolean | undefined = false;
	/** Dictates the label's layout/content arrangement. If `'to-horizontal'` is specified, the label will
	 * automatically switch from a vertical arrangement to a horizontal one at a target breakpoint. Default: `'vertical'`. */
	export let layout: 'vertical' | 'horizontal' | 'to-horizontal' | undefined = 'vertical';
</script>

<div class={clsx('label-layout', layout, { hidden: isHidden })}>
	<label for={htmlFor} {...$$restProps}>
		<span class={clsx('title', { bold: isTitleBold ?? !!description })}>{title}</span>
		{#if description}
			<span class="description">{description}</span>
		{/if}
	</label>
	<slot />
</div>

<style lang="scss">
	@import '../styles/functions';
	@import '../styles/mixins';

	.hidden {
		display: none;
	}
	.label-layout,
	label {
		display: flex;
	}
	label {
		flex-direction: column;
		gap: 0.2em;
	}
	.label-layout {
		gap: var(--sp-2xs);
	}
	.label-layout :global(input[type='range']) {
		flex: 1;
	}
	.title.bold {
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
