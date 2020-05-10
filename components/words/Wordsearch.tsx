import * as React from 'react'
import { Abstract, Published } from '../shared/Abstract'
import { ClientOnly } from '../shared/ClientOnly'
import { Layout } from '../layout/Layout'

export const WordsearchFull = () => {
  return (
    <Layout title='Wordsearch'>
      <Abstract>
        Wordsearch example
        <Published>-</Published>
      </Abstract>

      <ClientOnly>
        <Wordsearch />
      </ClientOnly>
    </Layout>
  )
}

export const Wordsearch = () => {
  let refCanvas = React.useRef<HTMLCanvasElement>(null)

  React.useEffect(() => {
    if (refCanvas.current) {
      render(refCanvas.current)
    }
  })

  return (
    <div>
      Wordsearch!
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

export const render = (canvas: HTMLCanvasElement) => {
  let ctx = canvas.getContext('2d')
  if (!ctx) {
    return
  }

  ctx.fillStyle = 'rgb(200, 0, 0)'
  ctx.fillRect(10, 10, 50, 50)

  ctx.fillStyle = 'rgba(0, 0, 200, 0.5)'
  ctx.fillRect(30, 30, 50, 50)
}
