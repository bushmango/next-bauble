import l from 'lodash'
import React from 'react'
import { useAnimationForever } from '../../lib/useAnimationForever'
import { Layout } from '../layout/Layout'
import { Abstract, Published } from '../shared/Abstract'
import { clockUtil } from '../trash-compactor/clocks/clockUtil-sidecar'
import { Graph } from '../trash-compactor/graphs/Graph'
import { Translate } from '../trash-compactor/graphs/Translate'

const subSecondTicks = 10
const numTicks = 60 * subSecondTicks

const numTicksGeneral = 60 * 10

const numTicksSecondsInMinute = numTicksGeneral
const numTicksMinutesInHour = numTicksGeneral
const numTicksHourInDay = numTicksGeneral
const numTicksDayInMonth = numTicksGeneral
const numTicksMonthInYear = numTicksGeneral

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
  let daysInMonth = clockUtil.daysInMonth()
  let labelsMonth = clockUtil.monthLabels(false)
  let labelsDates = clockUtil.dateLabels(false)
  let hourLabels = clockUtil.hourLabels()

  let innerSpacing = 50
  let spacing = 35
  let maxSize = (innerSpacing + spacing * 4) * 2 + 40

  return (
    <div>
      <div>
        <div style={{ position: 'relative', minHeight: '400px' }}>
          <div style={{ position: 'absolute' }}>
            <img src='/svgs/penny-farthing-clock.svg' />
          </div>
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
                  r={110}
                  fontSize={20}
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
                  r={30}
                  fontSize={10}
                  updateIntervalSeconds={0.1}
                  maxTicks={numTicksGeneral}
                  maxLabel={60}
                  ticksFunc={_ticksSecondsInMinute}
                />
              </Translate>
            </Graph>
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
      <g transform={`rotate(${-rot * 360 + props.rotOffset})`}>
        {l.map(labels, (c) => (
          <g
            key={'label_' + c.val}
            transform={`rotate(${(c.val / maxLabel) * 360 - 180})`}
          >
            <Translate x={0} y={r}>
              <text
                dy={6}
                fontSize={props.fontSize}
                alignmentBaseline='middle'
                textAnchor='middle'
              >
                {'' + c.label}
              </text>
              <circle cx={0} cy={-6} fill='blue' r={2} />
            </Translate>
          </g>
        ))}

        <Translate x={0} y={posY}>
          <circle cx={0} cy={0} fill='blue' r={3} />
        </Translate>
      </g>
    </Translate>
  )
}
