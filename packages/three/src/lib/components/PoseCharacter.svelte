<script lang="ts">
  import { Group } from 'three'
  import { T, forwardEventHandlers } from '@threlte/core'
  import { useGltf, useGltfAnimations } from '@threlte/extras'
    import { poseKeypoints } from '$lib/composables/keypoints'
  import { onMount } from 'svelte'
  export const ref = new Group()
  const confidence = 0.8
  const gltf = useGltf('the_Xbot.glb')
  const component = forwardEventHandlers()
  let Xbot:any

  
  onMount(async () => {
    Xbot = await gltf
    // console.log('gltf', Xbot.nodes.Beta_Surface.skeleton)
  })
  
  $: coordinatesCalc($poseKeypoints)
    // setInterval(() => {
    //   // console.log(-(($poseKeypoints[9].position.x - $poseKeypoints[5].position.x) / ($poseKeypoints[10].position.x - $poseKeypoints[6].position.x)))
    //   // console.log('right shoulder', $poseKeypoints[6].position)
    //   // console.log('right elbow', $poseKeypoints[8].position)

    //   // console.log('right arm from model: ',Xbot.nodes.Beta_Surface.skeleton.bones[34].rotation.y)
    // }, 1000);
    
    async function coordinatesCalc(keypoints:any) {
      // console.log('keypoints', $poseKeypoints) 
      // console.log(Xbot.nodes.Beta_Surface.skeleton)
      if (Xbot?.nodes) {

        // Head
        Xbot.nodes.Beta_Surface.skeleton.bones[5].rotation.y = getYRotation(keypoints[1],keypoints[2],keypoints[0])
        Xbot.nodes.Beta_Surface.skeleton.bones[5].rotation.z = getZRotation(keypoints[1],keypoints[2])
          
          
        // Spine Movement
        // Xbot.nodes.Beta_Surface.skeleton.bones[1].rotation.z = getXRotationSpine({1: keypoints[9], 2: keypoints[5], 3: keypoints[10], 4: keypoints[6]})
        Xbot.nodes.Beta_Surface.skeleton.bones[1].rotation.y = getYRotationSpine({1: keypoints[5], 2: keypoints[6], 3: keypoints[0]})
          
        // Left Forarm Movement
        if(Math.abs(Xbot.nodes.Beta_Surface.skeleton.bones[10].rotation.y) < 0.8) {
          Xbot.nodes.Beta_Surface.skeleton.bones[11].rotation.y = getAngle(keypoints[5],keypoints[7],0,0,-1)
          Xbot.nodes.Beta_Surface.skeleton.bones[11].rotation.z = getAngle(keypoints[7],keypoints[9],0,0,-1)
          Xbot.nodes.Beta_Surface.skeleton.bones[12].rotation.x = 5.53930590285745e-9
        } else {
          Xbot.nodes.Beta_Surface.skeleton.bones[11].rotation.y = getAngle(keypoints[5],keypoints[7],0.5,0,1)
          Xbot.nodes.Beta_Surface.skeleton.bones[11].rotation.z = getAngle(keypoints[7],keypoints[9],0,0,1)
          Xbot.nodes.Beta_Surface.skeleton.bones[12].rotation.x = -10
        }
          
        // // Left Arm Movement
        Xbot.nodes.Beta_Surface.skeleton.bones[10].rotation.y = getAngle(keypoints[5],keypoints[7],0,0,-1)
        Xbot.nodes.Beta_Surface.skeleton.bones[10].rotation.z = getAngle(keypoints[5],keypoints[7],0,0,-1)
          
        // TODO: right arm needs alot of finetuning
        // Right Forarm Movement
        if(Xbot.nodes.Beta_Surface.skeleton.bones[34].rotation.y > -2 && Xbot.nodes.Beta_Surface.skeleton.bones[34].rotation.y < 0.5 ) {
          Xbot.nodes.Beta_Surface.skeleton.bones[35].rotation.y = getAngle(keypoints[6],keypoints[8],0,0,1)
          Xbot.nodes.Beta_Surface.skeleton.bones[35].rotation.z = getAngle(keypoints[8],keypoints[10],-1,0,1.5)
        } else {
          Xbot.nodes.Beta_Surface.skeleton.bones[35].rotation.y = getAngle(keypoints[6],keypoints[8],0,0,-1)
          Xbot.nodes.Beta_Surface.skeleton.bones[35].rotation.z = getAngle(keypoints[8],keypoints[10],0,0,-1)
        }
          
        // Right Arm Movement
        Xbot.nodes.Beta_Surface.skeleton.bones[34].rotation.y = getAngle(keypoints[6],keypoints[8],0,0,-1)
        Xbot.nodes.Beta_Surface.skeleton.bones[34].rotation.z = getAngle(keypoints[6],keypoints[8],0,0,1)
      }
    }
        
    function normalize (min:any, max:any, value:any) {
        return (value - min) / (max - min)* Math.PI
    }

    function getXRotationSpine (keypoints:any) {
      if(keypoints[1]['score'] > confidence && keypoints[2]['score'] > confidence && keypoints[3]['score'] > confidence && keypoints[4]['score'] > confidence){
          let e1 = (keypoints[1]['position']['y'] - keypoints[3]['position']['y'])
          let e2 = (keypoints[2]['position']['y'] - keypoints[4]['position']['y'])
          if (normalize(-80, 80, e2-e1) - Math.PI/2 < 0.8 && normalize(-80, 80, e2-e1) - Math.PI/2 > -0.8) {
            return normalize(-80, 80, e2-e1) - Math.PI/2;
          } else {
            return 0
          }
      }
      return 0
    }

    function getYRotationSpine (keypoints:any) {
      if(keypoints[1]['score'] > confidence && keypoints[2]['score'] > confidence && keypoints[3]['score'] > confidence){
          let e1 = (keypoints[1]['position']['y'] - keypoints[2]['position']['y'])
          // console.log(Math.round((normalize(-50, 50, e1) - Math.PI/2) * 100) /100)
          return Math.round((normalize(-50, 50, e1) - Math.PI/2) * 100) /100;
      }
      return 0
    }

    function getYRotation (p1:any,p2:any,p3:any) {
        if(p1['score'] > confidence && p2['score'] > confidence && p3['score'] > confidence){
            let e1 = Math.abs(p1['position']['x'] - p3['position']['x'])
            let e2 = Math.abs(p2['position']['x'] - p3['position']['x'])
            return normalize(-60, 60, e2-e1) - Math.PI/2;
        }
        return 0
    }

    function getZRotation (p1:any,p2:any) {
        if(p1['score'] > confidence && p2['score'] > confidence){
            let e1 = Math.abs(p1['position']['y'])
            let e2 = Math.abs(p2['position']['y'] )
            return normalize(-40, 40, e2-e1) - Math.PI/2;
        }
        return 0
    }

    function getAngle (p1:any,p2:any,c1:any,c2:any,m:any) {
      if(p1['score'] > confidence && p2['score'] > confidence){
          return (Math.atan2(p2['position']['y'] - p1['position']['y'], p2['position']['x'] - p1['position']['x']) + c1) * m;
      }
      return c2 * m
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
