import * as d3 from 'd3'
import l from 'lodash'
import React from 'react'
import { useAnimationForever } from '../../../lib/useAnimationForever'
import { Translate } from './../graphs/Translate-sidecar'

interface ILabel {
  val: number
  label?: string
}
interface IDataPoint {
  angle: number
  val: number
  random: number
}
export const ScratchRadial = (props: {
  name: string
  labels: ILabel[]
  x: number
  y: number
  r: number
  updateIntervalSeconds: number
  maxTicks: number
  maxLabel: number
  ticksFunc: () => number
}) => {
  let [data, setData] = React.useState([] as IDataPoint[])
  let [tick, setTick] = React.useState(0)

  let elapsed = useAnimationForever()

  React.useEffect(() => {
    _generateData()
  }, [])
  React.useEffect(() => {
    setTick(props.ticksFunc())
  })

  const _generateData = () => {
    let data2: IDataPoint[] = []
    l.forEach(l.range(0, props.maxTicks), (c) => {
      data2.push({
        angle: c,
        val: c,
        random: l.random(-1, 1, true),
      })
    })
    setData(data2)
    setTick(props.ticksFunc())
  }

  let { x, y, r, maxTicks, maxLabel, labels } = props

  data = l.take(data, tick)

  let scaleScratchXAngle = d3
    .scaleLinear()
    .domain([0, maxTicks])
    .range([0, Math.PI * 2])
  let scaleScratchXAngleDeg = d3
    .scaleLinear()
    .domain([0, maxTicks])
    .range([0, 360])

  let scaleScratchY = d3
    .scaleLinear()
    .domain([-1, 1])
    .range([r - 20, r + 20])

  let lineFuncRandom = d3
    .radialLine()
    .radius((d: any) => scaleScratchY(d.random))
    .angle((d: any) => scaleScratchXAngle(d.angle)) as any

  lineFuncRandom.curve(d3.curveCatmullRom.alpha(0.5))

  let posY = 0
  let posX = 0
  if (data.length > 0) {
    let last = data[data.length - 1]
    posY = scaleScratchY(last.random)
    posX = scaleScratchXAngleDeg(last.angle)
  }

  return (
    <Translate x={x} y={y}>
      {l.map(labels, (c) => (
        <g
          key={'label_' + c.val}
          transform={`rotate(${(c.val / maxLabel) * 360 - 180})`}
        >
          <Translate x={0} y={r}>
            <text dy={6} alignmentBaseline='middle' textAnchor='middle'>
              {'' + c.label}
            </text>
            <circle cx={0} cy={-6} fill='blue' r={2} />
          </Translate>
        </g>
      ))}
      <path
        d={lineFuncRandom(data)}
        stroke={'blue'}
        fill='none'
        strokeWidth={2}
        strokeOpacity={0.75}
      />
      <g transform={`rotate(${posX - 180})`}>
        <Translate x={0} y={posY}>
          <circle cx={0} cy={0} fill='blue' r={3} />
        </Translate>
      </g>
    </Translate>
  )
}
