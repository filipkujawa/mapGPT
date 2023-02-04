<script lang="ts">
    import { DataSet, Network } from 'vis';
    import { onMount } from 'svelte';
	import type { ActionData } from './$types';

    type Node = {
        id: number;
        label: string;
        color?: string;
    }

    type Edge = {
        from: string;
        to: string;
        label: string;
    }

    let network;
    let input: string;

    export let form: ActionData;

    onMount(async () => {
    const nodes = new DataSet(form?.nodes_array);
    const edges = new DataSet(form?.edges_array);
    
    const container = document.getElementById('myGraph');
    network = new Network(container, { nodes, edges }, {});

    });
    
</script>

<div class="bg-white min-h-screen">
    <div class="flex flex-col min-h-screen items-center pt-24">
        <h1 class="text-6xl font-bold text-black pb-16">MapGPT</h1>
        <div class="min-w-full">
        <form method="POST" action="?/submit">
            <label class="input-group justify-center">
                <input bind:value={input} name="info" type="text" placeholder="Type here" class="input input-bordered w-full max-w-xl bg-black" />
                <button class="btn btn-info">Submit</button>
            </label>
        </form>
        </div>
        <div class="min-w-full min-h-screen flex justify-center">
            <div id="myGraph" class="w-full"></div>
        </div>
    </div>
</div>