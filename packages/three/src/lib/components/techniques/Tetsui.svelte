<script>
  import { Group } from 'three'
  import { T, forwardEventHandlers } from '@threlte/core'
  import { useGltf, useGltfAnimations } from '@threlte/extras'
  import * as three from 'three'

  export const ref = new Group()

  const gltf = useGltf('Tetsui-transformed.glb', { useDraco: true })
  export const { actions, mixer } = useGltfAnimations(gltf, ref)

  const component = forwardEventHandlers()

  $: if(actions) $actions['recorded_clip']?.setLoop(three.LoopOnce, 1), $actions['recorded_clip']?.play()
</script>

<T is={ref} dispose={false} {...$$restProps} bind:this={$component}>
  {#await gltf}
    <slot name="fallback" />
  {:then gltf}
    <T.Group>
      <T.Group name="Ethan__1_1" position={[0, 1.28, 0]} scale={0.016}>
        <T.Group name="EthanBody2">
          <T.SkinnedMesh
            name="mesh_0"
            geometry={gltf.nodes.mesh_0.geometry}
            material={gltf.nodes.mesh_0.material}
            skeleton={gltf.nodes.mesh_0.skeleton}
          />
        </T.Group>
        <T.Group name="EthanGlasses3">
          <T.SkinnedMesh
            name="mesh_1"
            geometry={gltf.nodes.mesh_1.geometry}
            material={gltf.nodes.mesh_1.material}
            skeleton={gltf.nodes.mesh_1.skeleton}
          />
        </T.Group>
        <T.Group name="EthanSkeleton4">
          <T is={gltf.nodes.EthanHips5} />
        </T.Group>
      </T.Group>
    </T.Group>
  {:catch error}
    <slot name="error" {error} />
  {/await}

  <slot {ref} />
</T>
