<script lang="ts">
	let dialog: HTMLDialogElement;
	export let isOpen: boolean;
	export let stylingClasses: string = ''
	export let firstLoadedPopup: boolean = false;
	$: if (dialog && isOpen) dialog.showModal();
	$: if (dialog && !dialog.open && !firstLoadedPopup) isOpen = false;
	$: if (dialog && dialog.open && isOpen == false) dialog.close()
</script>

<dialog
	on:close={() => {
		isOpen = false;
	}}
	bind:this={dialog}
	class="modal"
>
	{#if isOpen}
		<div class="modal-box p-10 {stylingClasses}">
			<button
				on:click={() => {
					isOpen = false;
					dialog.close();
				}}
				class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button
			>
			<slot />
		</div>{/if}
</dialog>
