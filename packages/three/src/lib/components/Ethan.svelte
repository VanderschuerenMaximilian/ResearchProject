<script lang="ts">
  import { onDestroy } from 'svelte'
  import { Group } from 'three'
  import { T, forwardEventHandlers } from '@threlte/core'
  import { useGltf, useGltfAnimations } from '@threlte/extras'
  import { buttonAgeUke, buttonGedanBarai, buttonOiTsuki, buttonStance, buttonTetsui } from '../composables/state'

  export const ref = new Group()
  // let currentActionKey = 'Stance'
  const gltf = useGltf('src/lib/models/Ethan-transformed.glb', { useDraco: true })
  const { GLTF, actions } = useGltfAnimations()
  const component = forwardEventHandlers()
  console.log(Object.entries(actions))

  // function transitionTo(nextActionKey: string, duration = 1) {
  //   const currentAction = $actions[currentActionKey]
  //   const nextAction = $actions[nextActionKey]
  //   if (!nextAction || currentAction === nextAction) return
  //   // Function inspired by: https://github.com/mrdoob/three.js/blob/master/examples/webgl_animation_skinning_blending.html
  //   nextAction.enabled = true
  //   if (currentAction) {
  //     currentAction.crossFadeTo(nextAction, duration, true)
  //   }
  //   // Not sure why I need this but the source code does not
  //   nextAction.play()
  //   currentActionKey = nextActionKey
  // }
  // onDestroy(() => {
  //   // unsub1()
  //   // unsub2()
  //   // unsub3()
  // })
</script>

<T is={ref} dispose={false} {...$$restProps} bind:this={$component}>
  {#await gltf}
    <slot name="fallback" />
  {:then gltf}
    <T.Group position={[-0.07, -0.29, 0]} rotation={[0, 0, 1.57]} scale={.018}>
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
