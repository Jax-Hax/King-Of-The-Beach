<script lang="ts">
	import Hero from './Hero.svelte';
	import Login from './Login.svelte';
	import type { PageData } from './$types';
	import Signup from './Signup.svelte';
	export let data: PageData;

	let loginPopup: boolean = false;
	let signupPopup: boolean = false;
</script>

<Hero bind:loginPopup bind:signupPopup/>
<Login bind:loginPopup bind:signupPopup data={data.loginForm}/>
<Signup bind:loginPopup bind:signupPopup data={data.signupForm}/>
