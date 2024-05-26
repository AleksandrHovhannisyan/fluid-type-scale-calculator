<script lang="ts">
	import Button from '../Button.svelte';
	import { useFormState } from '$lib/schema/schema.utils';
	import {
		GroupMinimum,
		GroupMaximum,
		GroupTypeScaleSteps,
		GroupNamingConvention,
		GroupRounding,
		GroupUseContainerWidth,
		GroupIncludeFallbacks,
		GroupRems
	} from './Form';
	import { getTypeScale } from '$lib/schema/schema.utils';
	import { derived } from 'svelte/store';
	import Output from './Output.svelte';
	import Preview from './Preview.svelte';
	import { debounce } from '$lib/utils';
	import { replaceState } from '$app/navigation';
	import { page } from '$app/stores';

	const { form, enhance } = useFormState();
	let typeScale = derived(form, ($form) => getTypeScale($form));

	const updateUrlWithFormData = debounce((formElement: HTMLFormElement) => {
		const searchParams = new URLSearchParams($form as unknown as Record<string, string>);
		const url = new URL(formElement.action);
		url.search = searchParams.toString();
		const newUrl = url.toString();
		replaceState(newUrl, $page.state);
	}, 400);
</script>

<form
	method="POST"
	action="/calculate"
	on:change={(e) => updateUrlWithFormData(e.currentTarget)}
	use:enhance
>
	<div class="switcher type-scale-stack">
		<div>
			<noscript>
				<aside role="alert">
					<strong>NOTE</strong>: JavaScript is currently disabled in your browser. Some
					functionality is limited.
				</aside>
			</noscript>
			<div class="form-groups">
				<GroupMinimum />
				<GroupMaximum />
				<GroupTypeScaleSteps />
				<GroupNamingConvention />
				<GroupRounding />
				<GroupUseContainerWidth />
				<GroupIncludeFallbacks />
				<GroupRems />
				<noscript>
					<Button type="submit" isFullWidth={true}>Generate type scale variables</Button>
				</noscript>
			</div>
		</div>
		<Output {typeScale} />
	</div>
	<Preview {typeScale} />
</form>

<style>
	form {
		--size-border-width: var(--sp-2xs);
		--size-form-padding: var(--sp-lg);
		display: grid;
		gap: var(--sp-4xl);
	}
	aside {
		background-color: var(--color-surface-dark);
		color: var(--color-surface-light);
		font-size: var(--sp-sm);
		padding-block-start: var(--sp-xs);
		padding-inline: calc(var(--size-border-width) + var(--size-form-padding));
	}
	.form-groups {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: var(--sp-xl);
		margin: 0;
		padding: var(--size-form-padding);
		border: solid var(--size-border-width) var(--color-surface-dark);
	}
	.type-scale-stack {
		gap: var(--sp-xl);
	}
</style>
