<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from '$lib/components/Scene.svelte'
  import ReturnHome from '$lib/components/ReturnHome.svelte'
  import Technique from '$lib/components/Technique.svelte'
  import { buttonIdle, buttonWalk, buttonRun ,buttonStance, buttonAgeUke, buttonOiTsuki, buttonGedanBarai, buttonTetsui, buttonShutoUke } from '$lib/composables/state'
  import { volume, muted } from '$lib/composables/audio'
  import { Volume1, Volume2, VolumeX, ChevronUp } from 'lucide-svelte'
  import type { PageData } from '$houdini'
  export let data: PageData
  $: ({ getTechniques } = data)
  $: techniques = $getTechniques.data.techniques
  $: $volume? handleVolume() : null
  let techniqueName: string
  let collapsed = false
  function handleMute() {
    if (!$muted) {
      $muted = true
      volume.set(0)
    } else {
      $muted = false
      volume.set(40)
    }
  }
  
  function handleVolume() {
    if($volume < 2) {
      $muted = true 
    } else {
      $muted = false
    }
  }
</script>

<svelte:head>
	<title>Train Kata's</title>
	<meta name="description" content="Here you can learn kata's" />
</svelte:head>

<ReturnHome />
<div class="absolute left-5 bg-gray-800 w-fit top-28 h-32 rounded-lg">
  <div class="flex flex-col justify-center items-center gap-9 translate-y-12">
    <input id="default-range" type="range" bind:value={$volume} class="-rotate-90 w-16 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">
    <button on:click={()=>{handleMute()}} class="rounded-full p-1 hover:bg-gray-900 transform transition-colors">
      {#if $volume > 50}
      <Volume2 size={24} class="text-white" />
      {:else if $volume > 0}
      <Volume1 size={24} class="text-white" />
      {:else if $volume === 0}
      <VolumeX size={24} class="text-white" />
      {/if}
    </button>
  </div>
</div>
<div class="absolute right-4 top-4 rounded-lg text-slate-100 text-center overflow-hidden">
  <div class={`z-10 relative px-3 py-4 flex justify-center items-center bg-gray-800 ${collapsed?'rounded-b-lg':'rounded-none'}`}>
      <button class="absolute right-4 top-3 rounded-full p-1 hover:bg-gray-900 transform transition-colors"
      on:click={()=>{collapsed = !collapsed}}
      >
      <ChevronUp size={24} class={`text-white ${collapsed?'rotate-180':'rotate-0'} transform transition-all duration-200`} />
    </button>
    <h4 class="text-xl font-title">Techniques</h4>
  </div>
  <div class={`flex flex-col gap-2 px-4 pb-3 bg-gray-800 rounded-b-lg ${collapsed? '-translate-y-96':'translate-y-0'} transform duration-200`}>
  {#if $getTechniques.fetching}
    <p>Fetching</p>
  {:else if $getTechniques.error}
    <p>Error</p>
  {:else if $getTechniques.data}
  {#each techniques as technique, index}
    <button class={`${index%2 === 0?'bg-gray-900 hover:bg-gray-800':'bg-gray-700 hover:bg-gray-800'} 
    transform transition-colors duration-200 py-1 px-20 rounded-md`}
    on:click={()=>{techniqueName = technique.name}}
    >
      <h5 class="text-base">{technique.name}</h5>
    </button>
  {/each}
  {/if}
    <button on:click={()=>{$buttonIdle = !$buttonIdle}}
    >Idle</button>
    <button on:click={()=>{$buttonWalk = !$buttonWalk}}
    >Walk</button>
    <button on:click={()=>{$buttonRun = !$buttonRun}}
    >Run</button>
  </div>
</div>
<Technique techniqueName={techniqueName} horizontalPos={'left-4'} verticalPos={'bottom-4'} />
<div class="canvas w-screen h-screen">
  <Canvas>
    <Scene />
  </Canvas>
</div>
<style>
  .canvas {
    background: rgb(13, 19, 32);
    background: linear-gradient(180deg, rgba(13, 19, 32, 1) 0%, rgba(8, 12, 21, 1) 100%);
  }
</style>