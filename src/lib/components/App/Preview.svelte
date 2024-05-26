<script lang="ts">
	import { DEFAULT_FONT_FAMILY, SCHEMA_DEFAULTS } from '$lib/schema/schema';
	import type { TypeScale } from '$lib/types';
	import type { Readable } from 'svelte/store';
	import { useFormState } from '$lib/schema/schema.utils';
	import { getGoogleFontLinkTagHref } from '$lib/utils';
	import Fieldset from '../Fieldset.svelte';
	import type { SelectProps } from '../Select.types';
	import GoogleFontSelect from '../GoogleFontSelect.svelte';
	import RangeInput from '../RangeInput.svelte';
	import Label from '../Label.svelte';
	import { Param } from '$lib/schema/schema';
	import Input from '../Input.svelte';
	import Button from '../Button.svelte';

	export let typeScale: Readable<TypeScale>;

	const { form, errors, constraints } = useFormState();
	$: previewFont = $form[Param.previewFont];
	$: previewText = $form[Param.previewText];
	$: previewWidth = $form[Param.previewWidth];
	$: typeScaleEntries = $typeScale.entries();
	$: isDefaultFontFamily = previewFont === DEFAULT_FONT_FAMILY;

	const handleFontInput: SelectProps['onInput'] = (e) => {
		form.set({
			...$form,
			[Param.previewFont]: (e.target as HTMLOptionElement).value
		});
	};
</script>

<svelte:head>
	{#if !isDefaultFontFamily}
		<link
			rel="stylesheet"
			type="text/css"
			href={getGoogleFontLinkTagHref({
				family: previewFont,
				display: 'swap'
			})}
		/>
	{/if}
</svelte:head>
<section class="preview">
	<h2>Preview your type scale</h2>
	<Fieldset title="Preview controls" isLegendVisuallyHidden={true}>
		<Label title="Font family">
			<GoogleFontSelect
				name={Param.previewFont}
				value={previewFont}
				errors={$errors[Param.previewFont]}
				constraints={$constraints[Param.previewFont]}
				onInput={handleFontInput}
			/>
		</Label>
		<Label title="Preview text">
			<Input
				name={Param.previewText}
				type="text"
				value={previewText}
				errors={$errors[Param.previewText]}
				constraints={$constraints[Param.previewText]}
				onInput={(e) =>
					form.set({
						...$form,
						[Param.previewText]: e.currentTarget.value
					})}
			/>
		</Label>
		<RangeInput
			name={Param.previewWidth}
			label={`${$form[Param.shouldUseContainerWidth] ? 'Container' : 'Screen'} width (px)`}
			value={previewWidth}
			errors={$errors[Param.previewWidth]}
			constraints={{
				...$constraints[Param.previewWidth],
				min: $form[Param.minWidth],
				max: $form[Param.maxWidth]
			}}
			onInput={(e) =>
				form.set({
					...$form,
					[Param.previewWidth]: e.currentTarget.valueAsNumber
				})}
		/>
		<noscript>
			<Button type="submit">Update table</Button>
		</noscript>
	</Fieldset>
	<div class="table-wrapper" tabIndex={0} role="region" aria-label="Size previews">
		<table>
			<thead>
				<tr>
					<th scope="col">Step</th>
					<th scope="col" class="numeric nowrap"> Min </th>
					<th scope="col" class="numeric nowrap"> Max </th>
					<th scope="col" class="numeric nowrap"> Rendered </th>
					<th scope="col" class="preview-text nowrap"> Preview </th>
				</tr>
			</thead>
			<tbody>
				{#each typeScaleEntries as [step, { min, max, getFontSizeAtScreenWidth }]}
					<tr>
						<td>{step}</td>
						<td class="numeric">{min}</td>
						<td class="numeric">{max}</td>
						<td class="numeric">{getFontSizeAtScreenWidth(previewWidth)}</td>
						<td
							class="nowrap"
							style={`font-size: calc(${getFontSizeAtScreenWidth(previewWidth)} * ${
								$form[Param.shouldUseRems] ? $form[Param.remValueInPx] : SCHEMA_DEFAULTS.remValue
							}/${SCHEMA_DEFAULTS.remValue}); font-family: ${isDefaultFontFamily ? 'var(--ff-body)' : previewFont}`}
						>
							{previewText}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</section>

<style lang="scss">
	@import '../../styles/functions';
	@import '../../styles/mixins';

	.preview {
		max-width: 100%;
		width: 100%;
		overflow: hidden;
		padding: 0 4px;
		display: grid;
		gap: var(--sp-2xl);
	}
	h2 {
		margin: 0;
	}

	.table-wrapper {
		max-width: 100%;
		overflow: auto;
		width: 100%;
	}
	table {
		--cell-padding: var(--sp-xs);
		border-collapse: collapse;
		// https://github.com/AleksandrHovhannisyan/fluid-type-scale-calculator/issues/14
		font-variant-numeric: tabular-nums;
		margin-left: calc(-1 * var(--cell-padding));
		margin-right: calc(-1 * var(--cell-padding));
	}
	:is(th, td) {
		border: none;
		padding: var(--cell-padding);
	}
	th {
		text-align: start;
		font-weight: var(--fw-body-bold);
		padding-top: 0;
	}
	.numeric {
		text-align: end;
	}
	.nowrap {
		white-space: nowrap;
	}
</style>
