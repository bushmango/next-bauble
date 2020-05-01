import * as React from 'react'
import { Abstract, Published } from './Abstract'
import { ClientOnly } from './ClientOnly'
import { Layout } from './Layout'
import useAnimationForever from '../lib/useAnimationForever'

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

  let totalS = 0
  for (let i = 0; i < data.length; i++) {
    totalS += data[i].duration
  }
  while (elapsedS >= totalS) {
    elapsedS -= totalS
  }

  ctx.clearRect(0, 0, w, h)

  ctx.fillStyle = 'rgb(200, 0, 0)'
  ctx.fillRect(10, 10, 50, 50)

  ctx.fillStyle = 'rgba(0, 0, 200, 0.5)'
  ctx.fillRect(30, 30, 50, 50)

  for (let i = 0; i < data.length; i++) {
    let d = data[i]
    if (elapsedS > d.duration) {
      elapsedS -= d.duration
    } else {
      console.log('rendering', i)
      d.renderer(ctx, elapsedS)
      break
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

let data = [
  {
    duration: 5,
    renderer: (ctx: CanvasRenderingContext2D, es: number) => {
      let e = es / 5
      ctx.beginPath()
      ctx.arc(cx, cy, w / 3, -turn / 4, -turn / 4 + e * turn)
      ctx.lineTo(cx, cy)
      ctx.fill()
    },
  },
  {
    duration: 2,
    renderer: (ctx: CanvasRenderingContext2D, _: number) => {
      ctx.beginPath()
      ctx.arc(cx, cy, w / 3, 0, turn)
      ctx.lineTo(cx, cy)
      ctx.fill()
    },
  },
  {
    duration: 2,
    renderer: (ctx: CanvasRenderingContext2D, es: number) => {
      let e = es / 2
      ctx.beginPath()
      ctx.arc(cx, cy, w / 3, -turn / 4, -turn / 4 + (1 - e) * turn)
      ctx.lineTo(cx, cy)
      ctx.fill()
    },
  },
]
