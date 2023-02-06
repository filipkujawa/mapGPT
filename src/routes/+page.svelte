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
    <label for="settings-modal" class="btn btn-sm btn-circle btn-outline absolute right-2 top-2">✕</label>
    <h3 class="text-lg text-black font-bold pb-4">Settings</h3>
    <div class="form-control">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="label">
		  <span class="label-text text-black">Enter OPEN AI API Key</span>
		</label>
		<label class="input-group">
		  <input bind:value={API_KEY_INPUT} type="text" placeholder="Type here" class="input input-bordered bg-white w-full" />
		  {#if API_KEY_INPUT==OPEN_AI_API_KEY}
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
		<h2 class="text-4xl font text-black pb-12">Map concepts, Understand More</h2>
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
				<label for="settings-modal" class="btn btn-outline"><img src={settingsIcon} width=15 alt="settings"></label>
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
