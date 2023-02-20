<script lang="ts">
import { onMount } from 'svelte';
import kommuner from '$lib/geo/kommuner.geo.json';
import laen from '$lib/geo/laen.geo.json';
import Search from '../components/search/+page.svelte';

// Query results
let filteredKommun = [];
let testar = ''
let choosenArea = kommuner;
let newItem;

// For Search Input
let searchTerm:string = "";
	// resets language menu if search input is used
	//$: if (searchTerm) selectedLang = ""; 
	
const searchKommun = () => {	
    return filteredKommun = kommuner.filter(kommun => {
        let kommunNamn = kommun.namn.toLowerCase();
        return kommunNamn.includes(searchTerm.toLowerCase())
    });
}
const apa = '';
function handleClick(apa) {
        testar = apa.coordinates[0].map((item, i) => {
            return item.reverse();
        }).join(";");
}

function handleArea(area) {
        if(area === 'kommun') {
            choosenArea = kommuner
        }
        else {
            choosenArea  = laen
        }
        }

function copyCoords() {
    var range = document.createRange();
    range.selectNode(document.getElementById("coords"));
    window.getSelection()?.removeAllRanges();
    window.getSelection()?.addRange(range);
    document.execCommand("copy");
    window.getSelection()?.removeAllRanges();
}
</script>

<nav id="query-section">
    <ul>
        <li>
            <Search bind:searchTerm on:input={searchKommun} />
        </li>
        <li>
            <button role="button" class="secondary" on:click={() => handleArea('kommun')}>
                Kommuner
            </button>
        </li>
        <li>
            <button role="button" class="secondary" on:click={() => handleArea('laen')}>
                Län
            </button>
        </li>
        <li>
            <button role="button" on:click={copyCoords}>
                Copy to clipboard
            </button>
        </li>
    </ul>
    
</nav>

<div class="flex-container">
<div id="areaLinks" class="flex-child">
<main id="geoAreas">
	{#if searchTerm === 0}
		<p>Inet resultat</p>>	
	{:else if filteredKommun.length > 0}
		{#each filteredKommun as {namn, geometry}}
            <a href="_#" on:click={() => handleClick(geometry)}>
                {namn}
            </a><br>
		{/each}	
	{:else}
		{#each choosenArea as {namn, geometry}}
        <a href="#" on:click={() => handleClick(geometry)}>
            {namn}
        </a><br>
		{/each}	
	{/if}
</main>	
</div>
<div id="coords" class="flex-child">
    {testar}
</div>
</div>

<style>
	#areaLinks {
		width: 300px;
		display: flex;
		margin: 0 0 0 20px;
	}

    #coords {
		display: flex;
	}

    .flex-container {
        display: flex;
    }

    .flex-child {
        
    }

    .flex-child:first-child {
        flex: 1;
    }

    .flex-child:nth-child(2) {
        flex: 4;
        padding-right: 20px;
        word-break: break-all;
    }

</style>
