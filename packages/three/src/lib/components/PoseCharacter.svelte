<!-- <script lang="ts">
    import { GLTF, useGltfAnimations, useGltf } from '@threlte/extras'
    import { poseKeypoints } from '$lib/composables/keypoints'
    import { Group } from 'three'
    let currentActionKey = 'idle'
    const confidence = 0.3
    const { gltf, actions, mixer } = useGltfAnimations()
    // const ref = new Group()
    let Xbot = useGltf('src/lib/models/Xbot.glb')

    $: $actions[currentActionKey]?.play()
    $: coordinatesCalc($poseKeypoints)

    async function coordinatesCalc(keypoints:any) {
        await Xbot.then((res) => {
            console.log('Xbot in calcfunction _y before',res.nodes.mixamorigHead.rotation._y)
            console.log('keypoints in calcfunction',keypoints)
            res.nodes.mixamorigHead.rotation._y = getYRotation(keypoints[1],keypoints[2],keypoints[0])
            res.nodes.mixamorigHead.rotation._z = getZRotation(keypoints[1],keypoints[2])
            console.log('Xbot in calcfunction _y after',res.nodes.mixamorigHead.rotation._y)
        })
    }

//   function getAngle (p1:any,p2:any,c1:any,c2:any,m:any) {
//     if(p1['score'] > confidence && p2['score'] > confidence){
//         return (Math.atan2(p2['position']['y'] - p1['position']['y'], p2['position']['x'] - p1['position']['x']) + c1) * m;
//     }
//     return c2 * m
//   }

    function normalize (min:any, max:any, value:any) {
        return (value - min) / (max - min)* Math.PI
    }

    function getYRotation (p1:any,p2:any,p3:any) {
        if(p1['score'] > confidence && p2['score'] > confidence && p3['score'] > confidence){
            let e1 = Math.abs(p1['position']['x'] - p3['position']['x'])
            let e2 = Math.abs(p2['position']['x'] - p3['position']['x'])
            return normalize(-100, 100, e2-e1) - Math.PI/2;
        }
        return 0
    }

    function getZRotation (p1:any,p2:any) {
        if(p1['score'] > confidence && p2['score'] > confidence){
            let e1 = Math.abs(p1['position']['y'])
            let e2 = Math.abs(p2['position']['y'] )
            return normalize(-80, 80, e2-e1) - Math.PI/2;
        }
        return 0
    }
</script>

<GLTF
  bind:gltf={$gltf}
  url="src/lib/models/Xbot.glb"
/> -->

<script lang="ts">
  import { Group } from 'three'
  import { T, forwardEventHandlers } from '@threlte/core'
  import { useGltf, useGltfAnimations } from '@threlte/extras'
    import { poseKeypoints } from '$lib/composables/keypoints'
  import { onMount } from 'svelte'
  export const ref = new Group()
    const confidence = 0.3
  const gltf = useGltf('src/lib/models/Xbot.glb')
//   export const { actions, mixer } = useGltfAnimations(gltf, ref)
  const component = forwardEventHandlers()
  let Xbot:any

    $: coordinatesCalc($poseKeypoints)

    onMount(async () => {
        console.log(await gltf)
        Xbot = await gltf
    })

    async function coordinatesCalc(keypoints:any) {
        console.log(Xbot)
        // console.log('Xbot in calcfunction _y before',Xbot.nodes.Beta_Surface.skeleton.bones[5].rotation._y)
        // console.log('keypoints in calcfunction',keypoints)
        Xbot.nodes.Beta_Surface.skeleton.bones[5].rotation._y = getYRotation(keypoints[1],keypoints[2],keypoints[0])
        Xbot.nodes.Beta_Surface.skeleton.bones[5].rotation._z = getZRotation(keypoints[1],keypoints[2])
        // console.log('Xbot in calcfunction _y after',Xbot.nodes.Beta_Surface.skeleton.bones[5].rotation._y)
    }

    function normalize (min:any, max:any, value:any) {
        return (value - min) / (max - min)* Math.PI
    }

    function getYRotation (p1:any,p2:any,p3:any) {
        if(p1['score'] > confidence && p2['score'] > confidence && p3['score'] > confidence){
            let e1 = Math.abs(p1['position']['x'] - p3['position']['x'])
            let e2 = Math.abs(p2['position']['x'] - p3['position']['x'])
            return normalize(-100, 100, e2-e1) - Math.PI/2;
        }
        return 0
    }

    function getZRotation (p1:any,p2:any) {
        if(p1['score'] > confidence && p2['score'] > confidence){
            let e1 = Math.abs(p1['position']['y'])
            let e2 = Math.abs(p2['position']['y'] )
            return normalize(-80, 80, e2-e1) - Math.PI/2;
        }
        return 0
    }

</script>

<T is={ref} dispose={false} {...$$restProps} bind:this={$component}>
  {#await gltf}
    <slot name="fallback" />
  {:then Xbot}
    <T.Group name="Scene">
      <T.Group name="Armature" scale={0.01}>
        <T is={Xbot.nodes.mixamorigHips} />
        <T.SkinnedMesh
          name="Beta_Joints"
          geometry={Xbot.nodes.Beta_Joints.geometry}
          material={Xbot.materials.Beta_Joints_MAT}
          skeleton={Xbot.nodes.Beta_Joints.skeleton}
        />
        <T.SkinnedMesh
          name="Beta_Surface"
          geometry={Xbot.nodes.Beta_Surface.geometry}
          material={Xbot.materials['asdf1:Beta_HighLimbsGeoSG2']}
          skeleton={Xbot.nodes.Beta_Surface.skeleton}
        />
      </T.Group>
    </T.Group>
    {:catch error}
    <slot name="error" {error} />
    {/await}
    
    <slot {ref} />
</T>
