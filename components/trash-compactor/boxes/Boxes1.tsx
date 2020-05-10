import l from 'lodash'
import React from 'react'
import { useAnimationForever } from '../../../lib/useAnimationForever'
import { Layout } from '../../layout/Layout'
import { Abstract, Published } from '../../shared/Abstract'
import { ClientOnly } from '../../shared/ClientOnly'
import { SeeLink } from '../../shared/SeeLink'
import { ZenLink } from '../../shared/ZenLink'
import { KochSnowflakeFractal1 } from '../koch/Koch1'

export const Boxes1Full = () => {
  return (
    <Layout title='Boxes 1'>
      <Abstract>
        Animation. Originally part of the Trash-Compactor collection.
        <SeeLink href='https://twitter.com/beesandbombs/status/829703970360852480' />
        <Published>Republished: 5/10/2020</Published>
      </Abstract>

      <ZenLink href='/boxes-1-zen' />

      <ClientOnly>
        <Boxes1 />
      </ClientOnly>
    </Layout>
  )
}

let boxesData: any = null
const _generateData = () => {
  const margin = 20
  const width = 400
  const height = 400

  let usableWidth = width * 0.707
  let usableHeight = height * 0.707

  const domain = 0.66

  let numBoxes = 25
  let boxSize = usableWidth / (numBoxes + 2)
  let boxes = l.times(numBoxes, (cIdx) => {
    let rotationRate = (numBoxes - cIdx) / numBoxes
    // if(cIdx === 0) {
    //   rotationRate = 0
    // }
    return {
      width: usableWidth - cIdx * boxSize * 2,
      height: usableHeight - cIdx * boxSize * 2,
      rotation: rotationRate,
    }
  })

  boxesData = boxes
}

export const Boxes1 = () => {
  const isCancelled = React.useRef(false)

  let [state, setState] = React.useState({
    iteration: 0,
  })
  let { iteration } = state
  let elapsed = useAnimationForever()

  React.useEffect(() => {
    _generateData()
    return () => {
      isCancelled.current = true
    }
  }, [])

  React.useEffect(() => {
    setState({
      iteration: iteration + 1,
    })
  })

  const width = 400
  const height = 400

  return (
    <div>
      <svg width={width} height={height}>
        <g transform={`translate(${width / 2},${height / 2})`}>
          {l.map(boxesData, (c: any, cIdx) => (
            <g
              key={cIdx}
              transform={`rotate( ${c.rotation * iteration * 0.1} )`}
            >
              <rect
                x={-c.width / 2}
                y={-c.height / 2}
                width={c.width}
                height={c.height}
                fill='red'
                stroke='black'
                strokeWidth={2}
              />
            </g>
          ))}
        </g>
      </svg>
    </div>
  )
}
