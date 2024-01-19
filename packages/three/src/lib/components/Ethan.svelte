<script lang="ts">
  import { onDestroy } from 'svelte'
  import { Group } from 'three'
  import { T, forwardEventHandlers } from '@threlte/core'
  import { useGltf, useGltfAnimations } from '@threlte/extras'
  import { buttonAgeUke, buttonGedanBarai, buttonOiTsuki, buttonStance, buttonTetsui } from '../composables/state'

  export const ref = new Group()
  const gltf = useGltf('static/Ethan-transformed.glb', { useDraco: true })
  const { actions, mixer } = useGltfAnimations(gltf, ref)
  const component = forwardEventHandlers()
</script>

<T is={ref} dispose={false} {...$$restProps} bind:this={$component}>
  {#await gltf}
    <slot name="fallback" />
  {:then gltf}
    <T.Group position={[-0.07, -0.19, 0]} rotation={[0, 0, 1.57]} scale={.012}>
      <T.Mesh
        geometry={gltf.nodes.EthanBody.geometry}
        material={gltf.nodes.EthanBody.material}
        position={[16.58, -0.06, 2.13]}
        rotation={[3.13, -1.54, 1.56]}
      />
      <T.Mesh
        geometry={gltf.nodes.EthanGlasses.geometry}
        material={gltf.nodes.EthanGlasses.material}
        position={[16.58, -0.06, 2.13]}
        rotation={[3.13, -1.54, 1.56]}
      />
    </T.Group>
  {:catch error}
    <slot name="error" {error} />
  {/await}

  <slot {ref} />
</T>
