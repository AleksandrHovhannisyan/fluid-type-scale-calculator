<script lang="ts">
	import site from '$lib/data/site.json';
	import { HeroBanner, App, Info } from '$lib';
	import type { PageData } from './$types';
	import { initClientSideForm } from '$lib/schema/schema.utils';
	export let data: PageData;

	initClientSideForm(data.form);
	// TODO: make dynamic OG description based on form data (but with escaping)
</script>

<svelte:head>
	<meta name="robots" content="noindex" />
</svelte:head>
<HeroBanner title={site.title} description={site.description} />
<App />
<Info />
