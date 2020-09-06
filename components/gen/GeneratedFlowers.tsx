import * as React from 'react'
import { useAnimationForever } from '../../lib/useAnimationForever'
import { Layout } from '../layout/Layout'
import { Abstract, Published } from '../shared/Abstract'
import { ClientOnly } from '../shared/ClientOnly'
import { SeeInternalLink, SeeLink } from '../shared/SeeLink'
import { ZenLink } from '../shared/ZenLink'
import { tinyFlower } from './tinyFlower-sidecar'

export const GeneratedFlowersFull = () => {
  return (
    <Layout title='Generated Flowers'>
      <Abstract>
        Generated Flowers - Click to generate more!
        <Published>9/5/2020</Published>
      </Abstract>
      <SeeLink href='https://www.reddit.com/r/proceduralgeneration/comments/ij7zx6/tiny_procedural_sprite_sheet_generator/'>
        Tiny Procedural Sprite Sheet Generator (u/Slackluster)
      </SeeLink>
      <SeeLink href='https://www.dwitter.net/d/3078'>
        https://www.dwitter.net/d/3078
      </SeeLink>
      <SeeInternalLink href='/generated-sprites' />
      <ZenLink href='/generated-flowers-zen' />
      <ClientOnly>
        <GeneratedFlowers />
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

export const GeneratedFlowers = () => {
  let refCanvas = React.useRef<HTMLCanvasElement>(null)

  let elapsed = useAnimationForever()

  let w = 400
  let h = 400

  React.useEffect(() => {
    reset()
  }, [])

  React.useEffect(() => {
    if (refCanvas.current) {
      render(refCanvas.current, elapsed, w, h)
    }
  })

  return (
    <div>
      <div>
        <canvas
          onMouseDown={() => {
            _onMouseDown()
          }}
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

// see: https://stackoverflow.com/questions/4467539/javascript-modulo-gives-a-negative-result-for-negative-numbers
function mod(n: number, m: number) {
  return ((n % m) + m) % m
}

let seed = Date.now()
let isDone = false
let renderElapsed = 0
let lastElapsed = 0
let firstDelay = 1000
const _onMouseDown = () => {
  reset()
}

const reset = () => {
  seed = Date.now()
  isDone = false
  renderElapsed = 0
  lastElapsed = 0
}

export const render = (
  canvas: HTMLCanvasElement,
  elapsedMs: number,
  w: number,
  h: number,
) => {
  if (isDone) {
    return
  }

  if (lastElapsed === 0) {
    lastElapsed = elapsedMs
    return
  }

  let elapsedDelta = elapsedMs - lastElapsed
  lastElapsed = elapsedMs

  if (firstDelay > 0) {
    firstDelay -= elapsedDelta
    return
  }

  renderElapsed += elapsedDelta

  let elapsedS = renderElapsed / 1000
  const maxProgress = 300 * 2
  let progress = elapsedS * 10
  let progress2 = (elapsedS - 1) * 10
  let progress3 = (elapsedS - 2.5) * 10

  // Auto complete
  // progress = maxProgress

  let ctx = canvas.getContext('2d')
  if (!ctx) {
    return
  }

  ctx.resetTransform()
  ctx.scale(4, 4)

  ctx.fillStyle = 'white'
  ctx.clearRect(0, 0, w, h)
  ctx.fillRect(0, 0, w, h)

  // ctx.strokeStyle = 'green'
  // ctx.beginPath()
  // ctx.ellipse(mouseX, mouseY, 5, 5, 0, 0, turn)
  // ctx.closePath()
  // ctx.stroke()

  ctx.strokeStyle = 'black'
  tinyFlower.tinyFlowerStem_render(seed, ctx, 2, progress2)
  tinyFlower.tinyFlowerBase_render(seed, ctx, 2, progress)
  tinyFlower.tinyFlowerTop_render(seed, ctx, 2, progress3)
  if (progress > maxProgress) {
    isDone = true
  }
}
