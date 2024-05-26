<script lang="ts">
	/** The title to render in the hero banner. */
	export let title: string;
	/** The description to render below the title. */
	export let description: string | undefined = undefined;
</script>

<header>
	<h1>{title}</h1>
	{#if description}
		<p>{description}</p>
	{/if}
</header>

<style lang="scss">
	@import '../styles/mixins';
	@import '../styles/functions';

	header {
		text-wrap: balance;
	}
	h1 {
		font-size: var(--sp-3xl);
		letter-spacing: var(--ls-sm);

		@include mobile-lg {
			font-size: var(--sp-4xl);
		}
	}
	p {
		font-size: var(--sp-md);
		max-width: 27ch;
		margin: 0 auto;
	}
	h1,
	p {
		text-align: center;
		overflow-wrap: anywhere;
		word-break: break-word;
	}
	@include mobile-lg {
		p {
			font-size: var(--sp-lg);
			max-width: 50ch;
		}
	}
</style>
