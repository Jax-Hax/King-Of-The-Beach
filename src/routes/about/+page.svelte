<script lang="ts">
	import Login from '../Login.svelte';
	import Signup from '../Signup.svelte';
	import type { PageData } from './$types';
	import Header from '../Header.svelte';
	import About from './About.svelte';

	export let data: PageData;

	let loginPopup: boolean = false;
	let signupPopup: boolean = false;
</script>

<Header bind:loginPopup bind:signupPopup />
<Login bind:loginPopup bind:signupPopup data={data.loginForm} />
<Signup bind:loginPopup bind:signupPopup data={data.signupForm} />
<About />