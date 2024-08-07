<script lang="ts">
	import Header from "./Header.svelte";

	let menuOpen: boolean = false;
	export let loginPopup: boolean;
	export let signupPopup: boolean;
</script>

<div class="bg-base-200 min-h-screen">
	<Header bind:loginPopup bind:signupPopup />

	<div class="relative isolate px-6 pt-14 lg:px-8">
		<div
			class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
			aria-hidden="true"
		>
			<div
				class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#80a8ff] to-[#1290f7] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
				style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
			></div>
		</div>
		<div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
			<div class="hidden sm:mb-8 sm:flex sm:justify-center">
				<div
					class="relative rounded-full px-3 py-1 text-sm leading-6 ring-1"
				>
					1.0 is being officially released to Clover Hill. <a
						href="/blog/latest"
						class="font-semibold text-blue-600"
						><span class="absolute inset-0" aria-hidden="true"></span>Read more
						<span aria-hidden="true">&rarr;</span></a
					>
				</div>
			</div>
			<div class="text-center">
				<h1 class="text-4xl font-bold tracking-tight sm:text-6xl">
					Bringing Students Together
				</h1>
				<p class="mt-6 text-lg leading-8 ">
					Join a network of students working to make school more enjoyable. Stop worrying about due dates, start learning.
				</p>
				<div class="mt-10 flex items-center justify-center gap-x-6">
					<button
						on:click={() => {
							signupPopup = true;
						}}
						class="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>Get started</button
					>
					<a href="/features" class="text-sm font-semibold leading-6"
						>Learn more <span aria-hidden="true">→</span></a
					>
				</div>
			</div>
		</div>
	</div>
</div>
