<script lang="ts">
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	export let href: NonNullable<HTMLAnchorAttributes['href']>;
	export let ariaLabel: HTMLAnchorAttributes['aria-label'] = undefined;
	const isExternalLink = /^https?:\/\//.test(href);
	const rel: HTMLAnchorAttributes['rel'] = isExternalLink ? 'noopener' : undefined;
</script>

<a {href} {rel} aria-label={ariaLabel}><slot /></a>

<style>
	a {
		color: var(--color-surface-dark);
		font-weight: inherit;
	}
</style>
