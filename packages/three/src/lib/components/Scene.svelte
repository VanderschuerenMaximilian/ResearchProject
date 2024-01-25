<script lang="ts">
  import { T } from '@threlte/core'
  import { ContactShadows, Float, Grid, OrbitControls, AudioListener, Gizmo } from '@threlte/extras'
  import * as three from 'three'
  import dojoImg from '$lib/images/dojo_skybox.png'
  import Character from './Character.svelte'
  import AgeUke from './Age_uke.svelte'
  import GedanBarai from './Gedan_barai.svelte'
  import OiTsuki from './Oi_tsuki.svelte'
  import ShutoUke from './Shuto_uke.svelte'
  import Stance from './Stance.svelte'
  import Tetsui from './Tetsui.svelte'

  const loader = new three.TextureLoader()
  const dojo = loader.load(dojoImg)

  const skybox = new three.BoxGeometry(12, 12, 12)
  skybox.scale(-1, 1, 1)
</script>

<T.PerspectiveCamera
  makeDefault
  position={[-15, 10, 10]}
  fov={22}
>
<OrbitControls
    enableZoom={true}
    minDistance={5}
    maxDistance={25}
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
<Stance />
<!-- <AgeUke /> -->
<!-- <GedanBarai /> -->
<!-- <OiTsuki /> -->
<!-- <ShutoUke /> -->
<!-- <Tetsui /> -->
<!-- <Character /> -->
<!-- <svelte:component this={Stance} /> -->

<T.Mesh geometry={skybox} material={new three.MeshBasicMaterial({ map: dojo })} position.y={3}/>

<T.Mesh rotation.x={-90 * (Math.PI / 180)}>
  <T.CircleGeometry args={[72, 72]} />
  <T.MeshStandardMaterial color={'#ccb19c'} />
</T.Mesh>