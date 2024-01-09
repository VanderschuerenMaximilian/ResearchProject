<script lang="ts">
  import { T } from '@threlte/core'
  import { ContactShadows, Float, Grid, OrbitControls } from '@threlte/extras'
  import Character from './Character.svelte'
  import * as three from 'three'
  import dojoImg from '$lib/images/dojo_skybox.png'
  import testSkybox from '$lib/images/test_skybox.jpg'

  const loader = new three.TextureLoader()
  const dojo = loader.load(dojoImg)

  const skybox = new three.BoxGeometry(12, 12, 12)
  skybox.scale(-1, 1, 1)
</script>

<T.PerspectiveCamera
  makeDefault
  position={[-10, 10, 10]}
  fov={15}
>
  <OrbitControls
    enableZoom={true}
    maxDistance={20}
    minDistance={5}
    enableDamping
    dampingFactor={0.1}
    target.y={0.9}
    maxPolarAngle={Math.PI / 2}
  />
</T.PerspectiveCamera>

<T.DirectionalLight
  intensity={0.8}
  position.x={5}
  position.y={10}
/>
<T.AmbientLight intensity={0.2} />

<ContactShadows
  scale={10}
  blur={2}
  far={2.5}
  opacity={0.7}
/>

<Character />

<T.Mesh geometry={skybox} material={new three.MeshBasicMaterial({ map: dojo })} />

<T.Mesh rotation.x={-90 * (Math.PI / 180)}>
  <T.CircleGeometry args={[72, 72]} />
  <T.MeshStandardMaterial color={'#ccb19c'} />
</T.Mesh>