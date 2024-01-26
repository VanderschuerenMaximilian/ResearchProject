<script lang="ts">
  import { onMount } from 'svelte'
  import { T } from '@threlte/core'
  import { ContactShadows, OrbitControls, AudioListener, Gizmo, PositionalAudio } from '@threlte/extras'
  import * as three from 'three'
  import dojoImg from '$lib/images/dojo_skybox.png'
  import { techniqueButton } from '$lib/composables/state'
  // import Character from './Character.svelte'
  import { volume } from '../composables/audio'
  let startAudio = false
  let volumePercentage = 0
  $: volumePercentage = $volume / 50

  export let techniqueName: string
  let techniqueComponent: any
  const loader = new three.TextureLoader()
  const dojo = loader.load(dojoImg)

  const skybox = new three.BoxGeometry(12, 12, 12)
  skybox.scale(-1, 1, 1)

  onMount(async () => {
    techniqueComponent = await handleName(techniqueName)
  })

  techniqueButton.subscribe(async () => {
    techniqueComponent = await handleName(techniqueName)
    if (techniqueName && techniqueName != 'Stance' && techniqueName != 'Bow') {
      setTimeout(() => {
        startAudio = true
        setTimeout(() => {
          startAudio = false
        }, 2000)
      }, 3500)
    }
  })

  async function handleName(name: string) {
    if (name != 'Bow') {
      if (name) {
        const nameArray = name.split(' ')
        if (nameArray.length > 1) {
          const newName = nameArray[0] + '_' + nameArray[1]
          const component = await handleImport(newName)
          return component
        } else {
          const  component = await handleImport(nameArray[0])
          return component
        }
      } else {
        const component = await handleImport('Stance')
        return component
      }
    }
  }
    
  async function handleImport(name: string) {
    if (name) {
      const component = await import(`./techniques/${name}.svelte`)
      return component.default
    }
  }
</script>

<T.PerspectiveCamera
  makeDefault
  position={[-15, 10, 10]}
  fov={15}
>
<OrbitControls
    enableZoom={true}
    minDistance={5}
    maxDistance={22}
    enableDamping
    dampingFactor={0.1}
    target.y={0.9}
    maxPolarAngle={Math.PI / 2}
  />
  <!-- <OrbitControls
    enableZoom={true}
    enableDamping
    dampingFactor={0.1}
    target.y={0.9}
    maxPolarAngle={Math.PI / 2}
  /> -->
  <AudioListener />
</T.PerspectiveCamera>

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

<T.AxesHelper />

<T.DirectionalLight
  intensity={0.8}
  position.x={5}
  position.y={10}
/>
<T.AmbientLight intensity={0.2} />

<Gizmo 
  horizontalPlacement={'right'}
  paddingX={75}
  paddingY={25}
  xColor={'#ff8a00'}
/>

<ContactShadows
  scale={10}
  blur={2}
  far={2.5}
  opacity={0.7}
/>

<!-- <Character /> -->
<svelte:component this={techniqueComponent} />

<T.Mesh geometry={skybox} material={new three.MeshBasicMaterial({ map: dojo })} position.y={3}/>

<T.Mesh rotation.x={-90 * (Math.PI / 180)}>
  <T.CircleGeometry args={[72, 72]} />
  <T.MeshStandardMaterial color={'#ccb19c'} />
</T.Mesh>