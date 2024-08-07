<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	export let data;
	import '../app.css';
	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<svelte:head>
	<title>LDebate</title>
	<meta
		name="description"
		content="Free debate guides and the best online card tool on the market!"
	/>
</svelte:head>

<html lang="en">
	
	<slot />
</html>