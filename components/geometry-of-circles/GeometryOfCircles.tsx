import * as React from 'react'
import { Abstract, Published } from '../Abstract'
import { ClientOnly } from '../ClientOnly'
import { Layout } from '../Layout'
import useAnimationForever from '../../lib/useAnimationForever'

import { rotate, rotate2 } from './geomLib'

export const GeometryOfCirclesFull = () => {
  return (
    <Layout title='Geometry of Circles'>
      <Abstract>
        Geometry of Circles example
        <Published>-</Published>
      </Abstract>

      <ClientOnly>
        <GeometryOfCircles />
      </ClientOnly>
    </Layout>
  )
}

export const GeometryOfCircles = () => {
  let refCanvas = React.useRef<HTMLCanvasElement>(null)

  let elapsed = useAnimationForever()

  React.useEffect(() => {
    if (refCanvas.current) {
      render(refCanvas.current, elapsed)
    }
  })

  return (
    <div>
      Geometry of Cirlces! {elapsed}
      <div>
        <canvas
          width='200'
          height='200'
          ref={refCanvas}
          style={{ border: 'solid 1px black' }}
        ></canvas>
      </div>
    </div>
  )
}

export const render = (canvas: HTMLCanvasElement, elapsedMs: number) => {
  let ctx = canvas.getContext('2d')
  if (!ctx) {
    return
  }

  let elapsedS = elapsedMs / 1000

  ctx.clearRect(0, 0, w, h)

  // ctx.fillStyle = 'rgb(200, 0, 0)'
  // ctx.fillRect(10, 10, 50, 50)

  ctx.fillStyle = 'rgba(0, 0, 200, 0.5)'
  // ctx.fillRect(30, 30, 50, 50)

  let totalS = 0
  for (let i = 0; i < data.length; i++) {
    totalS += data[i].duration
  }

  let focusData: IData | null = null
  for (let i = 0; i < data.length; i++) {
    let d = data[i]
    if (d.focus) {
      // d.renderer(ctx, elapsedS)
      totalS = d.duration
      focusData = d
      break
    }
  }

  while (elapsedS >= totalS) {
    elapsedS -= totalS
  }

  if (focusData) {
    focusData.renderer(ctx, elapsedS, elapsedS / focusData.duration)
  } else {
    for (let i = 0; i < data.length; i++) {
      let d = data[i]
      if (elapsedS > d.duration) {
        elapsedS -= d.duration
      } else {
        d.renderer(ctx, elapsedS, elapsedS / d.duration)
        break
      }
    }
  }
}

// for 5 seconds
// arc 0-1t
// line from center to left

let w = 200
let h = 200
let cx = w / 2
let cy = h / 2

let turn = Math.PI * 2
let circleR = w / 3

let circlePoints6: Array<[number, number]> = []
for (let i = 0; i < 6; i++) {
  let px = 0
  let py = -circleR
  let np = rotate(cx, cy, px, py, -(i / 6) * turn)
  circlePoints6.push(np)
}

interface IData {
  duration: number
  renderer: (ctx: CanvasRenderingContext2D, es: number, e: number) => void
  focus?: boolean
}

let data: IData[] = [
  {
    duration: 5,
    renderer: (ctx: CanvasRenderingContext2D, es: number, e: number) => {
      ctx.beginPath()
      ctx.arc(cx, cy, circleR, -turn / 4, -turn / 4 + e * turn)
      ctx.lineTo(cx, cy)
      ctx.fill()
    },
  },
  {
    duration: 2,
    renderer: (ctx: CanvasRenderingContext2D, es: number, e: number) => {
      ctx.beginPath()
      ctx.arc(cx, cy, circleR, 0, turn)
      ctx.lineTo(cx, cy)
      ctx.fill()

      ctx.beginPath()
      ctx.moveTo(cx, cy - circleR)

      let [nx, ny] = rotate(cx, cy - circleR, 0, circleR, (-e * turn) / 6)

      ctx.lineTo(nx, ny)
      ctx.stroke()
    },
  },
  {
    duration: 2,
    renderer: (ctx: CanvasRenderingContext2D, es: number, e: number) => {
      ctx.beginPath()
      ctx.arc(cx, cy, circleR, 0, turn)
      ctx.lineTo(cx, cy)
      ctx.fill()

      ctx.beginPath()

      let sp = circlePoints6[0]
      // ctx.moveTo(cx, cy - circleR)
      ctx.moveTo(sp[0], sp[1])

      let [nx, ny] = rotate(
        cx,
        cy - circleR,
        0,
        circleR,
        (e * turn) / 3 - turn / 6,
      )

      ctx.lineTo(nx, ny)
      ctx.stroke()

      ctx.beginPath()
      // ctx.moveTo(cx, cy - circleR)
      let arcStart = (5 / 12) * turn
      ctx.arc(
        sp[0],
        sp[1],
        circleR,
        arcStart,
        arcStart + (-e * 4 * turn) / 12,
        true,
      )
      ctx.stroke()
    },
  },
  {
    duration: 2,
    renderer: (ctx: CanvasRenderingContext2D, es: number, e: number) => {
      mainCircleDraw(ctx)
      arcDrawPart(ctx, 1, 0)
      arcDrawPart(ctx, e, 1)
    },
  },
  {
    duration: 2,
    renderer: (ctx: CanvasRenderingContext2D, es: number, e: number) => {
      mainCircleDraw(ctx)
      arcDrawPart(ctx, 1, 0)
      arcDrawPart(ctx, 1, 1)
      arcDrawPart(ctx, e, 2)
    },
  },
  {
    duration: 2,
    renderer: (ctx: CanvasRenderingContext2D, es: number, e: number) => {
      mainCircleDraw(ctx)
      arcDrawPart(ctx, 1, 0)
      arcDrawPart(ctx, 1, 1)
      arcDrawPart(ctx, 1, 2)
      arcDrawPart(ctx, e, 3)
    },
  },
  {
    duration: 2,
    renderer: (ctx: CanvasRenderingContext2D, es: number, e: number) => {
      mainCircleDraw(ctx)
      arcDrawPart(ctx, 1, 0)
      arcDrawPart(ctx, 1, 1)
      arcDrawPart(ctx, 1, 2)
      arcDrawPart(ctx, 1, 3)
      arcDrawPart(ctx, e, 4)
    },
  },
  {
    duration: 2,
    renderer: (ctx: CanvasRenderingContext2D, es: number, e: number) => {
      mainCircleDraw(ctx)
      arcDrawPart(ctx, 1, 0)
      arcDrawPart(ctx, 1, 1)
      arcDrawPart(ctx, 1, 2)
      arcDrawPart(ctx, 1, 3)
      arcDrawPart(ctx, 1, 4)
      arcDrawPart(ctx, e, 5)
    },
  },
  {
    duration: 2,
    renderer: (ctx: CanvasRenderingContext2D, es: number, e: number) => {
      ctx.beginPath()
      ctx.arc(cx, cy, circleR, -turn / 4, -turn / 4 + (1 - e) * turn)
      ctx.lineTo(cx, cy)
      ctx.fill()
    },
  },
]

function mainCircleDraw(ctx: CanvasRenderingContext2D) {
  ctx.beginPath()
  ctx.arc(cx, cy, circleR, 0, turn)
  ctx.lineTo(cx, cy)
  ctx.fill()
}

function arcDrawPart(ctx: CanvasRenderingContext2D, e: number, idx: number) {
  let sp = circlePoints6[idx]
  if (e < 1) {
    ctx.beginPath()
    ctx.moveTo(sp[0], sp[1])
    let [nx, ny] = rotate2(sp[0], sp[1], cx, cy, turn / 6 - (e * turn) / 3)
    ctx.lineTo(nx, ny)
    ctx.stroke()
  }

  ctx.beginPath()
  // ctx.moveTo(cx, cy - circleR)
  let arcStart = ((5 + idx * 2) / 12) * turn
  ctx.arc(sp[0], sp[1], circleR, arcStart, arcStart - (e * 4 * turn) / 12, true)
  ctx.stroke()
}
