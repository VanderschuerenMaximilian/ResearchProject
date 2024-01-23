<script lang="ts">
    import PoseCamera from "$lib/components/PoseCamera.svelte";
    import PoseScene from "$lib/components/PoseScene.svelte";
    import Startbutton from "$lib/components/Startbutton.svelte";
    import Technique from "$lib/components/Technique.svelte";
    import ReturnHome from "$lib/components/ReturnHome.svelte";
    import { Canvas } from '@threlte/core'
    import { techniqueRecognition } from '$lib/composables/recognition'

    $: console.log('techniqueRecognition', $techniqueRecognition?.technique)
    $: techniqueName = $techniqueRecognition?.technique?.name? '': 'bow'
</script>

<div class="w-screen h-screen">
    <ReturnHome />
    <Startbutton />
    <!-- TODO: place the techniques the model things are being done with the confidence  -->
    <Technique techniqueName={techniqueName} />
    <PoseCamera />
    <Canvas>
        <PoseScene />
    </Canvas>
</div>

<style>
    div {
        background: rgb(13, 19, 32);
        background: linear-gradient(180deg, rgba(13, 19, 32, 1) 0%, rgba(8, 12, 21, 1) 100%);
    }
</style>