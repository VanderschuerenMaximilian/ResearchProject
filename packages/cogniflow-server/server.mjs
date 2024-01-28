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
      'https://predict.cogniflow.ai/image/object-detection/detect/4dff4702-09f6-41e6-8c20-83f24ac39f3b',
      {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          'x-api-key': 'f3e50704-3401-400d-a394-654f8c743cc0',
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
