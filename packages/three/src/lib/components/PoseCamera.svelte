<script lang="ts">
    import { onMount } from 'svelte'
    import * as tf from "@tensorflow/tfjs";
    import * as posenet from "@tensorflow-models/posenet";
    import { poseKeypoints } from '$lib/composables/keypoints';
    import { ChevronLeft } from 'lucide-svelte'
    import { startButton } from '$lib/composables/state';
    import { techniqueRecognition } from '$lib/composables/recognition';
    
    let webCam: HTMLVideoElement
    let canvas: HTMLCanvasElement
    let net: posenet.PoseNet
    let base64: string
    let showCamera: boolean = true
    let intervalId: number

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
        // explanation: the better model but has some sort of memory leak
        // ---------------------------------------
        // net = await posenet.load({
        //     architecture: "ResNet50",
        //     outputStride: 16,
        //     inputResolution: { width: 300, height: 257 },
        //     multiplier: 1,
        //     quantBytes: 1
        // });

        net = await posenet.load({
            architecture: "MobileNetV1",
            outputStride: 16,
            inputResolution: { width: 360, height: 360 },
            multiplier: 0.75,
        });
        setInterval(() => {
            detect();
        }, 100);
    }

    async function detect() {
        if (typeof webCam !== "undefined" && webCam !== null && net !== undefined) {
            const pose = await net.estimateSinglePose(webCam, {
                flipHorizontal: false
            });
            canvas.width = 360;
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
        const response = await fetch('https://81df-2001-6a8-2480-6dba-f1fb-5074-88a8-910c.ngrok-free.app/webcam', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({data}),
        })

        $techniqueRecognition = await response.json()
    }
    
    startButton.subscribe(async (value) => {
        if (value) {
            tf.engine().startScope()
            runPosenet()
            // intervalId = setInterval(() => {
            //     sendWebcamData()
            // }, 5000);
        }
        else if(!value && net) {
            // clearInterval(intervalId)
            tf.dispose(net)
            net = undefined
            canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height)
            tf.disposeVariables()
            tf.engine().endScope()
            tf.engine().reset()
        }
    })
</script>

<div class="absolute bottom-0 left-0">
    {#if webCam?.srcObject}
        <button
        on:click={() => {showCamera = !showCamera}}
        class={`z-50 top-1/2 -right-5 absolute bg-gray-800 hover:bg-gray-700 text-white py-1 rounded-lg transform transition-all duration-200 ${showCamera ? 'translate-x-0' : '-translate-x-[350px]'}
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800`}
        >
        <ChevronLeft size="36" 
        style="transform: rotate({showCamera ? '180deg' : '0deg'}); transition: transform 200ms ease-in-out;"
        />
        </button>
    {/if}
    <div class="relative rounded-tr-xl opacity-50 overflow-hidden transition-all duration-200"
    style:transform="translateX({showCamera ? '0' : '-100%'})"
    >
        <video  bind:this={webCam} width="360" height="360">
            <track kind="captions" />
        </video>
        <canvas class={`absolute top-0 left-0`} bind:this={canvas}></canvas>
    </div>
    <canvas id="canvas" class="hidden"></canvas>
</div>