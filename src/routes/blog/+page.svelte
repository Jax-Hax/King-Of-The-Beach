<script lang="ts">
	import Login from '../Login.svelte';
	import Signup from '../Signup.svelte';
	import type { PageData } from './$types';
	import Header from '../Header.svelte';

	export let data: PageData;

	let loginPopup: boolean = false;
	let signupPopup: boolean = false;
</script>

<Header bind:loginPopup bind:signupPopup />
<h1 class="font-bold text-center text-4xl">Still a work in progress</h1>
<Login bind:loginPopup bind:signupPopup data={data.loginForm} />
<Signup bind:loginPopup bind:signupPopup data={data.signupForm} />
