<script>
	import '$lib/styles/main.scss';
	import site from '$lib/data/site.json';
	import { page } from '$app/stores';
	import { GitHubCorner, PageFooter } from '$lib';
	import { version } from '$app/environment';
	import { toAbsoluteUrl } from '$lib/utils';
	import '@fontsource-variable/inter/index.css';
	import '@fontsource-variable/source-code-pro/index.css';

	export let title = site.title;
	export let description = site.description;
	export let keywords = site.keywords;

	$: thumbnail = toAbsoluteUrl('/images/thumbnail.png', $page.url);
	$: structuredData = {
		'@context': 'http://schema.org',
		'@type': 'WebApplication',
		name: title,
		url: $page.url.href,
		description: description,
		applicationCategory: 'DeveloperApplication',
		genre: 'design',
		softwareVersion: version,
		operatingSystem: 'All'
	};
</script>

<svelte:head>
	<meta name="description" content={title} />
	<meta name="keywords" content={keywords.join(', ')} />
	<meta name="author" content="Aleksandr Hovhannisyan" />
	<link rel="canonical" href={$page.url.href} />
	<meta property="og:title" content={title} />
	<meta property="og:image" content={thumbnail} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={$page.url.href} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:author" content="@hovhaDovah" />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={thumbnail} />
	<title>{title} - {description}</title>
	{@html '<script type="application/ld+json">' + JSON.stringify(structuredData) + '</script>'}
</svelte:head>

<main id="app">
	<slot />
	<PageFooter />
	<GitHubCorner size={80} />
</main>

<style lang="scss">
	@import '../lib/styles/functions';
	main {
		display: grid;
		min-height: 100%;
		max-width: 1480px;
		margin-inline: auto;
		gap: var(--sp-4xl);
		padding: clamped(96px, 148px) var(--sp-xs) var(--sp-xl);
	}
</style>
