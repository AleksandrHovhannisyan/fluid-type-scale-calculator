<script lang="ts">
	import { page } from '$app/stores';
</script>

<h1>{$page.error?.message}</h1>
<style>
    h1 {
        text-align: center;
    }
</style>