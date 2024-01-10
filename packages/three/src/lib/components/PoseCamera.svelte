<script lang="ts">
    import { onMount } from 'svelte'
    import * as tf from "@tensorflow/tfjs";
    import * as posenet from "@tensorflow-models/posenet";
    import { poseKeypoints } from '$lib/composables/keypoints';
    
    let webCam: HTMLVideoElement
    let canvas: HTMLCanvasElement
    let net: posenet.PoseNet

    onMount(async (): Promise<void> => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false
            })
            
            webCam.srcObject = stream
            webCam.play()
        } catch (error) {
            console.error(error, 'Could not get media stream')
        }
    })

    async function runPosenet() {
        net = await posenet.load();
        setInterval(() => {
            detect();
        }, 100);
    }

    async function detect() {
        if (typeof webCam !== "undefined" && webCam !== null) {
            const pose = await net.estimateSinglePose(webCam, {
                flipHorizontal: false
            });
            canvas.width = 420;
            canvas.height = 360;

            drawPose(pose, canvas.getContext("2d"));
        }
    }

    function drawPose(predictions: posenet.Pose, canvas:any) {
        if(predictions.score > 0){
            const keypoints = predictions.keypoints;
            // console.log(keypoints)
            $poseKeypoints = keypoints
            keypoints.forEach((point)=>{
                const x = point.position.x
                const y = point.position.y
                canvas.beginPath();
                canvas.arc(x, y, 5, 0, 3 * Math.PI);
                canvas.fillStyle = "red";
                canvas.fill();
            })
        }
    }

    runPosenet();
</script>

<div class="absolute">
    <div class="relative">
        <video  bind:this={webCam} width="420" height="360"/>
        <canvas class="absolute top-0 left-0" bind:this={canvas}></canvas>
    </div>
</div>