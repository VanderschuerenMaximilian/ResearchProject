<script lang="ts">
    import PoseCamera from "$lib/components/PoseCamera.svelte";
    import PoseScene from "$lib/components/PoseScene.svelte";
    import Startbutton from "$lib/components/Startbutton.svelte";
    import Technique from "$lib/components/Technique.svelte";
    import ReturnHome from "$lib/components/ReturnHome.svelte";
    import { Canvas } from '@threlte/core'
    import { techniqueRecognition } from '$lib/composables/recognition'

    $: console.log('techniqueRecognition: ',$techniqueRecognition?.technique?.result[0].category,' ', $techniqueRecognition?.technique?.confidence_score)
    $: techniqueName = $techniqueRecognition?.technique?.confidence_score > 0.30? $techniqueRecognition.technique.result[0].category : ''
</script>

<div class="w-screen h-screen">
    <ReturnHome />
    <Startbutton />
    <Technique techniqueName={techniqueName} horizontalPos={'right-4'} verticalPos={'top-4'}/>
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