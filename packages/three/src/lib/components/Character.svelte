<script lang="ts">
  import { onDestroy } from 'svelte'
  import { GLTF, useGltfAnimations, PositionalAudio } from '@threlte/extras'
  import { buttonIdle, buttonWalk, buttonRun } from '../composables/state'
  import { volume } from '../composables/audio'
  let startAudio = false
  let volumePercentage = 0
  $: volumePercentage = $volume / 50
  let currentActionKey = 'idle'
  const { gltf, actions } = useGltfAnimations()
  const unsub1 = buttonIdle.subscribe(() => {
    transitionTo('idle', 0.3)
  })
  const unsub2 = buttonWalk.subscribe(() => {
      transitionTo('walk', 0.3)
      setTimeout(() => {
        transitionTo('idle', 0.3)
      }, 1500);
  })
  const unsub3 = buttonRun.subscribe(() => {
    transitionTo('run', 0.3)
    setTimeout(() => {
      transitionTo('idle', 0.3)
    }, 1500);
  })
  function transitionTo(nextActionKey: string, duration = 1) {
    const currentAction = $actions[currentActionKey]
    const nextAction = $actions[nextActionKey]
    if (!nextAction || currentAction === nextAction) return
    // Function inspired by: https://github.com/mrdoob/three.js/blob/master/examples/webgl_animation_skinning_blending.html
    nextAction.enabled = true
    if (currentAction) {
      currentAction.crossFadeTo(nextAction, duration, true)
    }
    // Not sure why I need this but the source code does not
    nextAction.play()
    if (nextActionKey != 'idle') startAudio = true
    currentActionKey = nextActionKey
    setTimeout(() => {
      if (currentActionKey == 'idle') startAudio = false  
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
    volume={volumePercentage}
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