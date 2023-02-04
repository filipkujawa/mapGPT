<script lang="ts">
	import { DataSet, Network } from 'vis';
	import { onMount } from 'svelte';
	import type { ActionData } from './$types';
	import copyIcon from '$lib/copy.png';
	import downloadIcon from '$lib/download.png';

	let network;
	let canvas: HTMLCanvasElement | null;
	let input: string;

	let error: boolean | undefined = false;
	let errorMessage: string = 'Something went wrong';

	let loading: boolean = false;

	export let form: ActionData;

	onMount(async () => {
		const nodes = new DataSet(form?.nodes_array);
		const edges = new DataSet(form?.edges_array);
		loading = false;
		error = form?.success;

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
</script>

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
						placeholder="Type here"
						class="input input-borderd border-black border-y-2 borer-l-2 w-full max-w-xl bg-transparent"
					/>
					<button on:click={handleSubmit} class="btn btn-info border-black border-y-2 border-r-2"
						>Submit</button
					>
				</label>
			</form>
			<!-- Error Alert -->
			{#if error}
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
							<span>{errorMessage}</span>
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
		<div class="flex flex-row space-x-4">
			<button on:click={downloadMap} class="btn btn-square btn-outline">
				<img src={downloadIcon} alt="Download" width="20" />
			</button>
		</div>

		<div class="min-w-full min-h-screen flex justify-center mt-12">
			<div id="myMap" class="w-full" />
		</div>
	</div>
</div>
