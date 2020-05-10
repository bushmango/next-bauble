import * as d3 from 'd3'
import { default as l, default as _ } from 'lodash'
// import * as globalMouseHandler from 'modules/globalMouseHandler'
import React from 'react'
import Victor from 'victor'
import { useAnimationForever } from '../../../lib/useAnimationForever'
import { Layout } from '../../layout/Layout'
import { Abstract, Published } from '../../shared/Abstract'
import { ClientOnly } from '../../shared/ClientOnly'
import { SeeLink } from '../../shared/SeeLink'
import { globalMouseHandler } from '../globalMouseHandler-sidecar'
import { ZenLink } from '../../shared/ZenLink-sidecar'

const width = 500
const height = 500

export const D3PackEyesFull = () => {
  return (
    <Layout title='D3 Pack Eyes'>
      <Abstract>
        D3 Pack example. Originally part of the Trash-Compactor collection.
        <SeeLink href='https://bl.ocks.org/mbostock/1123639' /> (Wrong link?)
        <Published>Republished: 5/10/2020</Published>
      </Abstract>

      <ZenLink href='/d3-pack-eyes-zen' />

      <ClientOnly>
        <D3PackEyes />
      </ClientOnly>
    </Layout>
  )
}

export const Eye = (props: {
  x: number
  y: number
  r: number
  targetX: number
  targetY: number
  blink: boolean
}) => {
  let { x, y, r, targetX, targetY, blink } = props
  let va = new Victor(x, y)
  let vb = new Victor(targetX, targetY)

  let delta = new Victor(targetX - x, targetY - y)
  let dist = delta.magnitude()
  delta.normalize()

  let pupilSize = r / 2.5
  let eyeMove = r - pupilSize - 1
  if (eyeMove > dist) {
    eyeMove = dist
  }

  //let blink = _.random(0, 1, true) < 0.05

  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r={r}
        fill={blink ? 'black' : 'white'}
        stroke={'black'}
      />
      {!blink ? (
        <circle
          cx={x + delta.x * eyeMove}
          cy={y + delta.y * eyeMove}
          r={pupilSize}
          fill={'blue'}
          stroke={'black'}
        />
      ) : null}
    </g>
  )
}

export const EyesContainer = (props: {
  x: number
  y: number
  r: number
  targetX: number
  targetY: number
  blink: boolean
  childs: any
}) => {
  let { x, y, r, childs, targetX, targetY } = props

  return (
    <g>
      <circle cx={x} cy={y} r={r} stroke='black' fill='#666' />
      {_.map(childs, (c: any, cIdx) => (
        <Eye
          blink={c.blink}
          targetX={targetX}
          targetY={targetY}
          key={cIdx}
          x={c.x}
          y={c.y}
          r={c.r}
        />
      ))}
    </g>
  )
}

const _createEyes = () => {
  let data = {
    // name: 'All',
    children: [] as any,
  }

  let num = 88
  let sizes = [1, 2, 4, 8, 16]
  data.children.push({
    value: 64,
    blink: false,
  })
  for (let i = 1; i < num; i++) {
    data.children.push({
      // name: 'x' + i,
      value: _.sample(sizes),
      blink: false,
      //value: _.random(0.05, 1, true),
    })
  }

  let pack = d3
    .pack()
    .size([width - 2, height - 2])
    .padding(1)

  let root = d3
    .hierarchy(data)
    .sum((d: any) => d.value || 1) // d.value
    .sort((a, b) => (b.value || 1) - (a.value || 1))

  pack(root)
  return root
}

export const D3PackEyes = () => {
  let elapsed = useAnimationForever()
  let refSvg = React.useRef<SVGSVGElement>(null)

  let [state, setState] = React.useState({
    data: _createEyes() as any,
  })

  const mergeState = (newState: any) => {
    setState(l.merge({}, state, newState))
  }

  let { data } = state

  let mouse = globalMouseHandler.getMousePos()
  // this._point_svg = globalMouseHandler.createSvgPoint(this._ref_svg)

  let targetX = 0
  let targetY = 0

  if (refSvg.current) {
    let pointSvg = globalMouseHandler.createSvgPoint(refSvg.current)
    let { x, y } = globalMouseHandler.convertToSvgSpace(
      refSvg.current,
      pointSvg,
      mouse.docX,
      mouse.docY,
    )
    targetX = x
    targetY = y
  }

  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <svg width={width} height={height} ref={refSvg}>
          <EyesContainer
            targetX={targetX}
            targetY={targetY}
            x={data.x}
            y={data.y}
            r={data.r}
            blink={false}
            childs={data.children}
          />
        </svg>
      </div>
    </div>
  )
}
