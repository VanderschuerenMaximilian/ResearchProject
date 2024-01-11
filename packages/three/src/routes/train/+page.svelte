<script lang="ts">
    import PoseCamera from "$lib/components/PoseCamera.svelte";
    import PoseScene from "$lib/components/PoseScene.svelte";
    import { Canvas } from '@threlte/core'
</script>

<PoseCamera />
<div>
    <Canvas>
        <PoseScene />
    </Canvas>
</div>

<style>
    div {
        width: 100vw;
        height: 100vh;
        background: rgb(13, 19, 32);
        background: linear-gradient(180deg, rgba(13, 19, 32, 1) 0%, rgba(8, 12, 21, 1) 100%);
    }
</style>