import * as d3 from 'd3'
import l from 'lodash'
import moment from 'moment'
import React from 'react'
import { useAnimationForever } from '../../../lib/useAnimationForever'
import { Layout } from '../../layout/Layout-sidecar'
import { Abstract, Published } from '../../shared/Abstract-sidecar'
import { ZenLink } from '../../shared/ZenLink'
import { clockUtil } from './clockUtil-sidecar'
import { Graph } from './../graphs/Graph'
import { Translate } from './../graphs/Translate-sidecar'
import { ScratchRadial } from './ScratchRadial'

const scratchWidth = 750
const subSecondTicks = 10
const numTicks = 60 * subSecondTicks

const numTicksGeneral = 60 * 10

const numTicksSecondsInMinute = numTicksGeneral
const numTicksMinutesInHour = numTicksGeneral
const numTicksHourInDay = numTicksGeneral
const numTicksDayInMonth = numTicksGeneral
const numTicksMonthInYear = numTicksGeneral

function _ticksMonthInYear() {
  return clockUtil.ticksMonthInYear(numTicksMonthInYear)
}

function _ticksDayInMonth() {
  return clockUtil.ticksDayInMonth(numTicksDayInMonth)
}

function _ticksHourInDay() {
  return clockUtil.ticksHourInDay(numTicksHourInDay)
}

function _ticksMinutesInHour() {
  return clockUtil.ticksMinutesInHour(numTicksMinutesInHour)
}

function _ticksSecondsInMinute() {
  return clockUtil.ticksSecondsInMinute(numTicksSecondsInMinute)
}

export const ScratchClockRadialAltFull = () => {
  return (
    <Layout title='Scratch Clock Radial (Alternate)'>
      <Abstract>
        See your life scratch away. Originally part of the Trash-Compactor
        collection.
        <Published>Republished: 5/10/2020</Published>
      </Abstract>

      <ZenLink href='/scratch-clock-radial-alt-zen' />

      <ScratchClockRadialAlt />
    </Layout>
  )
}

export const ScratchClockRadialAlt = () => {
  let [data, setData] = React.useState([] as any[])
  let [tick, setTick] = React.useState(0)

  let elapsed = useAnimationForever()

  const _generateData = () => {
    let data2: any = []
    l.forEach(l.range(0, numTicks), (c) => {
      data2.push({
        angle: c,
        val: c,
        random: l.random(4, 7),
      })
    })
    setData(data2)
    setTick(0)
  }

  React.useEffect(() => {
    _generateData()
  }, [])

  const _update = () => {
    let tick = 0
    tick = moment().second() * subSecondTicks
    tick += Math.floor(moment().millisecond() / (1000 / subSecondTicks))
    setTick(tick)
  }

  let daysInMonth = clockUtil.daysInMonth()
  let labelsMonth = clockUtil.monthLabels(false)
  let labelsDates = clockUtil.dateLabels(false)
  let hourLabels = clockUtil.hourLabels()

  let innerSpacing = 50
  let spacing = 35
  let maxSize = (innerSpacing + spacing * 4) * 2 + 40

  data = l.take(data, tick)

  let lineFuncSpiral = d3
    .radialLine()
    .radius((d: any) => d.val)
    .angle((d: any) => scaleAngle(d.angle))
  let scaleAngle = d3
    .scaleLinear()
    .domain([0, numTicks])
    .range([0, Math.PI * 2])
  let scaleAngleDeg = d3.scaleLinear().domain([0, numTicks]).range([0, 360])
  let r = d3.scaleLinear().domain([0, 8]).range([0, 100])
  let lineFuncRandom = d3
    .radialLine()
    .radius((d: any) => r(d.random))
    .angle((d: any) => scaleAngle(d.angle))

  lineFuncRandom.curve(d3.curveCatmullRom.alpha(0.5))

  let posRadius = 0
  let posAngle = 0
  if (data.length > 0) {
    let last = data[data.length - 1]
    posRadius = r(last.random)
    posAngle = scaleAngleDeg(last.angle)
  }

  let time = moment()

  return (
    <div>
      <div>
        radial clock {tick}
        {time.format('MMMM Do YYYY, h:mm:ss:SSS a')}
        <Graph width={maxSize} height={maxSize}>
          <Translate x={maxSize / 2} y={maxSize / 2}>
            <ScratchRadial
              name='Month in year'
              labels={labelsMonth}
              x={0}
              y={0}
              r={innerSpacing + spacing * 4}
              updateIntervalSeconds={60}
              maxTicks={numTicksGeneral}
              maxLabel={12}
              ticksFunc={_ticksMonthInYear}
            />

            <ScratchRadial
              name='Date in month'
              labels={labelsDates}
              x={0}
              y={0}
              r={innerSpacing + spacing * 3}
              updateIntervalSeconds={60}
              maxTicks={numTicksGeneral}
              maxLabel={daysInMonth}
              ticksFunc={_ticksDayInMonth}
            />

            <ScratchRadial
              name='Hour in day'
              labels={hourLabels}
              x={0}
              y={0}
              r={innerSpacing + spacing * 2}
              updateIntervalSeconds={60}
              maxTicks={numTicksGeneral}
              maxLabel={24}
              ticksFunc={_ticksHourInDay}
            />

            <ScratchRadial
              name='Minutes in Hour'
              labels={l.map(l.range(0, 60 + 0, 5), (c) => ({
                val: c,
                label: '' + c,
              }))}
              x={0}
              y={0}
              r={innerSpacing + spacing * 1}
              updateIntervalSeconds={10}
              maxTicks={numTicksGeneral}
              maxLabel={60}
              ticksFunc={_ticksMinutesInHour}
            />

            <ScratchRadial
              name='Seconds in Minute'
              labels={l.map(l.range(0, 60 + 0, 5), (c) => ({
                val: c,
                label: '' + c,
              }))}
              x={0}
              y={0}
              r={innerSpacing + spacing * 0}
              updateIntervalSeconds={0.1}
              maxTicks={numTicksGeneral}
              maxLabel={60}
              ticksFunc={_ticksSecondsInMinute}
            />
          </Translate>
          <Translate x={100} y={100}>
            {l.map(l.range(0, 60, 5), (c) => (
              <g transform={`rotate(${(c / 60) * 360 - 90})`}>
                <g transform={`translate(50, 0)`}>
                  <text>{c}</text>
                </g>
              </g>
            ))}
            <path
              d={lineFuncSpiral(data) as string}
              stroke={'red'}
              fill='none'
              strokeWidth={2}
            />
            <path
              d={lineFuncRandom(data) as string}
              stroke={'blue'}
              fill='none'
              strokeWidth={2}
            />
            <g transform={`rotate(${posAngle - 90})`}>
              <g transform={`translate(${posRadius}, 0)`}>
                <circle cx={0} cy={0} fill='green' r={5} />
              </g>
            </g>
          </Translate>
          >
        </Graph>
      </div>
    </div>
  )
}
