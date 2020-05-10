import * as d3 from 'd3'
import * as d3c from 'd3-scale-chromatic'
import { default as l, default as _ } from 'lodash'
// import * as globalMouseHandler from 'modules/globalMouseHandler'
import React from 'react'
import { Layout } from '../../layout/Layout'
import { Abstract, Published } from '../../shared/Abstract'
import { ClientOnly } from '../../shared/ClientOnly'
import { SeeLink } from '../../shared/SeeLink'
import { globalMouseHandler } from '../globalMouseHandler-sidecar'

export const D3PackFull = () => {
  return (
    <Layout title='D3 Pack'>
      <Abstract>
        D3 Pack example. Originally part of the Trash-Compactor collection.
        <SeeLink href='https://bl.ocks.org/mbostock/1123639' /> (Wrong link?)
        <Published>Republished: 5/10/2020</Published>
      </Abstract>

      {/* <ZenLink href='/d3-pack-zen' /> */}

      <ClientOnly>
        <D3Pack />
      </ClientOnly>
    </Layout>
  )
}

const width = 500
const height = 500

export const Packed = (props: {
  x: number
  y: number
  r: number
  name: string
  childs: any
  depth: number
}) => {
  let { x, y, r, name, childs, depth } = props

  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r={r}
        stroke='black'
        fill={
          (d3c as any).schemeCategory10[
            depth % (d3c as any).schemeCategory10.length
          ]
        }
      />

      {_.map(childs, (c: any, cIdx) => (
        <Packed
          key={cIdx}
          x={c.x}
          y={c.y}
          r={c.r}
          name={c.data.name}
          childs={c.children}
          depth={depth + 1}
        />
      ))}

      <text x={x} y={y} dy={7} textAnchor='middle'>
        {name}
      </text>
    </g>
  )
}

export const D3Pack = () => {
  let refSvg = React.useRef<SVGSVGElement>(null)

  let [state, setState] = React.useState({
    mouseX: 0,
    mouseY: 0,
    mouseActive: false,
    count: 0,
    rects: [] as any[],
  })

  const mergeState = (newState: any) => {
    setState(l.merge({}, state, newState))
  }

  // _ref_svg = null
  // @bind
  // _set_ref_svg(r) {
  //   this._ref_svg = r
  // }

  // componentDidMount() {
  //   this.setState({
  //     raf: requestAnimationFrame(this._update),
  //     mouseActive: false,
  //     rects: this._createRects(),
  //   })
  // }
  // componentWillUnmount() {
  //   cancelAnimationFrame(this.state.raf)
  // }

  const _update = () => {
    mergeState({
      //raf: requestAnimationFrame(this._update),
      count: state.count + 1,
    })
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

  let mouse = globalMouseHandler.getMousePos()
  let targetX = mouse.docX
  let targetY = mouse.docY

  let data = {
    name: 'Eve',
    children: [
      {
        name: 'Cain',
      },
      {
        name: 'Seth',
        children: [
          {
            name: 'Enos',
          },
          {
            name: 'Noam',
          },
        ],
      },
      {
        name: 'Abel',
      },
      {
        name: 'Awan',
        children: [
          {
            name: 'Enoch',
          },
        ],
      },
      {
        name: 'Azura',
      },
    ],
  }

  let data2 = {
    name: 'All',
    children: [] as any,
  }

  let num = 99
  for (let i = 0; i < num; i++) {
    data2.children.push({
      name: 'x' + i,
      value: _.random(0.1, 1, true),
    })
  }

  data = data2

  let pack = d3
    .pack()
    .size([width - 2, height - 2])
    .padding(3)

  let root = d3
    .hierarchy(data)
    .sum((d: any) => d.value || 1) // d.value
    .sort((a, b) => (b.value || 1) - (a.value || 1)) as any

  pack(root)

  if (refSvg.current) {
    // Transform into svg space
    let pt = refSvg.current.createSVGPoint()
    pt.x = targetX
    pt.y = targetY
    let cursorPt = pt.matrixTransform(refSvg.current.getScreenCTM()?.inverse())
    targetX = cursorPt.x
    targetY = cursorPt.y
  }

  let { rects, count } = state

  return (
    <div>
      <svg width={width} height={height} ref={refSvg}>
        <g>
          <Packed
            x={root.x}
            y={root.y}
            r={root.r}
            name={root.name || 'Root'}
            childs={root.children}
            depth={0}
          />
        </g>
      </svg>

      {/* <pre>{JSON.stringify(root.data, null, 2)}</pre> */}
    </div>
  )
}
