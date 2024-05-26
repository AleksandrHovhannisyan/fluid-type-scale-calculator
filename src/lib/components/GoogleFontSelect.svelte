<script lang="ts" context="module">
	import fonts from '$lib/data/fonts.json';
</script>

<script lang="ts">
	import { DEFAULT_FONT_FAMILY, type SchemaConstraints, type SchemaErrors } from '$lib/schema/schema';
	import type { Param } from '$lib/schema/schema';
	import { onDestroy, onMount } from 'svelte';

	import Select from './Select.svelte';
	import type { SelectOption, SelectProps } from './Select.types';
	export let name: Param;
	export let value: SelectProps['value'];
	export let onInput: SelectProps['onInput'];
	/** Error messages describing why this input's value is invalid */
	export let errors: SchemaErrors | undefined = undefined;
	/** HTML validation constraints to set on the input */
	export let constraints: SchemaConstraints | undefined = undefined;

	let selectElement: HTMLSelectElement;
	let options: SelectOption[] = [{ value: DEFAULT_FONT_FAMILY }];

	const getFontOptions = () => fonts.map((font) => ({ value: font }));

	/* Set fonts from props on intersection, for a few reasons:
    1. SEO: Don't want the initial HTML to return ~1k font family names; otherwise it matches irrelevant search queries (verified in Google Search Console early on).
    2. Performance: This sends less HTML over the wire initially.
	The main downside of this approach is that no-JS users cannot pick other fonts. IMO, this is an acceptable tradeoff. */
	let intersectionObserver: IntersectionObserver | undefined = undefined;
	onMount(() => {
		intersectionObserver = new IntersectionObserver(
			(entries, self) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						options = getFontOptions();
						self.unobserve(entry.target);
					}
				});
			},
			{ rootMargin: `400px 0px 400px 0px` }
		);
		intersectionObserver.observe(selectElement);
	});
	onDestroy(() => {
		intersectionObserver?.disconnect();
	});
</script>

<Select bind:ref={selectElement} {name} {value} {onInput} {errors} {constraints} {options} />