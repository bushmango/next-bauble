import l from 'lodash'
import React from 'react'
import { useAnimationForever } from '../../lib/useAnimationForever'
import { Layout } from '../layout/Layout'
import { Abstract, Published } from '../shared/Abstract'
import { clockUtil } from '../trash-compactor/clocks/clockUtil-sidecar'
import { Graph } from '../trash-compactor/graphs/Graph'
import { Translate } from '../trash-compactor/graphs/Translate'

const numTicksGeneral = 60 * 10

const numTicksSecondsInMinute = numTicksGeneral
const numTicksHourInDay = numTicksGeneral

function _ticksHourInHalfDay() {
  return clockUtil.ticksHourInHalfDay(numTicksHourInDay)
}

function _ticksSecondsInMinute() {
  return clockUtil.ticksSecondsInMinute(numTicksSecondsInMinute)
}

export const ClockPennyFarthingFull = () => {
  return (
    <Layout title='Penny-Farthing Clock'>
      <Abstract>
        Penny-farthing clock
        <Published>In development</Published>
      </Abstract>

      {/* <ZenLink href='/scratch-clock-radial-zen' /> */}

      <ClockPennyFarthing />
    </Layout>
  )
}

export const ClockPennyFarthing = () => {
  let innerSpacing = 50
  let spacing = 35
  let maxSize = (innerSpacing + spacing * 4) * 2 + 40

  return (
    <div>
      <div>
        <div style={{ position: 'relative', minHeight: '400px' }}>
          <div style={{ position: 'absolute' }}>
            <Graph width={maxSize} height={maxSize} fill=''>
              <Translate x={155} y={190}>
                <Rotator
                  rotOffset={0}
                  name='Hour'
                  labels={l.map(l.range(1, 12 + 1, 1), (c) => ({
                    val: c,
                    label: '' + c,
                  }))}
                  x={0}
                  y={0}
                  r={135}
                  fontSize={20}
                  textAdjust={-20}
                  updateIntervalSeconds={0.1}
                  maxTicks={numTicksGeneral}
                  maxLabel={12}
                  ticksFunc={_ticksHourInHalfDay}
                />
              </Translate>

              <Translate x={325} y={248}>
                <Rotator
                  name='Seconds in Minute'
                  labels={l.map(l.range(0, 60 + 0, 5), (c) => ({
                    val: c,
                    label: '' + c,
                  }))}
                  rotOffset={-23}
                  x={0}
                  y={0}
                  r={40}
                  textAdjust={-12}
                  fontSize={10}
                  updateIntervalSeconds={0.1}
                  maxTicks={numTicksGeneral}
                  maxLabel={60}
                  ticksFunc={_ticksSecondsInMinute}
                />
              </Translate>
            </Graph>
          </div>
          <div style={{ position: 'absolute' }}>
            <img src='/svgs/penny-farthing-clock.svg' />
          </div>
        </div>
      </div>
    </div>
  )
}

interface ILabel {
  val: number
  label?: string
}
export const Rotator = (props: {
  name: string
  labels: ILabel[]
  x: number
  y: number
  r: number
  textAdjust: number
  fontSize: number
  updateIntervalSeconds: number
  maxTicks: number
  maxLabel: number
  rotOffset: number
  ticksFunc: () => number
}) => {
  let [tick, setTick] = React.useState(0)

  let elapsed = useAnimationForever()

  React.useEffect(() => {
    // _generateData()
  }, [])
  React.useEffect(() => {
    setTick(props.ticksFunc())
  })

  let { x, y, r, maxTicks, maxLabel, labels } = props

  let rot = tick / maxTicks

  let posY = 0
  let posX = 0

  return (
    <Translate x={x} y={y}>
      <circle cx={0} cy={0} fill='#777' r={props.r * 1} />
      <circle cx={0} cy={0} fill='#BFBFBF' r={props.r * 0.95} />

      {/* <path stroke={'green'} fill='white' d='M 100 100 A 50 50 0 0 0 0 0' /> */}

      <g transform={`rotate(${-rot * 360 + props.rotOffset})`}>
        {l.map(labels, (c) => (
          <g
            key={'label_' + c.val}
            transform={`rotate(${(c.val / maxLabel) * 360 - 180})`}
          >
            <Translate x={0} y={r}>
              <text
                dy={props.textAdjust}
                fontSize={props.fontSize}
                alignmentBaseline='middle'
                textAnchor='middle'
              >
                {'' + c.label}
              </text>
              <circle cx={0} cy={-props.fontSize / 2} fill='#333' r={2} />
              <line
                x1={0}
                y1={-r * 0.05 + props.textAdjust * 1.3}
                x2={0}
                y2={-r * 0.9}
                stroke={'#555'}
              />
            </Translate>
          </g>
        ))}

        <Translate x={0} y={posY}>
          <circle cx={0} cy={0} fill='#333' r={3} />
        </Translate>
      </g>
    </Translate>
  )
}
