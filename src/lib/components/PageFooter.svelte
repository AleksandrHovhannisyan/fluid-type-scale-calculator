<script lang="ts">
	import Link from './Link.svelte';
	import socials from '$lib/data/socials.json';
	import { version } from '$app/environment';
</script>

<footer class="page-footer">
	<div class="copyright">
		<span aria-hidden="true">&copy;</span>Copyright <Link
			href="https://www.aleksandrhovhannisyan.com/">Aleksandr Hovhannisyan</Link
		>
		, 2021–Present. {version}.
	</div>
	<ul class="socials">
		{#each Object.entries(socials) as [_, social]}
			<li>
				<Link href={social.url}>{social.name}</Link>
			</li>
		{/each}
	</ul>
</footer>

<style lang="scss">
	@import '../styles/mixins';

	.page-footer {
		text-wrap: balance;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		gap: var(--sp-sm);
		text-align: center;
		font-size: var(--sp-sm);

		@include tablet {
			flex-direction: row;
			justify-content: space-between;
		}
	}
	.copyright :global(a) {
		font-weight: var(--fw-body-bold);
	}
	.socials {
		display: flex;
		gap: var(--sp-3xs);
		list-style: none;

		:global(a) {
			padding: var(--sp-3xs);
		}
	}
</style>
