<script lang="ts">
	import Popup from "$lib/components/general-purpose/Popup.svelte";
	import { superForm } from "sveltekit-superforms/client";
	import type { PageData } from "./$types";
	import { onMount } from "svelte";
	import { PUBLIC_VAPID_KEY } from '$env/static/public';
	import { enhance } from "$app/forms";
    export let data: PageData
    let invitePopup: boolean = Math.random() * 5 < 6 && !data.premium_enabled && !data.ignore_premium_popup;
    let notificationsPopup: boolean = false;
    let pwaPopup: boolean = data.pwa_popup_ask;
    //let new_premium_user_popup = data.just_signed_up_for_premium;
	const { form, errors, enhance: pushEnhance } = superForm(data.pushNotificationsForm);
	let formHTML: HTMLFormElement;
	let sub: PushSubscription | null;
    onMount(async () => {
		if ('serviceWorker' in navigator) {
			const reg = await navigator.serviceWorker.ready;
			sub = await reg.pushManager.getSubscription();
			if (!sub) {
				sub = await reg.pushManager.subscribe({
					userVisibleOnly: true,
					applicationServerKey: PUBLIC_VAPID_KEY
				});
				$form.VAPIDJson = JSON.stringify(sub);
				notificationsPopup = true;
			} else {
				$form.VAPIDJson = JSON.stringify(sub);
				if (!data.user_data.notification_subscription_vapid.includes($form.VAPIDJson)) {
					notificationsPopup = true;
				}
			}
		}
		const status = await Notification.requestPermission();
		if (status !== 'granted')
			alert('Please allow notifications to make sure that we can send you notifications.');
	});
    function inviteChance() {
		if (Math.random() * 50 < 1 && !data.premium_enabled && !data.ignore_premium_popup) {
			invitePopup = true;
		}
	}
	$: data.user_data, inviteChance();
</script>
<form method="POST" action="?/subscribeToPushNotifications" use:pushEnhance bind:this={formHTML}>
    <input type="hidden" name="VAPIDJson" bind:value={$form.VAPIDJson} />
</form>
<Popup bind:isOpen={invitePopup} firstLoadedPopup={true}>
    <h1 class="text-center text-3xl font-bold pt-3">Get free premium</h1>
    <div class="flex flex-col items-center">
        <p class="text-center mt-2">
            Invite a friend and get a month of premium while giving them two!
        </p>
        <a
            class="btn btn-primary rounded-2xl w-1/3 min-h-0 h-10"
            href="/invite/{data.user_data.user_id}">Invite</a
        >
    </div>
    {#if data.user_data.free_trail_expiration === undefined}
        <div class="flex flex-col items-center">
            <p class="text-center mt-2">
                Sign up for a free trial to get 2 months free, no credit card required!
            </p>
            <a class="btn btn-primary rounded-2xl w-1/3 min-h-0 h-10" href="/dashboard/premium"
                >Free Trial</a
            >
        </div>
    {/if}
    <form method="POST" use:enhance action="?/ignorePremiumPopup">
        <button class="btn mt-5 w-full">Stop recieving popup</button>
    </form>
</Popup>
<Popup bind:isOpen={notificationsPopup} firstLoadedPopup={true}>
    <h1 class="text-center text-3xl font-bold pt-3">Enable notifications on this device</h1>
    <div class="flex flex-col items-center">
        <p class="text-center mt-2">
            Would you like to recieve notifications on this device, in addition to any others?
        </p>
        <button
            class="btn btn-primary rounded-2xl w-1/3 min-h-0 h-10"
            on:click={() => {
                formHTML.submit();
            }}>Enable</button
        >
    </div>
    <form method="POST" use:enhance action="?/ignorePremiumPopup">
        <button class="btn mt-5 w-full">Stop recieving popup</button>
    </form>
</Popup>
<!--<Popup bind:isOpen={new_premium_user_popup} firstLoadedPopup={true}>
    <h1 class="text-center text-3xl font-bold pt-3">Thank you for subscribing!</h1>
    <div class="flex flex-col items-center">
        <p class="text-center mt-2">
            You already know all the features you are getting, but the notifications do require one
            quick thing. You need to install this website as a "Progressive Web App", which is really
            simple, just go to the share menu and scroll down then click Add to Home Screen (iOS). If
            you need more help there is a guide below! Enjoy!
        </p>
        <a
            class="btn btn-primary rounded-2xl w-1/2 min-h-0 h-16"
            href="https://support.google.com/chrome/answer/9658361?hl=en&co=GENIE.Platform%3DiOS&oco=1"
            >How to install a PWA</a
        >
    </div>
</Popup>-->
<Popup bind:isOpen={pwaPopup} firstLoadedPopup={true}>
    <h1 class="text-center text-3xl font-bold pt-3">Install as PWA</h1>
    <div class="flex flex-col items-center">
        <p class="text-center mt-2">
            You are missing out on notifications! Follow the guide below to install the app as a
            Progressive Web App and get notified for things like new grades and assignments!
        </p>
        <a
            class="btn btn-primary rounded-2xl w-1/2 min-h-0 h-16"
            href="https://support.google.com/chrome/answer/9658361?hl=en&co=GENIE.Platform%3DiOS&oco=1"
            >How to install a PWA</a
        >
        <form method="POST" use:enhance action="?/ignorePWAPopup">
            <button
                class="btn mt-5 w-full"
                type="submit"
                on:click={() => {
                    pwaPopup = false;
                }}>Stop recieving popup</button
            >
        </form>
    </div>
</Popup>