import express from 'express'
// import websocket from 'ws'
import cors from 'cors'
import fs from 'fs'
import * as tf from '@tensorflow/tfjs'
import * as posenet from '@tensorflow-models/posenet'

const app = express()
const port = 3000
app.use(cors())
app.use(express.raw({ type: '*/*', limit: '10mb'}))

// const wss = new websocket.Server({ port: 8080 })

app.get('/', (req, res) => {
  res.send('Welcome to my server!')
})

let webcamImage;

app.post('/webcam', (req, res) => {
    const base64Image = req.body.toString().split(';base64,').pop()
    const buffer = Buffer.from(base64Image, 'base64')
    fs.writeFileSync('webcam.jpg', buffer)
    webcamImage = buffer
    // console.log(webcamImage)
    res.status(200).send('OK')
})

app.get('/showImage', (req, res) => {
  if (webcamImage) {
    // Do something with the image data (e.g., send it as a response)
    res.send(webcamImage)
  } else {
    res.status(404).send('Image not available')
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})