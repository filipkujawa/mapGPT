<script lang="ts">
	import { DataSet, Network } from 'vis';
	import { onMount } from 'svelte';
	import type { ActionData } from './$types';
	import copyIcon from '$lib/copy.png';
	import downloadIcon from '$lib/download.png';

	let network;
	let canvas: HTMLCanvasElement | null;
	let input: string;

	export let form: ActionData;

	onMount(async () => {
		const nodes = new DataSet(form?.nodes_array);
		const edges = new DataSet(form?.edges_array);

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
</script>

<div class="bg-white min-h-screen">
	<div class="flex flex-col min-h-screen items-center pt-24">
		<h1 class="text-6xl font-bold text-black pb-4">MapGPT</h1>
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
					<button class="btn btn-info border-black border-y-2 border-r-2">Submit</button>
				</label>
			</form>
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
