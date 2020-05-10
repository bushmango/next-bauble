import * as d3 from 'd3'
import l from 'lodash'
import React from 'react'
import Victor from 'victor'
import { Layout } from '../../layout/Layout'
import { Abstract, Published } from '../../shared/Abstract'
import { SeeLink } from '../../shared/SeeLink'
import { ZenLink } from '../../shared/ZenLink'
import { ClientOnly } from '../../shared/ClientOnly'
import { FractalTree } from '../fractal/FractalTree'

export const KochSnowflakeFractal1Full = () => {
  return (
    <Layout title='Koch Snowflake Fractal 1'>
      <Abstract>
        Fractal animation. Originally part of the Trash-Compactor collection.
        <SeeLink href='https://en.wikipedia.org/wiki/Koch_snowflake' />
        <Published>Republished: 5/10/2020</Published>
      </Abstract>

      <ZenLink href='/koch-snowflake-fractal-1-zen' />

      <ClientOnly>
        <KochSnowflakeFractal1 />
      </ClientOnly>
    </Layout>
  )
}

function delay(milliseconds: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, milliseconds)
  })
}

export const KochSnowflakeFractal1 = () => {
  const isCancelled = React.useRef(false)
  let [state, setState] = React.useState({
    iteration: 0,
    subIteration: 0,
    maxIteration: 13,
    dir: 1,
    currentLines: [] as any[],
    nextLines: [] as any[],
  })

  const mergeState = (newState: any) => {
    setState(l.merge({}, state, newState))
  }

  React.useEffect(() => {
    mergeState({ currentLines: _initialTriangle() })
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
      currentLines,
      nextLines,
    } = state

    iteration = 10

    //while(subIteration < currentLines.length) {
    subIteration++
    let iterations = iteration
    let factor = 0.25

    nextLines = _initialTriangle()
    currentLines = _initialTriangle()

    for (let iter = 0; iter < iterations; iter++) {
      let delayMs = 200 / (iter * 2 + 1)
      if (delayMs < 5) {
        delayMs = 5
      }

      currentLines = nextLines
      nextLines = []

      mergeState({ nextLines, currentLines, iteration: iter })
      await delay(delayMs)
      if (isCancelled.current) {
        return
      }

      while (currentLines.length > 0) {
        let curLine = currentLines.shift()
        let split = _splitLine(curLine, factor)
        nextLines.push(split[0])
        nextLines.push(split[1])
        nextLines.push(split[2])
        nextLines.push(split[3])
        mergeState({ nextLines, currentLines })
        await delay(delayMs)
        if (isCancelled.current) {
          return
        }
      }

      factor *= 0.35
    }
  }

  const _splitLine = (line: any, factor: number) => {
    let [x1, y1, x2, y2] = line

    let v1 = new Victor(x1, y1)
    let v2 = new Victor(x2, y2)

    let distance = v2.distance(v1)

    let vDelta = v2.clone().subtract(v1).normalize()

    let factorAdjust = 1

    let actualFactor = (distance / 3.0 / 2.0) * Math.sqrt(3) * factorAdjust

    let vMid = v1
      .clone()
      .add(vDelta.clone().multiply(new Victor(distance / 2, distance / 2)))
    let vA = v1
      .clone()
      .add(vDelta.clone().multiply(new Victor(distance / 3, distance / 3)))
    let vB = v1
      .clone()
      .add(
        vDelta
          .clone()
          .multiply(new Victor((distance * 2) / 3, (distance * 2) / 3)),
      )

    let vp1 = vDelta
      .clone()
      .multiply(new Victor(actualFactor, actualFactor))
      .rotateDeg(-90)
    vMid.add(vp1)

    return [
      [v1.x, v1.y, vA.x, vA.y],
      [vA.x, vA.y, vMid.x, vMid.y],
      [vMid.x, vMid.y, vB.x, vB.y],
      [vB.x, vB.y, v2.x, v2.y],
    ]
  }

  const _initialTriangle = (): any[] => {
    // let lines = [[-0.5,-0.33,0.5,-0.33]]
    let v1 = new Victor(1, 0)
    v1.rotateDeg((180 / 3) * 2)

    let v2 = v1.clone()
    v2.rotateDeg((180 / 3) * 2)

    v1.add(new Victor(0.5, -0.33))

    v2.add(v1)

    return [
      [-0.5, -0.33, 0.5, -0.33],
      [0.5, -0.33, v1.x, v1.y],
      [v1.x, v1.y, v2.x, v2.y],
    ]
  }

  let { iteration, currentLines, nextLines } = state

  const margin = 20
  const width = 800
  const height = 800

  const domain = 0.66

  let xFunc = d3
    .scaleLinear()
    .domain([-domain, domain])
    .range([margin, width - margin])
  let yFunc = d3
    .scaleLinear()
    .domain([-domain, domain])
    .range([margin, height - margin])

  let path = 'M0 0'
  if (currentLines.length > 0) {
    path = 'M' + xFunc(currentLines[0][0]) + ' ' + yFunc(currentLines[0][1])
    l.forEach(currentLines, (c) => {
      path += ' L' + xFunc(c[2]) + ' ' + yFunc(c[3])
    })
  }

  let path2 = 'M0 0'
  if (nextLines.length > 0) {
    path2 = 'M' + xFunc(nextLines[0][0]) + ' ' + yFunc(nextLines[0][1])
    l.forEach(nextLines, (c) => {
      path2 += ' L' + xFunc(c[2]) + ' ' + yFunc(c[3])
    })
  }

  return (
    <div>
      <svg width={width} height={height}>
        <g>
          <path d={path} stroke='blue' fill='none' />
          <path d={path2} stroke='green' fill='none' />
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
