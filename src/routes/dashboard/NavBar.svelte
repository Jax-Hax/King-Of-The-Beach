<script lang="ts">
	import type { PageData } from './$types';
	import BugReport from '../../lib/components/other/BugReport.svelte';

	export let current_page: string;
	export let data: PageData;
	let settingDropupOpen = false;
	let bugReportPopup = false;
	let inbox_length;
	$: inbox_length =
		data.new_assignments.length +
		data.grades.reduce((count, obj) => {
			count += obj.new_assignments.length;
			count += obj.study_sets
				.map((set) => {
					let date = data.user_in_course_data.filter((x) => x.course_id === set.course_id);
					const last_sign_in_date = new Date(date[0].last_sign_in_time);
					const assignment_date = new Date(set.created_at);
					if (last_sign_in_date > assignment_date) {
						return undefined;
					} else {
						if (set.owner_id === data.user_data.user_id) {
							return undefined;
						}
						return 1;
					}
				})
				.filter((value) => value !== undefined).length;
			return count;
		}, 0);
</script>

<BugReport bind:bugReportPopup {data} />
<div
	class="fixed bottom-0 left-0 z-50 w-full bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600 p-1 pb-3"
>
	<div class="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
		<button
			on:click={() => {
				current_page = 'todo';
				settingDropupOpen = false;
			}}
			type="button"
			class="inline-flex flex-col items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 group {current_page ===
			'todo'
				? 'border-solid border-t-2 border-primary'
				: ''}"
		>
			<span class="material-icons-round text-3xl">
				assignment
			</span>{#if data.custom_todo_data.length + data.current_assignments.length + data.new_assignments.length > 0}<span
					class="absolute ml-7 rounded-xl bg-blue-600 min-h-[1.25rem] min-w-[1.25rem]"
					>{data.custom_todo_data.length +
						data.current_assignments.length +
						data.new_assignments.length}</span
				>{/if}
			<span
				class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
				>To-Do</span
			>
		</button>
		<button
			on:click={() => {
				current_page = 'study_sets';
				settingDropupOpen = false;
			}}
			type="button"
			class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group {current_page ===
			'study_sets'
				? 'border-solid border-t-2 border-primary'
				: ''}"
		>
			<span class="material-icons-round text-3xl"> fact_check </span>
			<span
				class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
				>Study</span
			>
		</button>
		<button
			on:click={() => {
				current_page = 'classes';
				settingDropupOpen = false;
			}}
			type="button"
			class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group {current_page ===
			'classes'
				? 'border-solid border-t-2 border-primary'
				: ''}"
		>
			<span class="material-icons-round text-3xl"> home </span>
			<span
				class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
				>Home</span
			>
		</button>
		<button
			on:click={() => {
				current_page = 'new';
				settingDropupOpen = false;
			}}
			type="button"
			class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group {current_page ===
			'new'
				? 'border-solid border-t-2 border-primary'
				: ''}"
		>
			<span class="material-icons-round text-3xl"> email </span>{#if inbox_length > 0}<span
					class="absolute ml-7 rounded-xl bg-red-600 min-h-[1.25rem] min-w-[1.25rem]"
					>{inbox_length}</span
				>{/if}
			<span
				class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
				>Inbox</span
			>
		</button>

		<button
			on:click={() => {
				settingDropupOpen = !settingDropupOpen;
			}}
			type="button"
			class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group {current_page ===
			'profile'
				? 'border-solid border-t-2 border-primary'
				: ''}"
		>
			<span class="material-icons-round text-3xl"> settings </span>
			<!--{#if !data.premium_enabled}<span class="absolute ml-7 rounded-full bg-yellow-600 h-4 w-4"
				></span>{/if}-->
			<span
				class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
				>Settings</span
			>
		</button>
		{#if settingDropupOpen}
			<div class="absolute -mt-[8.75rem] max-md:right-0 md:ml-[22.5rem]">
				<ul class="menu bg-base-300 w-44 rounded-box">
					<!--<li>
						<button
							on:click={() => {
								current_page = 'profile';
								settingDropupOpen = false;
							}}><span class="material-icons-round"> person </span>Profile</button
						>
					</li>
					<li>
						<a
							href={data.premium_enabled
								? 'https://billing.stripe.com/p/login/test_6oE5mEdsW3Fv0uYdQQ'
								: '/dashboard/premium'}
							><span class="material-icons-round">
								paid
							</span>Premium{#if !data.premium_enabled}<span
									class="rounded-full bg-yellow-600 h-4 w-4"
								></span>{/if}</a
						>
					</li>-->
					<li>
						<a href="/invite/{data.user_data.user_id}"
							><span class="material-icons-round"> person_add </span>Invite Friends</a
						>
					</li>
					<li>
						<button
							on:click={() => {
								bugReportPopup = true;
								settingDropupOpen = false;
							}}><span class="material-icons-round"> bug_report </span>Report Issue</button
						>
					</li>
					<li>
						<form method="post" action="?/signout">
							<button type="submit" class="flex items-center"
								><span class="material-icons-round mr-2"> logout </span>Sign out</button
							>
						</form>
					</li>
				</ul>
			</div>
		{/if}
	</div>
</div>
