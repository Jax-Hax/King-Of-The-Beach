<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import type { SuperValidated } from 'sveltekit-superforms';
	import type { SignupSchema } from '$lib/form_schemas/root_schemas';

	let dialog: HTMLDialogElement;
	export let loginPopup: boolean;
	export let signupPopup: boolean;
	export let data: SuperValidated<SignupSchema>;
	$: if (dialog && signupPopup) dialog.showModal();
	const { form, errors, enhance, message, delayed } = superForm(data, {
		resetForm: true
	});
	export let isCloseable = true;
</script>

<dialog
	on:close={() => {
		signupPopup = false;
	}}
	bind:this={dialog}
	class="modal"
>
	<div class="modal-box p-10">
		{#if isCloseable}
		<button
			on:click={() => {
				signupPopup = false;
				dialog.close();
			}}
			class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button
		>
		{/if}
		<a href="/" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
			<img class="w-8 h-8 mr-2" src="/favicon.webp" alt="logo" />
			Cognnect
		</a>
		<h3 class=" font-bold mb-2 text-xl md:text-2xl">Create an account</h3>
		<form method="POST" action="?/signup" use:enhance>
			{#if $message}
				<p>{$message}</p>
			{:else}
				<label class="form-control w-full">
					<div class="label">
						<span class="label-text">Email (cannot be your school email)</span>
					</div>
					<input
						type="email"
						name="email"
						bind:value={$form.email}
						placeholder="name@company.com"
						required
						class="input input-bordered w-full"
					/>
					<div class="label">
						{#if $errors.email}<span class="label-text-alt text-error">{$errors.email}</span>{/if}
					</div>
				</label>
				<div class="label">
					<span class="label-text">Password (must be at least 6 characters)</span>
				</div>
				<input
					type="password"
					name="password"
					bind:value={$form.password}
					placeholder="••••••••"
					required
					class="input input-bordered w-full"
				/>
				<div class="label">
					{#if $errors.password}<span class="label-text-alt text-error">{$errors.password}</span
						>{/if}
				</div>
				<div class="label">
					<span class="label-text">Confirm Password</span>
				</div>
				<input
					type="password"
					name="confirmPassword"
					bind:value={$form.confirmPassword}
					placeholder="••••••••"
					required
					class="input input-bordered w-full"
				/>
				<div class="label">
					{#if $errors.confirmPassword}<span class="label-text-alt text-error"
							>{$errors.confirmPassword}</span
						>{/if}
				</div>
				<button type="submit" class="btn btn-primary my-2 w-full">{#if $delayed}<span class="loading loading-spinner loading-md"></span>{:else}Sign up{/if}</button>
				<p class="text-sm font-light text-center">
					Already have an account? <button
						on:click={() => {
							loginPopup = true;
							signupPopup = false;
							dialog.close();
						}}
						class="font-medium text-primary-600 hover:underline dark:text-primary-500"
						>Sign In</button
					>
				</p>
			{/if}
		</form>
	</div>
</dialog>
