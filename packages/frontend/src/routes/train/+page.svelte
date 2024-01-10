<script lang="ts">
    import { createScene } from '$lib/three/cubeScene';
  import { onMount } from 'svelte'

    let el: HTMLCanvasElement;

    onMount(() => {
        createScene(el)
    })
</script>

<svelte:head>
	<title>Train</title>
	<meta name="description" content="Page to train your katas" />
</svelte:head>

<section class="flex flex-col justify-center items-center">
        <canvas bind:this={el}></canvas>
</section>