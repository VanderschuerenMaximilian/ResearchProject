<script lang="ts">
  import { Pane, Button } from 'svelte-tweakpane-ui'
  import { Canvas } from '@threlte/core'
  //@ts-ignore
  import Scene from '$lib/components/Scene.svelte'
  import { buttonIdle, buttonWalk, buttonRun } from '$lib/composables/state'
  // import Camera from '$lib/components/Camera.svelte';
</script>

<svelte:head>
	<title>Train Kata's</title>
	<meta name="description" content="Here you can learn kata's" />
</svelte:head>

<!-- <Camera /> -->
<Pane
  title="Transitions"
  position="fixed"
>
  <Button
    title="Idle"
    on:click={() => {
      $buttonIdle = !$buttonIdle
    }}
  />
  <Button
    title="Walk"
    on:click={() => {
      $buttonWalk = !$buttonWalk
    }}
  />
  <Button
    title="Run"
    on:click={() => {
      $buttonRun = !$buttonRun
    }}
  />
</Pane>
<div>
  <Canvas>
    <Scene />
  </Canvas>
</div>
<style>
  :global(body) {
    margin: 0;
  }

  div {
    width: 100vw;
    height: 100vh;
    background: rgb(13, 19, 32);
    background: linear-gradient(180deg, rgba(13, 19, 32, 1) 0%, rgba(8, 12, 21, 1) 100%);
  }
</style>