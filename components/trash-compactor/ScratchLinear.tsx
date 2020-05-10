import { Translate } from './graphs/Translate-sidecar'
import React from 'react'
import { useAnimationForever } from '../../lib/useAnimationForever-sidecar'
import l from 'lodash'
import * as d3 from 'd3'

interface ILabel {
  val: number
  label?: string
}
interface IDataPoint {
  angle: number
  val: number
  random: number
}
export const ScratchLinear = (props: {
  name: string
  labels: ILabel[]
  x: number
  y: number
  width: number
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

  let { x, y, width, maxTicks, maxLabel, labels } = props

  data = l.take(data, tick)

  let scaleScratchX = d3.scaleLinear().domain([0, maxTicks]).range([0, width])
  let scaleScratchY = d3.scaleLinear().domain([-1, 1]).range([-20, 20])

  let line = d3.line() as any
  let lineFuncRandom = line
    .y((d: IDataPoint) => scaleScratchY(d.random))
    .x((d: IDataPoint) => scaleScratchX(d.angle))

  lineFuncRandom.curve(d3.curveCatmullRom.alpha(0.5))

  let posY = 0
  let posX = 0
  if (data.length > 0) {
    let last = data[data.length - 1]
    posY = scaleScratchY(last.random)
    posX = scaleScratchX(last.angle)
  }

  return (
    <Translate x={x} y={y}>
      {l.map(labels, (c, cIdx) => (
        <g
          key={cIdx}
          transform={`translate(${scaleScratchX(
            (c.val / maxLabel) * maxTicks,
          )}, 0)`}
        >
          <text dx={4} alignmentBaseline='middle'>
            {'' + c.label}
          </text>
          <circle cx={0} cy={0} fill='blue' r={2} />
        </g>
      ))}
      <path
        d={lineFuncRandom(data)}
        stroke={'blue'}
        fill='none'
        strokeWidth={2}
        strokeOpacity={0.75}
      />
      <g transform={`translate(${posX}, ${posY})`}>
        <circle cx={0} cy={0} fill='blue' r={3} />
      </g>
    </Translate>
  )
}
