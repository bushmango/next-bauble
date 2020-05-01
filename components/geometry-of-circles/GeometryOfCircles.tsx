import * as React from 'react'
import { Abstract, Published } from '../Abstract'
import { ClientOnly } from '../ClientOnly'
import { Layout } from '../Layout'
import useAnimationForever from '../../lib/useAnimationForever'

import { rotate, rotate2 } from './geomLib'
import { SeeLink } from '../SeeLink'

export const GeometryOfCirclesFull = () => {
  return (
    <Layout title='Geometry of Circles'>
      <Abstract>
        Geometry of Circles based on a 1979 Sesame Street segment with music by
        Philip Glass.
        <SeeLink href='https://www.youtube.com/watch?v=19hRQfZdTr4' />
        <Published>Started 4/29/2020</Published>
        <Published>5/1/2020 (work in progress)</Published>
      </Abstract>

      <ClientOnly>
        <GeometryOfCircles />
      </ClientOnly>
    </Layout>
  )
}

let w = 800
let h = 800
let cx = w / 2
let cy = h / 2

let turn = Math.PI * 2
let circleR = w / 3

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
          width={'' + w}
          height={'' + h}
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

  //ctx.fillStyle = 'rgba(0, 0, 200, 0.5)'
  ctx.fillStyle = 'black'
  ctx.clearRect(0, 0, w, h)
  ctx.fillRect(0, 0, w, h)

  // ctx.fillStyle = 'rgb(200, 0, 0)'
  // ctx.fillRect(10, 10, 50, 50)

  // ctx.fillRect(30, 30, 50, 50)

  let totalS = 0
  for (let i = 0; i < data.length; i++) {
    totalS += data[i].duration
  }

  let focusData: IData | null = null
  let hasStart = false
  let startIndex = 0
  for (let i = 0; i < data.length; i++) {
    let d = data[i]
    if (d.end) {
      break
    }
    if (hasStart) {
      totalS += d.duration
    }
    if (d.start) {
      // d.renderer(ctx, elapsedS)
      totalS = d.duration
      startIndex = i
      hasStart = true
    }

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

  ctx.lineWidth = 3 //1.5

  if (focusData) {
    ctx.save()
    focusData.renderer(ctx, elapsedS, elapsedS / focusData.duration)
    ctx.restore()
  } else {
    for (let i = startIndex; i < data.length; i++) {
      let d = data[i]
      if (elapsedS > d.duration) {
        elapsedS -= d.duration
      } else {
        ctx.save()
        d.renderer(ctx, elapsedS, elapsedS / d.duration)
        ctx.restore()
        break
      }
    }
  }
}

// for 5 seconds
// arc 0-1t
// line from center to left

let circleColors6 = [
  '#840300',
  '#C79100',
  '#E6E11F',
  '#276413',
  '#487BD8',
  '#55396C',
]

let circleBgColor = '#D8E0DD'

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
  start?: boolean
  end?: boolean
}

let data: IData[] = [
  {
    duration: 5,
    renderer: (ctx: CanvasRenderingContext2D, es: number, e: number) => {
      mainCircleDraw(ctx, e)
    },
  },
  {
    duration: 2,
    renderer: (ctx: CanvasRenderingContext2D, es: number, e: number) => {
      mainCircleDraw(ctx)

      ctx.beginPath()
      ctx.moveTo(cx, cy - circleR)

      let [nx, ny] = rotate(cx, cy - circleR, 0, circleR, (-e * turn) / 6)

      ctx.lineTo(nx, ny)
      ctx.stroke()
    },
  },
  {
    duration: 1,
    renderer: (ctx: CanvasRenderingContext2D, es: number, e: number) => {
      mainCircleDraw(ctx)

      ctx.beginPath()
      ctx.moveTo(cx, cy - circleR)

      let [nx, ny] = rotate(cx, cy - circleR, 0, circleR, (-1 * turn) / 6)

      ctx.lineTo(nx, ny)
      ctx.stroke()
    },
  },
  {
    duration: 2,
    renderer: (ctx: CanvasRenderingContext2D, es: number, e: number) => {
      firstArcPass(ctx, e, 0)
    },
  },
  {
    duration: 2,
    renderer: (ctx: CanvasRenderingContext2D, es: number, e: number) => {
      firstArcPass(ctx, e, 1)
    },
  },
  {
    duration: 2,
    renderer: (ctx: CanvasRenderingContext2D, es: number, e: number) => {
      firstArcPass(ctx, e, 2)
    },
  },
  {
    duration: 2,
    renderer: (ctx: CanvasRenderingContext2D, es: number, e: number) => {
      firstArcPass(ctx, e, 3)
    },
  },
  {
    duration: 2,

    renderer: (ctx: CanvasRenderingContext2D, es: number, e: number) => {
      firstArcPass(ctx, e, 4)
    },
  },
  {
    duration: 2,

    renderer: (ctx: CanvasRenderingContext2D, es: number, e: number) => {
      firstArcPass(ctx, e, 5)
    },
  },
  {
    duration: 2,

    renderer: (ctx: CanvasRenderingContext2D, es: number, e: number) => {
      secondArcPass(ctx, e, 0)
    },
  },
  {
    duration: 2,
    renderer: (ctx: CanvasRenderingContext2D, es: number, e: number) => {
      secondArcPass(ctx, e, 1)
    },
  },
  {
    duration: 2,
    renderer: (ctx: CanvasRenderingContext2D, es: number, e: number) => {
      secondArcPass(ctx, e, 2)
    },
  },
  {
    duration: 2,
    renderer: (ctx: CanvasRenderingContext2D, es: number, e: number) => {
      secondArcPass(ctx, e, 3)
    },
  },
  {
    duration: 2,
    renderer: (ctx: CanvasRenderingContext2D, es: number, e: number) => {
      secondArcPass(ctx, e, 4)
    },
  },
  {
    duration: 2,

    renderer: (ctx: CanvasRenderingContext2D, es: number, e: number) => {
      secondArcPass(ctx, e, 5)
    },
  },
  {
    duration: (2.5 / 4) * 10,
    renderer: (ctx: CanvasRenderingContext2D, es: number, e: number) => {
      ctx.translate(cx, cy)
      ctx.rotate(e * turn * 2.5)
      ctx.translate(-cx, -cy)
      secondArcPass(ctx, 1, 6)
    },
  },
  {
    duration: (1.5 / 4) * 10,

    renderer: (ctx: CanvasRenderingContext2D, es: number, e: number) => {
      ctx.translate(cx, cy)
      ctx.rotate(e * turn * 1.5 + turn * 2.5)
      ctx.translate(-cx, -cy)

      scaleToHalf(ctx, e)

      secondArcPass(ctx, 1, 6)
    },
  },
  {
    duration: 5,
    renderer: (ctx: CanvasRenderingContext2D, es: number, e: number) => {
      scaleToHalf(ctx, 1)
      secondArcPass(ctx, 1, 6)
    },
  },
  {
    duration: 2,

    renderer: (ctx: CanvasRenderingContext2D, es: number, e: number) => {
      circleSplitPass(ctx, e, 0)
    },
  },
  {
    duration: 2,
    renderer: (ctx: CanvasRenderingContext2D, es: number, e: number) => {
      circleSplitPass(ctx, e, 1)
    },
  },
  {
    duration: 2,
    renderer: (ctx: CanvasRenderingContext2D, es: number, e: number) => {
      circleSplitPass(ctx, e, 2)
    },
  },
  {
    duration: 2,
    renderer: (ctx: CanvasRenderingContext2D, es: number, e: number) => {
      circleSplitPass(ctx, e, 3)
    },
  },
  {
    duration: 2,
    renderer: (ctx: CanvasRenderingContext2D, es: number, e: number) => {
      circleSplitPass(ctx, e, 4)
    },
  },
  {
    duration: 2,
    renderer: (ctx: CanvasRenderingContext2D, es: number, e: number) => {
      circleSplitPass(ctx, e, 5)
    },
  },
  {
    duration: 2,
    renderer: (ctx: CanvasRenderingContext2D, es: number, e: number) => {
      circleSplitPass(ctx, e, 6)
    },
  },
  {
    duration: 2,
    renderer: (ctx: CanvasRenderingContext2D, es: number, e: number) => {
      circleLinePass(ctx, e, 0)
    },
  },
  {
    duration: 2,
    renderer: (ctx: CanvasRenderingContext2D, es: number, e: number) => {
      circleLinePass(ctx, e, 1)
    },
  },
  {
    duration: 2,
    renderer: (ctx: CanvasRenderingContext2D, es: number, e: number) => {
      circleLinePass(ctx, e, 2)
    },
  },
  {
    duration: 2,
    renderer: (ctx: CanvasRenderingContext2D, es: number, e: number) => {
      circleLinePass(ctx, e, 3)
    },
  },
  {
    duration: 2,
    renderer: (ctx: CanvasRenderingContext2D, es: number, e: number) => {
      circleLinePass(ctx, e, 4)
    },
  },
  {
    duration: 2,
    renderer: (ctx: CanvasRenderingContext2D, es: number, e: number) => {
      circleLinePass(ctx, e, 5)
    },
  },
  {
    duration: 2,
    renderer: (ctx: CanvasRenderingContext2D, es: number, e: number) => {
      circleLinePass(ctx, e, 6)
    },
  },

  {
    duration: 2,
    renderer: (ctx: CanvasRenderingContext2D, es: number, e: number) => {
      circleLinePass(ctx, e, 6, e * turn * 1)
    },
  },

  {
    duration: 4,
    renderer: (ctx: CanvasRenderingContext2D, es: number, e: number) => {
      circleLinePass(ctx, e, 6, e * turn * 2, e * turn * 1)
    },
  },

  {
    duration: 2,
    renderer: (ctx: CanvasRenderingContext2D, es: number, e: number) => {
      circleLinePass(ctx, e, 6, 1 * turn * 2, 1 * turn * 1)
    },
  },

  {
    duration: 2,
    renderer: (ctx: CanvasRenderingContext2D, es: number, e: number) => {
      scaleToHalf(ctx, 1)
      mainCircleDraw(ctx, 1 - e)
    },
  },
]

const circleLinePass = (
  ctx: CanvasRenderingContext2D,
  e: number,
  idx: number,
  middleRotation: number = 0,
  outerRotation: number = 0,
) => {
  scaleToHalf(ctx, 1)

  for (let i = 0; i < 6; i++) {
    ctx.fillStyle = circleColors6[i]
    ctx.beginPath()
    let ie = 1
    let [nx, ny] = rotate2(
      cx,
      cy,
      cx,
      cy - circleR * ie * 2,
      (i * turn) / 6 + outerRotation,
    )
    ctx.arc(nx, ny, circleR, 0, turn)
    ctx.fill()
    ctx.stroke()
  }
  mainCircleDraw(ctx)

  if (middleRotation) {
    ctx.save()
    ctx.translate(cx, cy)
    ctx.rotate(middleRotation)
    ctx.translate(-cx, -cy)
  }
  secondArcPass(ctx, 1, 6)
  if (middleRotation) {
    ctx.restore()
  }
  let points = [[cx, cy], ...circlePoints6]

  let lines: Array<[number, number]> = []

  const drawLine = (pair: [number, number], lerpV: number) => {
    let p1 = points[pair[0]]
    let p2 = points[pair[1]]
    ctx.moveTo(p1[0], p1[1])
    ctx.lineTo(
      p1[0] * (1 - lerpV) + p2[0] * lerpV,
      p1[1] * (1 - lerpV) + p2[1] * lerpV,
    )
  }

  for (let iCircle = 0; iCircle < 6 && iCircle <= idx; iCircle++) {
    if (iCircle === 0) {
      lines = [
        [6, 1],
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 5],
        [5, 6],
      ]
    }

    if (iCircle === 1) {
      lines = [
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
        [0, 5],
        [0, 6],
      ]
    }

    if (iCircle === 2) {
      lines = [
        [6, 1],
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 5],
        [5, 6],
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
        [0, 5],
        [0, 6],
      ]
    }

    if (iCircle === 3) {
      lines = [
        [6, 2],
        [5, 3],
        [6, 5],
        [2, 3],
        [3, 4],
        [4, 5],
        [6, 1],
        [1, 2],
      ]
    }

    if (iCircle === 4) {
      lines = [
        [1, 4],
        [1, 5],
        [1, 3],
        [5, 3],
        [2, 0],
        [0, 3],
        [5, 0],
        [0, 6],
      ]
    }

    if (iCircle === 5) {
      lines = [
        [6, 2],
        [5, 3],
        [6, 5],
        [2, 3],

        [1, 0],
        [4, 0],

        [2, 0],
        [3, 0],
        [5, 0],
        [6, 0],

        [6, 1],
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 5],
        [5, 6],
      ]
    }

    let [nx, ny] = rotate2(
      cx,
      cy,
      cx,
      cy - circleR * 2,
      (2 * iCircle * turn) / 12 + outerRotation,
    )
    nx = nx - cx
    ny = ny - cy
    ctx.translate(nx, ny)
    for (let i = 0; i < lines.length; i++) {
      let eTest = i / lines.length
      if (eTest > e && idx === iCircle) {
        break
      }

      let lerpV = 1
      let eTest2 = (i + 1) / lines.length
      if (eTest2 > e && idx === iCircle) {
        lerpV = (e - eTest) * lines.length
      }

      let l = lines[i]
      ctx.beginPath()
      drawLine(l, lerpV)
      ctx.stroke()
    }
    ctx.translate(-nx, -ny)
  }
}

const circleSplitPass = (
  ctx: CanvasRenderingContext2D,
  e: number,
  idx: number,
) => {
  scaleToHalf(ctx, 1)

  for (let i = 0; i <= idx && i < 6; i++) {
    ctx.fillStyle = circleColors6[i]
    ctx.beginPath()

    let ie = idx === i ? e : 1
    let [nx, ny] = rotate2(cx, cy, cx, cy - circleR * ie * 2, (i * turn) / 6)

    ctx.arc(nx, ny, circleR, 0, turn)
    ctx.fill()
    ctx.stroke()
  }
  mainCircleDraw(ctx)
  secondArcPass(ctx, 1, 6)

  if (idx < 6) {
    ctx.fillStyle = 'black'
    // ctx.strokeStyle = 'red'
    ctx.lineWidth = 4
    ctx.beginPath()
    // let p0 = circlePoints6[0]
    let p1 = circlePoints6[mod(5 + idx, 6)]
    let p2 = circlePoints6[mod(1 + idx, 6)]
    // ctx.moveTo(p0[0], p0[1])
    let arcStart = (-1 / 12) * turn + ((idx * 2) / 12) * turn
    ctx.arc(p1[0], p1[1], circleR, arcStart, arcStart + (2 / 12) * turn)
    arcStart = (5 / 12) * turn + ((idx * 2) / 12) * turn
    ctx.arc(p2[0], p2[1], circleR, arcStart, arcStart + (2 / 12) * turn)
    ctx.fill()
    ctx.clip()

    // ctx.stroke()

    ctx.fillStyle = circleColors6[idx]
    ctx.beginPath()

    let [nx, ny] = rotate2(cx, cy, cx, cy - circleR * e * 2, (idx * turn) / 6)

    ctx.arc(nx, ny, circleR, 0, turn)
    ctx.fill()
    ctx.stroke()
  }
}

const scaleToHalf = (ctx: CanvasRenderingContext2D, e: number = 1) => {
  ctx.translate(cx, cy)
  ctx.scale(0.5 + (1 - e) * 0.5, 0.5 + (1 - e) * 0.5)
  ctx.translate(-cx, -cy)
}

const firstArcPass = (
  ctx: CanvasRenderingContext2D,
  e: number,
  idx: number,
) => {
  mainCircleDraw(ctx)
  if (idx >= 2) {
    arcDrawPartInner(ctx, idx === 2 ? e : 1, 2)
  }
  if (idx >= 3) {
    arcDrawPartInner(ctx, idx === 3 ? e : 1, 3)
  }
  if (idx >= 4) {
    arcDrawPartInner(ctx, idx === 4 ? e : 1, 4)
    arcDrawPartInner2(ctx, idx === 4 ? e : 1, 4)
  }
  if (idx >= 5) {
    arcDrawPartInner(ctx, idx === 5 ? e : 1, 5)
    arcDrawPartInner2(ctx, idx === 5 ? e : 1, 5)
  }

  for (let i = 0; i < idx; i++) {
    arcDrawPart(ctx, 1, i)
  }
  if (idx < 6) {
    arcDrawPart(ctx, e, idx)
  }
}

const secondArcPass = (
  ctx: CanvasRenderingContext2D,
  e: number,
  idx: number,
) => {
  // Last stage
  mainCircleDraw(ctx)
  arcDrawPartInner(ctx, 1, 2)
  arcDrawPartInner(ctx, 1, 3)
  arcDrawPartInner(ctx, 1, 4)
  arcDrawPartInner2(ctx, 1, 4)
  arcDrawPartInner(ctx, 1, 5)
  arcDrawPartInner2(ctx, 1, 5)

  let idxs = [6, 1, 2, 3, 4, 5]
  let colorIdxs = [5, 0, 1, 2, 3, 4]

  for (let i = 0; i < idx; i++) {
    arcDrawPartInner(ctx, 1, idxs[i], circleColors6[colorIdxs[i]])
  }
  if (idx < 6) {
    arcDrawPartInner(ctx, e, idxs[idx], circleColors6[colorIdxs[idx]])
  }

  arcDrawPart(ctx, 1, 0)
  arcDrawPart(ctx, 1, 1)
  arcDrawPart(ctx, 1, 2)
  arcDrawPart(ctx, 1, 3)
  arcDrawPart(ctx, 1, 4)
  arcDrawPart(ctx, 1, 5)

  // This looks really cool
  // for (let i = 0; i < idx; i++) {
  //   arcDrawPart(ctx, e, i)
  // }
  for (let i = 0; i < idx; i++) {
    arcDrawPart(ctx, 1, i)
  }
  if (idx < 6) {
    arcDrawPart(ctx, e, idx)
  }
}

function mainCircleDraw(ctx: CanvasRenderingContext2D, e: number = 1) {
  ctx.fillStyle = circleBgColor

  if (e < 1) {
    ctx.beginPath()
    ctx.arc(cx, cy, circleR, -turn / 4, -turn / 4 + e * turn)
    ctx.lineTo(cx, cy)
    ctx.fill()
    ctx.stroke()
    return
  }

  ctx.beginPath()
  ctx.arc(cx, cy, circleR, 0, turn)
  // ctx.lineTo(cx, cy)
  ctx.fill()
  ctx.stroke()
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

// see: https://stackoverflow.com/questions/4467539/javascript-modulo-gives-a-negative-result-for-negative-numbers
function mod(n: number, m: number) {
  return ((n % m) + m) % m
}

function arcDrawPartInner(
  ctx: CanvasRenderingContext2D,
  e: number,
  idx: number,
  color: string = 'white',
) {
  if (e > 0.5) {
    e = 0.5
  }

  // Big arc circle
  ctx.save()

  ctx.fillStyle = color

  let csp = circlePoints6[mod(idx - 2, 6)]
  ctx.beginPath()
  ctx.ellipse(csp[0], csp[1], circleR, circleR, 0, 0, turn)
  ctx.clip()

  // Pie shape
  let sp = circlePoints6[mod(idx, 6)]
  let [nx, ny] = rotate2(sp[0], sp[1], cx, cy, turn / 6 - (e * turn) / 3)
  ctx.beginPath()
  ctx.lineTo(sp[0], sp[1])
  let arcStart = ((5 + idx * 2) / 12) * turn
  ctx.arc(sp[0], sp[1], circleR, arcStart, arcStart - (e * 4 * turn) / 12, true)
  ctx.lineTo(nx, ny)
  ctx.fill()

  ctx.restore()
}

function arcDrawPartInner2(
  ctx: CanvasRenderingContext2D,
  e: number,
  idx: number,
  color: string = 'white',
) {
  if (e < 0.5) {
    return
  }
  // e -= 0.5

  // Big arc circle
  ctx.save()

  ctx.fillStyle = color

  let csp = circlePoints6[mod(idx - 4, 6)]
  ctx.beginPath()
  ctx.ellipse(csp[0], csp[1], circleR, circleR, 0, 0, turn)
  ctx.clip()

  // Pie shape
  let sp = circlePoints6[mod(idx, 6)]
  let [nx, ny] = rotate2(sp[0], sp[1], cx, cy, turn / 6 - (e * turn) / 3)
  ctx.beginPath()
  ctx.lineTo(sp[0], sp[1])
  let arcStart = ((5 + idx * 2) / 12) * turn - (2 / 12) * turn
  ctx.arc(
    sp[0],
    sp[1],
    circleR,
    arcStart,
    arcStart - ((e - 0.5) * 4 * turn) / 12,
    true,
  )
  ctx.lineTo(nx, ny)
  ctx.fill()

  ctx.restore()
}
