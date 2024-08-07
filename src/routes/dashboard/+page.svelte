<script lang="ts">
	import NavBar from './NavBar.svelte';
	let current_page = 'classes';
	export let data;
</script>
<body>
	<div>
		<NavBar bind:current_page {data} />
	</div>
	<div class="mb-20">
		{#if current_page === 'classes'}

		{/if}
	</div>
</body>
