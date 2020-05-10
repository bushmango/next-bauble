import * as d3 from 'd3'
import { default as l, default as _ } from 'lodash'
// import * as globalMouseHandler from 'modules/globalMouseHandler'
import React from 'react'
import { useAnimationForever } from '../../../lib/useAnimationForever-sidecar'
import { Layout } from '../../layout/Layout'
import { Abstract, Published } from '../../shared/Abstract'
import { ClientOnly } from '../../shared/ClientOnly'
import { SeeLink } from '../../shared/SeeLink'
import { ZenLink } from '../../shared/ZenLink'
import { globalMouseHandler } from '../globalMouseHandler-sidecar'

export const D3RoundedRectsFull = () => {
  return (
    <Layout title='D3 Rounded Rects'>
      <Abstract>
        Use your mouse! D3 Rounded Rects example. Originally part of the
        Trash-Compactor collection.
        <SeeLink href='https://bl.ocks.org/mbostock/1123639' />
        <Published>Republished: 5/10/2020</Published>
      </Abstract>

      <ZenLink href='/d3-rounded-rects-zen' />

      <ClientOnly>
        <D3RoundedRects />
      </ClientOnly>
    </Layout>
  )
}

export const RoundedRect = (props: {
  d: number
  targetX: number
  targetY: number
  rotate: number
}) => {
  let { d, targetX, targetY, rotate } = props

  return (
    <g transform={`translate(${targetX},${targetY})`}>
      <rect
        rx={6}
        ry={6}
        x={-12.5}
        y={-12.5}
        width={25}
        height={25}
        transform={`rotate(${rotate})scale(${(1 - d / 25) * 20}) `}
        fill={d3.schemeCategory10[d % d3.schemeCategory10.length]}
      ></rect>
    </g>
  )
}

const _createRects = () => {
  let numRects = 25
  let rects = []
  for (let i = 0; i < numRects; i++) {
    rects.push({
      d: i,
    })
  }
  return rects
}

let count = 0
export const D3RoundedRects = (props: { size?: number }) => {
  let elapsed = useAnimationForever()
  let refSvg = React.useRef<SVGSVGElement>(null)

  let size = props.size || 500

  let [state, setState] = React.useState({
    mouseX: size / 2,
    mouseY: size / 2,
    mouseActive: false,
    rects: _createRects(),
  })

  const mergeState = (newState: any) => {
    setState(l.merge({}, state, newState))
  }

  let mouse = globalMouseHandler.getMousePos()
  let targetX = mouse.docX
  let targetY = mouse.docY

  if (refSvg.current) {
    // Transform into svg space
    let pt = refSvg.current.createSVGPoint()
    pt.x = targetX
    pt.y = targetY
    let cursorPt = pt.matrixTransform(refSvg.current.getScreenCTM()?.inverse())
    targetX = cursorPt.x
    targetY = cursorPt.y
  }

  count++
  let { rects } = state

  return (
    <div>
      <svg width={size} height={size} ref={refSvg}>
        <g>
          {_.map(rects, (c, cIdx) => (
            <RoundedRect
              key={cIdx}
              d={c.d}
              targetX={targetX}
              targetY={targetY}
              rotate={Math.sin((count + cIdx) / 10) * 7 * 7}
            />
          ))}
        </g>
      </svg>
    </div>
  )
}
