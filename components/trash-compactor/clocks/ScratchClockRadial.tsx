import l from 'lodash'
import { Layout } from '../../layout/Layout'
import { Abstract, Published } from '../../shared/Abstract'
import { ZenLink } from '../../shared/ZenLink'
import * as clockUtil from './clockUtil'
import { Graph } from './../graphs/Graph'
import { Translate } from './../graphs/Translate'
import { ScratchRadial } from './ScratchRadial'

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

export const ScratchClockRadialFull = () => {
  return (
    <Layout title='Scratch Clock Radial'>
      <Abstract>
        See your life scratch away. Originally part of the Trash-Compactor
        collection.
        <Published>Republished: 5/10/2020</Published>
      </Abstract>

      <ZenLink href='/scratch-clock-radial-zen' />

      <ScratchClockRadial />
    </Layout>
  )
}

export const ScratchClockRadial = () => {
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
        </Graph>
      </div>
    </div>
  )
}
