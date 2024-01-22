<script lang="ts">
    import { startButton } from '$lib/composables/state';
    import { Play, Pause } from 'lucide-svelte';
</script>

<button on:click={() => {$startButton = !$startButton}}
    class="absolute transform -translate-x-1/2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors p-3 left-1/2 top-4
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800">
    <Play size={48} class="text-white fill-white"
    style= {`
        ${$startButton ? 'display: none ' : 'transform: translateX(4px)'}
    `} 
    />
    <Pause size={48} class="text-white fill-white"
    style= {`
        ${!$startButton ? 'display: none' : ''}
    `}
    />
</button>