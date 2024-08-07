<script lang="ts">
    let menuOpen: boolean = false;
	export let loginPopup: boolean;
	export let signupPopup: boolean;
</script>
<header class="sticky inset-x-0 top-0 z-50 bg-base-100">
	<nav
		class="flex items-center justify-between py-2 pr-6 pl-2 lg:px-6 lg:py-4"
		aria-label="Global"
	>
		<div class="flex lg:flex-1">
			<a href="/" class="-m-1.5 p-1.5">
				<span class="sr-only">Cognnect</span>
				<img class="h-16 w-auto hidden dark:inline" src="/icon_light_with_text.png" alt="gear logo for Cognnect" />
				<img class="h-16 w-auto inline dark:hidden" src="/icon.png" alt="gear logo for Cognnect" />
			</a>
		</div>
		<div class="flex lg:hidden">
			<button
				on:click={() => {
					menuOpen = true;
				}}
				class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
			>
				<span class="sr-only">Open main menu</span>
				<svg
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					aria-hidden="true"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
					/>
				</svg>
			</button>
		</div>
		<div class="hidden lg:flex lg:gap-x-12">
			<a href="/features" class="text-sm font-semibold leading-6">Features</a>
			<a href="/blog" class="text-sm font-semibold leading-6 ">Blog</a>
			<a href="/about" class="text-sm font-semibold leading-6 ">About us</a>
		</div>
		<div class="hidden lg:flex lg:flex-1 lg:justify-end">
			<button
				on:click={() => {
					loginPopup = true;
				}}
				class="text-sm font-semibold leading-6 "
				>Log in <span aria-hidden="true">&rarr;</span></button
			>
		</div>
	</nav>
	{#if menuOpen}
		<!-- Mobile menu, show/hide based on menu open state. -->
		<div class="lg:hidden" role="dialog" aria-modal="true">
			<!-- Background backdrop, show/hide based on slide-over state. -->
			<div class="fixed inset-0 z-50"></div>
			<div
				class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-base-100 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
			>
				<div class="flex items-center justify-between">
					<a href="/" class="-m-1.5 p-1.5">
						<span class="sr-only">Cognnect</span>
						<img class="h-14 w-auto" src="favicon.webp" alt="gear logo for Cognnect" />
					</a>
					<button
						on:click={() => (menuOpen = false)}
						class="-m-2.5 rounded-md p-2.5"
					>
						<span class="sr-only">Close menu</span>
						<svg
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
				<div class="mt-6 flow-root">
					<div class="-my-6 divide-y divide-gray-500/10">
						<div class="space-y-2 py-6">
							<a
								href="/features"
								class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7  hover:bg-base-200"
								>Features</a
							>
							<a
								href="/blog"
								class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7  hover:bg-base-200"
								>Blog</a
							>
							<a
								href="/about"
								class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7  hover:bg-base-200"
								>About us</a
							>
						</div>
						<div class="py-6">
							<button
								on:click={() => {loginPopup = true}}
								class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7  hover:bg-base-200"
								>Log in</button
							>
						</div>
					</div>
				</div>
			</div>
		</div>
	{/if}
</header>