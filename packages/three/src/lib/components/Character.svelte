<script lang="ts">
  import { onDestroy } from 'svelte'
  import { T } from '@threlte/core'
  import { GLTF, useGltfAnimations, PositionalAudio } from '@threlte/extras'
  import { buttonIdle, buttonWalk, buttonRun } from '../composables/state'
  let startAudio = false
  let currentActionKey = 'idle'
  const { gltf, actions } = useGltfAnimations()
  console.log(Object.entries(actions))
  $: $actions[currentActionKey]?.play()
  const unsub1 = buttonIdle.subscribe(() => {
    console.log('transition to idle')
    transitionTo('idle', 0.3)
  })
  const unsub2 = buttonWalk.subscribe(() => {
    console.log('transition to run')
    transitionTo('walk', 0.3)
    transitionTo('idle', 0.3)
  })
  const unsub3 = buttonRun.subscribe(() => {
    console.log('transition to run')
    transitionTo('run', 0.3)
  })
  function transitionTo(nextActionKey: string, duration = 1) {
    const currentAction = $actions[currentActionKey]
    const nextAction = $actions[nextActionKey]
    if (!nextAction || currentAction === nextAction) return
    // Function inspired by: https://github.com/mrdoob/three.js/blob/master/examples/webgl_animation_skinning_blending.html
    console.log(nextAction)
    nextAction.enabled = true
    if (currentAction) {
      currentAction.crossFadeTo(nextAction, duration, true)
    }
    // Not sure why I need this but the source code does not
    nextAction.play()
    startAudio = true
    currentActionKey = nextActionKey
    setTimeout(() => {
      startAudio = false  
    }, 1500);
  }
  onDestroy(() => {
    unsub1()
    unsub2()
    unsub3()
  })
</script>
<GLTF
  bind:gltf={$gltf}
  url="the_Xbot.glb"/>

{#if startAudio}
  <PositionalAudio
    src={"shout.mp3"}
    volume={1}
    refDistance={1}
    rolloffFactor={1}
    autoplay
    directionalCone={{
      coneInnerAngle: 90,
      coneOuterAngle: 220,
      coneOuterGain: 0.3
    }}
  />
{/if}