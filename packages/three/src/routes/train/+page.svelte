<script lang="ts">
    import PoseCamera from "$lib/components/PoseCamera.svelte";
    import PoseScene from "$lib/components/PoseScene.svelte";
    import Startbutton from "$lib/components/Startbutton.svelte";
    import { Canvas } from '@threlte/core'
</script>

<div class="w-screen h-screen">
    <Startbutton />
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