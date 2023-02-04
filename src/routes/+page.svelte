<script>
    import { DataSet, Network } from 'vis';
    import { onMount } from 'svelte';

    let network;

    onMount(async () => {
        const nodes = new DataSet([
            { id: 1, label: 'Node 1', color:'#3ABFF8'},
            { id: 2, label: 'Node 2', color:'#3ABFF8' },
            { id: 3, label: 'Node 3',color:'#3ABFF8' }
        ]);
        
        const edges = new DataSet([
            { from: 1, to: 2, color: {color:'black'} },
            { from: 2, to: 3, color: {color:'black'} }
        ]);


        
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
                <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xl bg-black" />
                    <span class="btn btn-info">Submit</span>
            </label>
        </form>
        </div>
        <div class="min-w-full min-h-screen flex justify-center">
            <div id="myGraph"></div>
        </div>
    </div>
</div>