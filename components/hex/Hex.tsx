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

export const Hex = () => {
  let refCanvas = React.useRef<HTMLCanvasElement>(null)

  let elapsed = useAnimationForever()

  let w = 400
  let h = 400

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
          width={'' + w}
          height={'' + h}
          ref={refCanvas}
          style={{ border: 'solid 1px black' }}
        ></canvas>
      </div>
    </div>
  )
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

  for (let i = 0; i < 5; i++) {
    hexRow(ctx, 50, 50 + i * hh * 2, r, 5)
  }
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
