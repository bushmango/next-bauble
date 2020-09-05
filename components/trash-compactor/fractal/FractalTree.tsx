import * as d3 from 'd3'
import l from 'lodash'
import React from 'react'
import { Layout } from '../../layout/Layout'
import { Abstract, Published } from '../../shared/Abstract'
import { ClientOnly } from '../../shared/ClientOnly'
import { SeeLink } from '../../shared/SeeLink'
import { ZenLink } from '../../shared/ZenLink'

export const FractalTreeFull = () => {
  return (
    <Layout title='Fractal Tree'>
      <Abstract>
        Use your mouse! Fractal Tree. Originally part of the Trash-Compactor
        collection.
        <SeeLink href='https://swizec.com/blog/dancing-tree-fractal-react/swizec/7288' />
        <SeeLink href='https://github.com/Swizec/react-fractals/blob/master/src/App.js' />
        <Published>Republished: 5/10/2020</Published>
      </Abstract>

      <ZenLink href='/fractal-tree-zen' />

      <ClientOnly>
        <FractalTree scale={1} />
      </ClientOnly>
    </Layout>
  )
}

// See: https://swizec.com/blog/dancing-tree-fractal-react/swizec/7288
// See: https://github.com/Swizec/react-fractals/blob/master/src/App.js

let width = 500
let height = 500
let maxTreeSize = 8

function MathDeg(radians: number) {
  return radians * (180 / Math.PI)
}

function memoizedCalc(args: any) {
  const memo: any = {}
  const key: any = (p: { w: number; heightFactor: number; lean: number }) =>
    [p.w, p.heightFactor, p.lean].join('-')

  const memoKey = key(args)

  if (memo[memoKey]) {
    return memo[memoKey]
  } else {
    const { w, heightFactor, lean } = args

    const trigH = heightFactor * w

    const result = {
      nextRight: Math.sqrt(trigH ** 2 + (w * (0.5 + lean)) ** 2),
      nextLeft: Math.sqrt(trigH ** 2 + (w * (0.5 - lean)) ** 2),
      A: MathDeg(Math.atan(trigH / ((0.5 - lean) * w))),
      B: MathDeg(Math.atan(trigH / ((0.5 + lean) * w))),
    }

    memo[memoKey] = result
    return result
  }
}

export const Pythagoras = (props: {
  w: number
  x: number
  y: number
  heightFactor: number
  lean: number
  left?: boolean
  right?: boolean
  lvl: number
  maxlvl: number
}) => {
  let { w, x, y, heightFactor, lean, left, right, lvl, maxlvl } = props

  if (lvl >= maxlvl || w < 1) {
    return null
  }

  const { nextRight, nextLeft, A, B } = memoizedCalc({
    w: w,
    heightFactor: heightFactor,
    lean: lean,
  })

  let rotate = ''
  if (left) {
    rotate = `rotate(${-A} 0 ${w})`
  } else if (right) {
    rotate = `rotate(${B} ${w} ${w})`
  }

  return (
    <g transform={`translate(${x} ${y}) ${rotate}`}>
      <rect
        width={w}
        height={w}
        x={0}
        y={0}
        style={{ fill: d3.interpolateViridis(lvl / maxlvl) }}
      />

      <Pythagoras
        w={nextLeft}
        x={0}
        y={-nextLeft}
        lvl={lvl + 1}
        maxlvl={maxlvl}
        heightFactor={heightFactor}
        lean={lean}
        left={true}
      />

      <Pythagoras
        w={nextRight}
        x={w - nextRight}
        y={-nextRight}
        lvl={lvl + 1}
        maxlvl={maxlvl}
        heightFactor={heightFactor}
        lean={lean}
        right={true}
      />
    </g>
  )
}

let running = false

export const FractalTree = (props: { scale: number }) => {
  let [state, setState] = React.useState({
    currentMax: maxTreeSize,
    baseW: 80,
    heightFactor: 0,
    lean: 0,
  })

  let refSvg = React.useRef<SVGSVGElement>(null)

  //  let elapsed = useAnimationForever()

  React.useEffect(() => {
    // next()
    renderTo(200 * props.scale, 200 * props.scale)
  }, [])

  React.useEffect(() => {
    if (refSvg.current) {
      // refSvg.current.onmousemove = onMouseMove

      d3.select(refSvg.current).on('mousemove', onMouseMove)
    }

    // setTimeout(next, 100)
    //next()
  })

  // const next = () => {
  //   const { currentMax } = state
  //   if (currentMax < maxTreeSize) {
  //     setState(l.merge({}, state, { currentMax: currentMax + 1 }))
  //     setTimeout(next, 100)
  //     // setTimeout(this.next.bind(this), 100)
  //   }
  // }

  // Throttling approach borrowed from Vue fork
  // https://github.com/yyx990803/vue-fractal/blob/master/src/App.vue
  // rAF makes it slower than just throttling on React update
  const onMouseMove = (event: any) => {
    if (running || !refSvg.current) {
      return
    }
    running = true
    const [x, y] = d3.mouse(refSvg.current)
    renderTo(x, y)
    running = false
  }

  const renderTo = (x: number, y: number) => {
    const scaleFactor = d3
      .scaleLinear()
      .domain([height * props.scale, 0])
      .range([0, 0.8])

    const scaleLean = d3
      .scaleLinear()
      .domain([0, (width * props.scale) / 2, width * props.scale])
      .range([0.5, 0, -0.5])

    setState(
      l.merge({}, state, {
        heightFactor: scaleFactor(y),
        lean: -scaleLean(x),
      }),
    )
  }

  return (
    <div>
      <div>
        <svg
          width={width * props.scale}
          height={height * props.scale}
          ref={refSvg}
          style={{ border: '1px solid lightgray' }}
        >
          <Pythagoras
            w={state.baseW * props.scale}
            heightFactor={state.heightFactor}
            lean={state.lean}
            x={(width * props.scale) / 2 - 40}
            y={height * props.scale - state.baseW * props.scale}
            lvl={0}
            maxlvl={state.currentMax}
          />
        </svg>
      </div>
    </div>
  )
}
