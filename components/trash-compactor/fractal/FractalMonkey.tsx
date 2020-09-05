import * as d3 from 'd3'
import _ from 'lodash'
import React from 'react'
import Victor from 'victor'
import { Layout } from '../../layout/Layout'
import { Abstract, Published } from '../../shared/Abstract'
import { ClientOnly } from '../../shared/ClientOnly'
import { ZenLink } from '../../shared/ZenLink'
import { SeeLink } from '../../shared/SeeLink'

export const FractalMonkeyFull = () => {
  return (
    <Layout title='Fractal Monkey'>
      <Abstract>
        Modified Serpinski Fractal. I don't recall why I called it a monkey.
        Originally part of the Trash-Compactor
        <SeeLink href='https://en.wikipedia.org/wiki/Sierpi%C5%84ski_triangle' />
        <Published>Republished: 5/10/2020</Published>
      </Abstract>

      <ZenLink href='/fractal-monkey-zen' />

      <ClientOnly>
        <FractalMonkey />
      </ClientOnly>
    </Layout>
  )
}

function delay(milliseconds: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, milliseconds)
  })
}

function getSerpinskiFractalGenerator() {
  let h = Math.sqrt(3) / 2

  let points = [
    [0, 0],
    [1 / 4, h / 2],
    [3 / 4, h / 2],
    [1, 0],
  ]

  let flipping = [1, -1]

  return {
    points,
    flipping,
  }
}

function getMonkeyFractalGenerator() {
  let _1o3 = 1 / 3
  let _1o4 = 1 / 4
  let _1o6 = 1 / 6

  let points = [
    [0, 0],
    [1 / 6, 1 / 4],
    [1 / 3, 1 / 2],
    [2 / 3, 1 / 2],
    [5 / 6, 1 / 4],
    [1, 0],
  ]

  let flipping = [1, 1, 1, 1, 1]

  return {
    points,
    flipping,
  }
}

function getInitialLine() {
  let segments = [
    [0, 0],
    [1, 0],
  ]
  return segments
}

function getInitialTriangle() {
  let h = Math.sqrt(3) / 2

  let segments = [
    [0, 0],
    [1, 0],
    [0.5, -h],
    [0, 0],
  ]
  return segments
}

function convertSegmentsToLinePath(segments: any, xFunc: any, yFunc: any) {
  let path = 'M0 0'
  if (segments.length >= 2) {
    let firstSegment = segments[0]
    path = 'M' + xFunc(firstSegment[0]) + ' ' + yFunc(firstSegment[1])

    _.forEach(segments, (c) => {
      path += ' L' + xFunc(c[0]) + ' ' + yFunc(c[1])
    })
  }

  return path
}

function iterateSegment(
  segmentA: any,
  segmentB: any,
  generator: any,
  flip: any,
) {
  // Replace this line segment with the transformed generator
  let vo = new Victor(segmentB[0] - segmentA[0], segmentB[1] - segmentA[1])
  let len = vo.length()
  let angleDeg = vo.angleDeg()

  let factor = 1 // 0.5

  // logger.debug('is', vo, len, angleDeg)

  let newSegments = [] as any[]
  _.forEach(generator.points, (c: any) => {
    // Initial point
    let x = segmentA[0]
    let y = segmentA[1]

    // logger.debug('gp', c, x, y, len)

    // Add distances from generator
    let vgen = new Victor(c[0] * len, c[1] * len * factor * flip)

    vgen.rotateDeg(angleDeg)

    x += vgen.x
    y += vgen.y

    // logger.debug('ns', vgen, x, y)

    newSegments.push([x, y])
  })

  // Last one is not needed
  newSegments.pop()

  return newSegments
}

export const FractalMonkey = () => {
  const isCancelled = React.useRef(false)
  let [state, setState] = React.useState({
    iteration: 0,
    subIteration: 0,
    maxIteration: 13,
    dir: 1,
    currentSegments: [] as number[][],
    nextSegments: [] as number[][],
  })

  const mergeState = (newState: any) => {
    setState(_.merge({}, state, newState))
  }
  React.useEffect(() => {
    mergeState({ currentSegments: getInitialTriangle() })
    buildKoch()
    return () => {
      isCancelled.current = true
    }
  }, [])

  const buildKoch = async () => {
    let {
      iteration,
      subIteration,
      maxIteration,
      currentSegments,
      nextSegments,
    } = state

    iteration = 10

    let initial = getInitialTriangle()

    //while(subIteration < currentSegments.length) {
    subIteration++
    let iterations = iteration

    nextSegments = initial
    currentSegments = initial

    // let generator = getMonkeyFractalGenerator()
    let generator = getSerpinskiFractalGenerator()

    let idxFlip = 0
    let flips = generator.flipping

    let randomFlip = true

    for (let iter = 0; iter < iterations; iter++) {
      let delayMs = 500 / (iter * 2 + 1)
      if (delayMs < 1 / 60) {
        delayMs = 1 / 60
      }

      currentSegments = nextSegments
      nextSegments = []

      mergeState({ nextSegments, currentSegments, iteration: iter })
      // await delay(delayMs)

      while (currentSegments.length > 1) {
        let curSegmentA = currentSegments.shift()
        let curSegmentB = currentSegments[0]

        let flip = flips[idxFlip % flips.length]
        idxFlip++

        // if (iter < 2) {
        //   flip = 1
        //   idxFlip = 0
        // }

        if (randomFlip) {
          flip = _.random(0, 1, true) > 0.33 ? -1 : 1
        }

        let newSegments = iterateSegment(
          curSegmentA,
          curSegmentB,
          generator,
          flip,
        )

        _.forEach(newSegments, (c) => {
          nextSegments.push(c)
        })

        mergeState({ nextSegments, currentSegments })
        await delay(delayMs)
        if (isCancelled.current) {
          return
        }
      }
      // Push last line, untransformed
      if (currentSegments.length > 0) {
        let lastSegment = currentSegments.shift() as any
        nextSegments.push(lastSegment)
        mergeState({ nextSegments, currentSegments })
        // await delay(delayMs)
      }
    }
  }

  let { iteration, currentSegments, nextSegments } = state

  const margin = 20
  const width = 800
  const height = 800

  const m = 0.25
  const x1 = -0.5
  const x2 = 1.5

  const y1 = -1
  const y2 = 1

  let xFunc = d3
    .scaleLinear()
    .domain([x1 - m, x2 + m])
    .range([margin, width - margin])
  let yFunc = d3
    .scaleLinear()
    .domain([y2 + m, y1 - m])
    .range([margin, height - margin])

  let path = convertSegmentsToLinePath(currentSegments, xFunc, yFunc)
  let path2 = convertSegmentsToLinePath(nextSegments, xFunc, yFunc)

  return (
    <div>
      <svg width={width} height={height}>
        <g>
          <path d={path} stroke='blue' fill='none' />
          <path d={path2} stroke='green' fill='none' />
        </g>
        <g>
          {_.map(currentSegments, (c, cIdx) => (
            <circle
              key={cIdx}
              cx={xFunc(c[0])}
              cy={yFunc(c[1])}
              r='2'
              stroke='none'
              fill='red'
            />
          ))}
        </g>
        <g>
          {_.map(nextSegments, (c, cIdx) => (
            <circle
              key={cIdx}
              cx={xFunc(c[0])}
              cy={yFunc(c[1])}
              r='2'
              stroke='none'
              fill='green'
            />
          ))}
        </g>
      </svg>
    </div>
  )
}
