<script lang="ts">
	import outdent from 'outdent';
	import type { Readable } from 'svelte/store';
	import CopyToClipboardButton from '../CopyToClipboardButton.svelte';
	import type { TypeScale } from '$lib/types';
	import { indent } from '$lib/utils';
	import { useFormState } from '$lib/schema/schema.utils';

	export let typeScale: Readable<TypeScale>;

	const { form, allErrors } = useFormState();
	$: isInvalid = $allErrors.length > 0;
	$: fontSizes = Array.from($typeScale.entries());

	/** Helper to assemble a CSS custom property for a given font size step. */
	$: getCustomPropertyName = (step: string) => `--${$form.prefix}-${step}`;

	$: fluidVariables = fontSizes
		.map(([step, { min, max, preferred }]) => {
			return `${getCustomPropertyName(step)}: clamp(${min}, ${preferred}, ${max});`;
		})
		.join('\n')
		.trim();

	$: getCode = () => {
		if (isInvalid) {
			return `Please correct the errors in your input.`;
		}
		// Include fallbacks with feature queries for browsers that don't support clamp
		if ($form.includeFallbacks) {
			const minFallbackVariables = fontSizes
				.map(([step, { min }]) => `${getCustomPropertyName(step)}: ${min};`)
				.join('\n')
				.trim();

			const maxFallbackVariables = fontSizes
				.map(([step, { max }]) => `${getCustomPropertyName(step)}: ${max};`)
				.join('\n')
				.trim();

			// Outdent to prevent the static code indentation from influencing the output string indentation
			return outdent`
    /* For browsers that support clamp ${$form.useContainerWidth ? 'and container queries' : ''} */
    @supports (font-size: clamp(1rem, 1${$form.useContainerWidth ? 'cqi' : 'vi'}, 1rem)) {
      :root {
    ${indent(fluidVariables, 2)}
      }
    }
    /* For browsers that don't support clamp${
			$form.useContainerWidth ? ' or container queries' : ''
		} */
    @supports not (font-size: clamp(1rem, 1${$form.useContainerWidth ? 'cqi' : 'vi'}, 1rem)) {
      :root {
    ${indent(minFallbackVariables, 2)}
      }
      @media screen and (min-width: ${$form.maxWidth}px) {
        :root {
    ${indent(maxFallbackVariables, 3)}
        }
      }
    }
    `;
		} else {
			return fluidVariables;
		}
	};
</script>

<div class="output-root">
	<div role="region" tabIndex={0} aria-label="Output">
		<output class:invalid={isInvalid}>
			<code>{getCode()}</code>
		</output>
	</div>
	{#if !isInvalid}
		<CopyToClipboardButton text={getCode()} />
	{/if}
</div>

<style lang="scss">
	@import '../../styles/mixins';

	.output-root {
		display: flex;
		flex-direction: column;

		@include desktop {
			align-self: flex-start;
			position: sticky;
			top: var(--sp-xl);
		}
	}
	[role="region"] {
		border: solid 1px var(--color-border);
		max-height: 50vh;
		overflow: auto;
	}
	output {
		background-color: var(--color-surface-medium);
		white-space: pre;
		display: flex;
		overflow: auto;
		padding: var(--sp-lg);
		user-select: all;
	}

	.invalid {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
