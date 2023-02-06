<script lang="ts">
	import { DataSet, Network } from 'vis';
	import { onMount } from 'svelte';
	import type { ActionData } from './$types';
	import settingsIcon from '$lib/setting.png';
	import downloadIcon from '$lib/download.png';

	let network;
	let canvas: HTMLCanvasElement | null;
	let input: string;

	let defaultErrorMessage: string = 'Something went wrong';
	let loading: boolean = false;
	export let form: ActionData;

	let OPEN_AI_API_KEY: string;
	let API_KEY_INPUT: string = '';

	onMount(async () => {
		const nodes = new DataSet(form?.nodes_array);
		const edges = new DataSet(form?.edges_array);
		loading = false;

		const container = document.getElementById('myMap');
		network = new Network(container, { nodes, edges }, {});
	});

	function downloadMap() {
		canvas = document.querySelector('#myMap > div > canvas');
		if (canvas) {
			const dataURL = canvas.toDataURL();
			const link = document.createElement('a');
			link.download = 'map.png';
			link.href = dataURL;
			link.click();
		}
	}

	function handleSubmit() {
		loading = true;
	}

	function handleSaveApiKey() {
		OPEN_AI_API_KEY = API_KEY_INPUT;
	}
</script>

<input type="checkbox" id="settings-modal" class="modal-toggle" />
<div class="modal">
	<div class="modal-box relative bg-white">
		<label for="settings-modal" class="btn btn-sm btn-circle btn-outline absolute right-2 top-2"
			>✕</label
		>
		<h3 class="text-lg text-black font-bold pb-4">Settings</h3>
		<div class="form-control">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="label">
				<span class="label-text text-black">Enter OPEN AI API Key</span>
			</label>
			<label class="input-group">
				<input
					bind:value={API_KEY_INPUT}
					type="text"
					placeholder="Type here"
					class="input input-bordered bg-white w-full"
				/>
				{#if API_KEY_INPUT == OPEN_AI_API_KEY}
					<button class="btn btn-disabled text-black">Saved</button>
				{:else}
					<button on:click={handleSaveApiKey} class="btn btn-info text-gray">Save</button>
				{/if}
			</label>
		</div>
	</div>
</div>

<div class="bg-white min-h-screen">
	<div class="flex flex-col min-h-screen items-center">
		<h1 class="text-6xl font-bold text-black pb-4 pt-24">MapGPT</h1>
		<h2 class="text-4xl text-black pb-4">Map concepts, Understand More</h2>
		<div class="flex flex-row space-x-2">
			<h2 class="text-1xl text-black pb-12">
				Made by <a target="_blank" rel="noreferrer" href="https://www.filipkujawa.com/" class="underline">Filip Kujawa</a>
			</h2>
			<a href="https://github.com/filipkujawa"
				><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
					><path
						d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
					/></svg
				></a
			>
		</div>
		<div class="min-w-full">
			<form method="POST" action="?/submit">
				<label class="input-group justify-center">
					<input
						bind:value={input}
						name="info"
						type="text"
						placeholder="Shrek is friends with donkey"
						class="input input-borderd border-black border-y-2 borer-l-2 w-full max-w-xl bg-transparent"
					/>
					<input type="hidden" name="API_KEY" bind:value={OPEN_AI_API_KEY} />
					<button on:click={handleSubmit} class="btn btn-info border-black border-y-2 border-r-2"
						>Submit</button
					>
				</label>
			</form>
			<div class="flex flex-row space-x-2 justify-center pt-4">
				<label for="settings-modal" class="btn btn-outline"
					><img src={settingsIcon} width="15" alt="settings" /></label
				>
				{#if form?.success == true}
					<div class="flex flex-row space-x-4">
						<button on:click={downloadMap} class="btn btn-square btn-outline">
							<img src={downloadIcon} alt="Download" width="20" />
						</button>
					</div>
				{/if}
			</div>
			<!-- Error Alert -->
			{#if form?.success == false}
				<div class="flex justify-center pt-4">
					<div class="alert alert-error shadow-lg w-1/2 justify-center">
						<div>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="stroke-current flex-shrink-0 h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
								/></svg
							>
							{#if form?.message}
								<span>{form?.message}</span>
							{:else}
								<span>{defaultErrorMessage}</span>
							{/if}
						</div>
					</div>
				</div>
			{/if}
			<!-- Loading Alert -->
			{#if loading}
				<div class="flex justify-center pt-4">
					<div class="alert alert-info shadow-lg w-1/2 justify-center">
						<div>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								class="stroke-current flex-shrink-0 w-6 h-6"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/></svg
							>
							<span>Building your map...</span>
						</div>
					</div>
				</div>
			{/if}
		</div>
		<div class="divider" />

		<div class="min-w-full min-h-screen flex justify-center mt-12">
			<div id="myMap" class="w-full" />
		</div>
	</div>
</div>
