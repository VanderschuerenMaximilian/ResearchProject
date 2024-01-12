import express from 'express'
import cors from 'cors'
import fs from 'fs'

const app = express()
const port = 3100
app.use(cors())
app.use(express.raw({ type: '*/*', limit: '10mb' }))

let counter = 0

app.get('/', (req, res) => {
  res.send('Welcome to my server!')
})

app.post('/webcam', async (req, res) => {
  const base64Image = req.body.toString().split(';base64,').pop()
  const response = await loadModel(base64Image)
  console.log('cogniflow response', response)
  const buffer = Buffer.from(base64Image, 'base64')
  if (counter < 10) {
      counter++
      fs.writeFileSync(`webcam${counter}.jpg`, buffer)
  }
  webcamImage = buffer
  // console.log(webcamImage)
  res.status(200).send({'technique': response})
})

async function loadModel(base64Code) {
  try {
    const response = await fetch(
      'https://predict.cogniflow.ai/image/object-detection/detect/47804ea1-9044-467d-89f0-f754a59f5371',
      {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          'x-api-key': '48cf32e3-0f46-4cd8-a7e1-5315d115eb4d',
        },
        body: JSON.stringify({
          format: 'base64',
          base64_image: base64Code,
          confidence_threshold: 0,
          normalize_boxes: false,
        }),
      },
    )
    return response.json()
  } catch (e) {
    console.error('error', e)
  }
}

let webcamImage

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
