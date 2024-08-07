<script lang="ts">
	import Login from '../Login.svelte';
	import Signup from '../Signup.svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	let loginPopup: boolean = true;
	let signupPopup: boolean = false;
    let isCloseable = false
</script>
<Login bind:loginPopup bind:signupPopup data={data.loginForm} {isCloseable}/>
<Signup bind:loginPopup bind:signupPopup data={data.signupForm} {isCloseable}/>