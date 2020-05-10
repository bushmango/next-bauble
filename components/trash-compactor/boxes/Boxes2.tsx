import _ from 'lodash'
import React from 'react'
import { useAnimationForever } from '../../../lib/useAnimationForever'
import { Layout } from '../../layout/Layout'
import { Abstract, Published } from '../../shared/Abstract'
import { ClientOnly } from '../../shared/ClientOnly'
import { SeeLink } from '../../shared/SeeLink'
import { ZenLink } from '../../shared/ZenLink'

export const Boxes2Full = () => {
  return (
    <Layout title='Boxes 2'>
      <Abstract>
        Rose-esque minimalist animation. Originally part of the Trash-Compactor
        collection.
        <SeeLink href='https://twitter.com/beesandbombs/status/829703970360852480' />
        <Published>Republished: 5/10/2020</Published>
      </Abstract>

      <ZenLink href='/boxes-2-zen' />

      <ClientOnly>
        <Boxes2 />
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

  let numBoxes = 11
  let nextSize = usableWidth

  let boxes = _.times(numBoxes, (cIdx) => {
    let rotationRate = (numBoxes - cIdx) / numBoxes
    let box = {
      width: nextSize,
      height: nextSize,
      rotation: rotationRate,
    }

    nextSize = nextSize * 0.707

    return box
  })

  boxesData = boxes
}

let iteration = 0
export const Boxes2 = () => {
  let elapsed = useAnimationForever()

  React.useEffect(() => {
    let iteration = 0
    _generateData()
  }, [])

  React.useEffect(() => {
    iteration++
  })

  const width = 400
  const height = 400

  return (
    <div>
      <svg width={width} height={height}>
        <g transform={`translate(${width / 2},${height / 2})`}>
          {_.map(boxesData, (c: any, cIdx) => (
            <g key={cIdx} transform={`rotate( ${c.rotation * iteration} )`}>
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

// <g>
//   {_.map(lines, (c, cIdx) => (
//     <line key={cIdx} x1={xFunc(c[0])} y1={yFunc(c[1])} x2={xFunc(c[2])} y2={yFunc(c[3])} stroke='green'/>
//   ))}
// </g>
