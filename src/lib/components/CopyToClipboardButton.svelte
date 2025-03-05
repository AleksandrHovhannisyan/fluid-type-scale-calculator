<script lang="ts">
	import Button from './Button.svelte';

	/** The text to copy to the clipboard when the button is clicked. */
	export let text: string;

	let isCopied = false;
</script>

<div class="copy-to-clipboard">
	<Button
		type="button"
		isFullWidth={true}
		onClick={() => {
			window.navigator.clipboard.writeText(text);
			isCopied = true;
			setTimeout(() => {
				isCopied = false;
			}, 2000);
		}}
	>
		{#if isCopied}
			<span role="alert">Copied!</span> <span aria-hidden="true">🎉</span>
		{:else}
			Copy to clipboard <span aria-hidden="true">📋</span>
		{/if}
	</Button>
</div>
<noscript>
	<style>
		.copy-to-clipboard button {
			display: none;
		}
	</style>
</noscript>
