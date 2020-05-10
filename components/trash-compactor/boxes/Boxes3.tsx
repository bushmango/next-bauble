import _ from 'lodash'
import React from 'react'
import { useAnimationForever } from '../../../lib/useAnimationForever'
import { Layout } from '../../layout/Layout'
import { Abstract, Published } from '../../shared/Abstract'
import { ClientOnly } from '../../shared/ClientOnly'
import { SeeLink } from '../../shared/SeeLink'
import { ZenLink } from '../../shared/ZenLink'

export const Boxes3Full = () => {
  return (
    <Layout title='Boxes 3'>
      <Abstract>
        Minimalist animation. An excuse to use Generators. Originally part of
        the Trash-Compactor collection.
        <SeeLink href='https://twitter.com/beesandbombs/status/829703970360852480' />
        <Published>Republished: 5/10/2020</Published>
      </Abstract>

      <ZenLink href='/boxes-3-zen' />

      <ClientOnly>
        <Boxes3 />
      </ClientOnly>
    </Layout>
  )
}

function* generatorBoxes() {
  let a = 0
  let b = 1
  let items = []

  let keyIndex = 0
  let keySubIndex = 0

  let keySubSubIndex = 0

  let keyFrames1 = [
    {
      position: [0, 1],
      centerOfRotation: [0.5, 0.5],
      fromRotation: 180,
    },
    {
      position: [1, 0],
      centerOfRotation: [0.5, 0.5],
      fromRotation: 90,
    },
    {
      position: [0, -1],
      centerOfRotation: [0.5, 0.5],
      fromRotation: 0,
    },
    {
      position: [-1, 0],
      centerOfRotation: [0.5, 0.5],
      fromRotation: -90,
    },
  ]
  let keyFrames2 = [
    {
      position: [-1, 0],
      centerOfRotation: [0.5, 0.5],
      fromRotation: -90,
    },
    {
      position: [0, -1],
      centerOfRotation: [0.5, 0.5],
      fromRotation: 0,
    },
    {
      position: [1, 0],
      centerOfRotation: [0.5, 0.5],
      fromRotation: 90,
    },
    {
      position: [0, 1],
      centerOfRotation: [0.5, 0.5],
      fromRotation: 180,
    },
  ]
  let keyFrames3 = [
    {
      position: [-1, 0],
      centerOfRotation: [0.5, 0.5],
      fromRotation: -90,
    },
    {
      position: [0, -1],
      centerOfRotation: [0.5, 0.5],
      fromRotation: 0,
    },
    {
      position: [1, 0],
      centerOfRotation: [0.5, 0.5],
      fromRotation: 90,
    },
    {
      position: [0, 1],
      centerOfRotation: [0.5, 0.5],
      fromRotation: 180,
    },
  ]

  while (true) {
    // Return data
    let key1 = keyFrames1[keyIndex]
    let key2 = keyFrames2[keyIndex]
    let key3 = keyFrames2[keyIndex]
    let data1 = {
      position: key1.position,
      centerOfRotation: key1.centerOfRotation,
      rotation: key1.fromRotation + keySubIndex,
    }
    let data2 = {
      position: key2.position,
      centerOfRotation: key2.centerOfRotation,
      rotation: key2.fromRotation + keySubIndex,
    }
    let data3 = {
      position: key3.position,
      centerOfRotation: key3.centerOfRotation,
      rotation: key3.fromRotation + keySubIndex,
    }

    // Increment next
    keySubSubIndex += 1
    if (keySubSubIndex > 0) {
      keySubSubIndex = 0
      keySubIndex += 1
      if (keySubIndex >= 90) {
        keySubIndex = 0
        keyIndex = (keyIndex + 1) % keyFrames1.length
      }
    }

    yield { data1, data2, data3 }
  }
}

let iteration = 0
let data = null as any
export const Boxes3 = () => {
  let [_generator, setGenerator] = React.useState(generatorBoxes)
  let elapsed = useAnimationForever()
  //let _generator = generatorBoxes()

  React.useEffect(() => {
    iteration = 0
  }, [])

  React.useEffect(() => {
    iteration++
    data = _generator.next().value
  })

  const width = 400
  const height = 400

  let rotation = iteration % 90

  if (!data) {
    return <div>Loading</div>
  }

  let { data1, data2, data3 } = data
  let boxSize = width / 2
  let smallBoxSize = boxSize / 2
  let tinyBoxSize = smallBoxSize / 2
  let minisculeBoxSize = tinyBoxSize / 2

  return (
    <div>
      <svg width={width} height={height}>
        <g transform={`translate(${width / 2},${height / 2})`}>
          <rect
            x={-width / 2}
            y={-height / 2}
            width={width}
            height={height}
            fill='red'
            stroke='black'
            strokeWidth={2}
          />

          <g
            transform={`translate(${boxSize * data1.position[0]},${
              boxSize * data1.position[1]
            })`}
          >
            <g transform={`rotate(${data1.rotation})`}>
              <g
                transform={`translate(${boxSize * data1.centerOfRotation[0]},${
                  boxSize * data1.centerOfRotation[1]
                })`}
              >
                <rect
                  x={-width / 4}
                  y={-height / 4}
                  width={width / 2}
                  height={height / 2}
                  fill='black'
                  stroke='white'
                  strokeWidth={2}
                />

                <g
                  transform={`translate(${smallBoxSize * data2.position[0]},${
                    smallBoxSize * data2.position[1]
                  })`}
                >
                  <g transform={`rotate(${data2.rotation})`}>
                    <g
                      transform={`translate(${
                        smallBoxSize * data2.centerOfRotation[0]
                      },${smallBoxSize * data2.centerOfRotation[1]})`}
                    >
                      <rect
                        x={-width / 8}
                        y={-height / 8}
                        width={width / 4}
                        height={height / 4}
                        fill='green'
                        stroke='white'
                        strokeWidth={2}
                      />

                      <g
                        transform={`translate(${
                          tinyBoxSize * data3.position[0]
                        },${tinyBoxSize * data3.position[1]})`}
                      >
                        <g transform={`rotate(${data3.rotation})`}>
                          <g
                            transform={`translate(${
                              tinyBoxSize * data3.centerOfRotation[0]
                            },${tinyBoxSize * data3.centerOfRotation[1]})`}
                          >
                            <rect
                              x={-width / 16}
                              y={-height / 16}
                              width={width / 8}
                              height={height / 8}
                              fill='orange'
                              stroke='white'
                              strokeWidth={2}
                            />

                            <g
                              transform={`translate(${
                                minisculeBoxSize * data3.position[0]
                              },${minisculeBoxSize * data3.position[1]})`}
                            >
                              <g transform={`rotate(${data3.rotation})`}>
                                <g
                                  transform={`translate(${
                                    minisculeBoxSize * data3.centerOfRotation[0]
                                  },${
                                    minisculeBoxSize * data3.centerOfRotation[1]
                                  })`}
                                >
                                  <rect
                                    x={-width / 32}
                                    y={-height / 32}
                                    width={width / 16}
                                    height={height / 16}
                                    fill='purple'
                                    stroke='white'
                                    strokeWidth={2}
                                  />
                                </g>
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
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
