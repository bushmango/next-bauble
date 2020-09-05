import * as React from 'react'
import { useAnimationForever } from '../../lib/useAnimationForever'
import { Layout } from '../layout/Layout'
import { Abstract, Published } from '../shared/Abstract'
import { ClientOnly } from '../shared/ClientOnly'
import { ZenLink } from '../shared/ZenLink'
import { tinySprite } from './tinySprite-sidecar'

export const GeneratedSpritesFull = () => {
  return (
    <Layout title='Hex'>
      <Abstract>
        Generated Sprites
        <Published>9/5/2020</Published>
      </Abstract>

      <ZenLink href='/generated-sprites-zen' />
      <ClientOnly>
        <GeneratedSprites />
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

export const GeneratedSprites = () => {
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

// see: https://stackoverflow.com/questions/4467539/javascript-modulo-gives-a-negative-result-for-negative-numbers
function mod(n: number, m: number) {
  return ((n % m) + m) % m
}

let seed = Date.now()
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
  let turn = 2 * Math.PI

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
  tinySprite.tinySprite_render(seed, ctx, 2, elapsedS * 10)
}
