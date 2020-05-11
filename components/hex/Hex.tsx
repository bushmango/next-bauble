import * as React from 'react'
import { useAnimationForever } from '../../lib/useAnimationForever-sidecar'
import { Layout } from '../layout/Layout'
import { Abstract, Published } from '../shared/Abstract'
import { ClientOnly } from '../shared/ClientOnly'
import { ZenLink } from '../shared/ZenLink'
import { rotate2 } from '../geometry-of-circles/geomLib'
import _ from 'lodash'

export const HexFull = () => {
  return (
    <Layout title='Hex'>
      <Abstract>
        Hex Index Grid
        <Published>5/11/2020</Published>
      </Abstract>

      <ZenLink href='/hex-zen' />
      <ClientOnly>
        <Hex />
      </ClientOnly>
    </Layout>
  )
}

let mouseX = 0
let mouseY = 0
const _onMouseMove = (
  evt: React.MouseEvent<any>,
  canvas: HTMLCanvasElement | null,
) => {
  if (!canvas) {
    return
  }
  var rect = canvas.getBoundingClientRect()
  mouseX = evt.clientX - rect.left
  mouseY = evt.clientY - rect.top
}

export const Hex = () => {
  let refCanvas = React.useRef<HTMLCanvasElement>(null)

  let elapsed = useAnimationForever()

  let w = 400
  let h = 400

  React.useEffect(() => {
    loadImage('coffee', '/images/pixabay/coffee-1030971_640.jpg')
    loadImage('compass', '/images/pixabay/compass-5137269_640.jpg')
  })

  React.useEffect(() => {
    if (refCanvas.current) {
      render(refCanvas.current, elapsed, w, h)
    }
  })

  return (
    <div>
      Geometry of Cirlces! {elapsed}
      <div>
        <canvas
          onMouseMove={(evt) => {
            _onMouseMove(evt, refCanvas.current)
          }}
          onMouseEnter={(evt) => {
            _onMouseMove(evt, refCanvas.current)
          }}
          width={'' + w}
          height={'' + h}
          ref={refCanvas}
          style={{ border: 'solid 1px black' }}
        ></canvas>
      </div>
    </div>
  )
}

interface IImage {
  key: string
  src: string
  loaded: boolean
  image: HTMLImageElement
}
const images: { [key: string]: IImage } = {}

const loadImage = (key: string, src: string) => {
  if (!images[key]) {
    let img = new Image() // Create new img element
    images[key] = {
      key,
      src,
      loaded: false,
      image: img,
    }
    img.addEventListener(
      'load',
      () => {
        // execute drawImage statements here
        images[key].image = img
        images[key].loaded = true
      },
      false,
    )
    img.src = src // Set source path
  }
}

export const render = (
  canvas: HTMLCanvasElement,
  elapsedMs: number,
  w: number,
  h: number,
) => {
  let ctx = canvas.getContext('2d')
  if (!ctx) {
    return
  }

  let elapsedS = elapsedMs / 1000

  ctx.fillStyle = 'white'
  ctx.clearRect(0, 0, w, h)
  ctx.fillRect(0, 0, w, h)

  let r = 50

  let hh = hexRadiusToHeight(r) / 2
  let hr = (3 * r) / 2

  // hex(ctx, 50, 50, r)
  // hex(ctx, 50 + hr, 50 + hh, r)
  // hex(ctx, 50 + hr * 2, 50, r)

  if (images['coffee']?.loaded) {
    ctx.drawImage(images['coffee'].image, 50, 50)
  }

  for (let i = 0; i < 5; i++) {
    hexRow(ctx, 50, 50 + i * hh * 2, r, 5)
  }

  if (images['compass']?.loaded) {
    for (let i = 0; i < 3; i++) {
      ctx.save()
      clipHex(ctx, 50, 50 + hh * 2 * i, r)
      ctx.drawImage(images['compass'].image, 0, 0)
      ctx.restore()
    }
  }

  ctx.strokeStyle = 'green'
  ctx.beginPath()
  ctx.ellipse(mouseX, mouseY, 5, 5, 0, 0, turn)
  ctx.closePath()
  ctx.stroke()
}

const turn = 2 * Math.PI
const hexRadiusToHeight = (r: number) => {
  let o = Math.tan(turn / 6) * (r / 2)
  return o * 2
}

const hexRow = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  num: number,
) => {
  let hh = hexRadiusToHeight(r) / 2
  let hr = (3 * r) / 2

  for (let i = 0; i < num; i++) {
    let oy = 0
    if (i % 2 === 1) {
      oy = hh
    }
    hex(ctx, x + hr * i, y + oy, r)
  }
}

const clipHex = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
) => {
  ctx.beginPath()

  let points: Array<[number, number]> = []
  points.push([-r, 0])
  points.push(rotate2(0, 0, -r, 0, turn / 6))
  points.push(rotate2(0, 0, -r, 0, (2 * turn) / 6))
  points.push([r, 0])
  points.push(rotate2(0, 0, -r, 0, (4 * turn) / 6))
  points.push(rotate2(0, 0, -r, 0, (5 * turn) / 6))
  //ctx.translate(x, y)

  _.forEach(points, (c) => {
    ctx.lineTo(c[0] + x, c[1] + y)
  })

  ctx.closePath()
  ctx.clip()
}

const hex = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
) => {
  ctx.strokeStyle = 'blue'
  ctx.beginPath()

  ctx.save()

  let points: Array<[number, number]> = []

  points.push([-r, 0])
  points.push(rotate2(0, 0, -r, 0, turn / 6))
  points.push(rotate2(0, 0, -r, 0, (2 * turn) / 6))
  points.push([r, 0])
  points.push(rotate2(0, 0, -r, 0, (4 * turn) / 6))
  points.push(rotate2(0, 0, -r, 0, (5 * turn) / 6))

  ctx.translate(x, y)

  // ctx.moveTo(0, 0)
  _.forEach(points, (c) => {
    ctx.lineTo(c[0], c[1])
  })

  ctx.closePath()
  ctx.lineWidth = 2
  ctx.stroke()

  ctx.beginPath()
  ctx.ellipse(0, 0, 5, 5, 0, 0, turn)
  ctx.closePath()
  ctx.stroke()

  ctx.restore()
}
