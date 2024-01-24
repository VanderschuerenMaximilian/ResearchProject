import express from 'express'
import cors from 'cors'
import fs from 'fs'
import dotenv from 'dotenv'

const app = express()
const port = 3100
app.use(cors())
app.use(express.raw({ type: '*/*', limit: '10mb' }))
dotenv.config()

app.get('/', (req, res) => {
  res.send('Welcome to my server!')
})

app.post('/webcam', async (req, res) => {
  const base64Image = req.body.toString().split(';base64,').pop()
  const response = await loadModel(base64Image)
  console.log('cogniflow response', response)
  const buffer = Buffer.from(base64Image, 'base64')
  fs.writeFileSync(`webcam.jpg`, buffer)
  res.status(200).send({'technique': response})
})

async function loadModel(base64Code) {
  try {
    const response = await fetch(
      'https://predict.cogniflow.ai/image/object-detection/detect/e70700f1-0ac7-4f16-ad63-9df15de31c90',
      {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          'x-api-key': process.env.COGNIFLOW_API_KEY,
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
