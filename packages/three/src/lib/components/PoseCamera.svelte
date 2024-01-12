<script lang="ts">
    import { onMount } from 'svelte'
    import * as tf from "@tensorflow/tfjs";
    import * as posenet from "@tensorflow-models/posenet";
    import { poseKeypoints } from '$lib/composables/keypoints';
    
    let webCam: HTMLVideoElement
    let canvas: HTMLCanvasElement
    let net: posenet.PoseNet
    let base64: string

    onMount(async (): Promise<void> => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false
            })
            
            webCam.srcObject = stream
            webCam.play()
            if (webCam !== undefined) sendWebcamData()
            // setInterval(() => {
            //     // console.log('webCam', webCam)   
            //     sendWebcamData()
            // }, 500);
        } catch (error) {
            console.error(error, 'Could not get media stream')
        }
    })

    async function runPosenet() {
        net = await posenet.load();
        setInterval(() => {
            detect();
        }, 50);
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

    const edges:any = {
        0: [0,1],
        1: [0,2],
        2: [1,3],
        3: [2,4],
        4: [0,5],
        5: [0,6],
        6: [5,7],
        7: [7,9],
        8: [6,8],
        9: [8,10],
        10: [5,6],
        11: [5,11],
        12: [6,12],
        13: [11,12],
        14: [11,13],
        15: [13,15],
        16: [12,14],
        17: [14,16]
    }

    function drawPose(predictions: posenet.Pose, canvas:any) {
        if(predictions.score > 0){
            const keypoints = predictions.keypoints;
            $poseKeypoints = keypoints
            keypoints.forEach((point)=>{
                const x = point.position.x
                const y = point.position.y
                canvas.beginPath();
                canvas.arc(x, y, 5, 0, 3 * Math.PI);
                canvas.fillStyle = "red";
                canvas.fill();

            })

            for (const edgeIndex in edges) {
                const [startIdx, endIdx] = edges[edgeIndex];
                const startX = keypoints[startIdx].position.x;
                const startY = keypoints[startIdx].position.y;
                const endX = keypoints[endIdx].position.x;
                const endY = keypoints[endIdx].position.y;

                canvas.beginPath();
                canvas.moveTo(startX, startY);
                canvas.lineTo(endX, endY);
                canvas.strokeStyle = "yellow";
                canvas.lineWidth = 2;
                canvas.stroke();
            }
        }
    }

    async function captureWebcam() {
        let canvas = document.getElementById('canvas') as HTMLCanvasElement
            
        canvas.width = webCam.videoWidth
        canvas.height = webCam.videoHeight
        canvas.getContext('2d')?.drawImage(webCam, 0, 0, canvas.width, canvas.height)
        base64 = canvas.toDataURL()
        return base64
    }

    async function sendWebcamData() {
        const data = await captureWebcam()
        // console.log('webCam data: ',data)
        fetch('https://b66d-2001-6a8-2480-6dba-24a5-f42f-8fd7-3a46.ngrok-free.app/webcam', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({data}),
        }).then(res => console.log(res))
    }
    
    runPosenet();
</script>

<div class="absolute overflow-hidden">
    <div class="relative">
        <video  bind:this={webCam} width="420" height="360">
            <track kind="captions" />
        </video>
        <canvas class="absolute top-0 left-0" bind:this={canvas}></canvas>
    </div>
    <canvas id="canvas" class="hidden"></canvas>
</div>