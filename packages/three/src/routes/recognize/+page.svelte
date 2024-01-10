<script lang="ts">
    import { onMount } from 'svelte'
    
    let videoElement: HTMLVideoElement
    let base64: string

    onMount(async (): Promise<void> => {
        try {
            // getKarateModel()
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false
            })
            
            videoElement.srcObject = stream
            videoElement.play()
        } catch (error) {
            console.error(error, 'Could not get media stream')
        }
    })

    function captureImage () {
        let canvas = document.getElementById('canvas') as HTMLCanvasElement

        canvas.width = videoElement.videoWidth
        canvas.height = videoElement.videoHeight
        canvas.getContext('2d')?.drawImage(videoElement, 0, 0, canvas.width, canvas.height)
        base64 = canvas.toDataURL()
        getKarateModel(base64)
    }

    const apiKey = "48cf32e3-0f46-4cd8-a7e1-5315d115eb4d"

    async function getKarateModel (base64Image: string) {
        const model = await fetch('https://predict.cogniflow.ai/image/object-detection/detect/47804ea1-9044-467d-89f0-f754a59f5371', {
              method: 'POST',
              headers: {
                  accept: 'application/json',
                  'Content-Type': 'application/json',
                  'x-api-key': apiKey,
              },
              body: JSON.stringify({ "format": "jpeg", "base64_image": base64Image, "confidence_threshold": 0, "normalize_boxes": false }),
          });

        console.log(model)
    }
</script>

<div class="w-full min-h-screen flex flex-col justify-center items-center pt-40">
    <video bind:this={videoElement} width="600" height="480">
        <track kind="captions" />
    </video>
    <button on:click={captureImage} class="mt-6 bg-red-500 hover:bg-red-600 p-4 rounded-md text-slate-50">take a picture</button>
    <canvas id="canvas" class="hidden"></canvas>
</div>