const path = require('path')
//const fs = require('fs');

const dirIn = './public/images/hexes-in/'
const dirOut = './public/images/hexes-out/'
import fs from 'fs'
import _ from 'lodash'
const { createCanvas, loadImage, Image } = require('canvas')

const allowed = false

const render = (filename: string) => {
  const canvas = createCanvas(100, 100)
  const ctx = canvas.getContext('2d')

  // Write "Awesome!"
  // ctx.font = '30px Impact'
  // ctx.rotate(0.1)
  // ctx.fillText('Awesome!', 50, 100)

  // Draw line under text
  // var text = ctx.measureText('Awesome!')
  // ctx.strokeStyle = 'rgba(0,0,0,0.5)'
  // ctx.beginPath()
  // ctx.lineTo(50, 102)
  // ctx.lineTo(50 + text.width, 102)
  // ctx.stroke()

  const img = new Image()
  img.onload = () => {
    ctx.drawImage(img, 0, 0)
    const out = fs.createWriteStream(dirOut + filename)
    const stream = canvas.createPNGStream()
    stream.pipe(out)
    out.on('finish', () => console.log('The PNG file was created.'))
  }
  img.onerror = (err: any) => {
    throw err
  }
  img.src = dirIn + filename
}

export default (req: any, res: any) => {
  if (!allowed) {
    res.statusCode = 500
    res.end('not allowed')
    return
  }

  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')

  let files = fs.readdirSync(dirIn)
  _.forEach(files, (c) => {
    render(c)
  })

  res.end(
    JSON.stringify({
      name: 'CONVERT',
      dir: __dirname,
      files,
      fruit: process.env.FRUIT,
      buildCode: process.env.BUILD_CODE,
    }),
  )
}
