import { clockUtil } from './clockUtil-sidecar'
import { Graph } from '../graphs/Graph-sidecar'
import { ScratchLinear } from './ScratchLinear-sidecar'
import l from 'lodash'
import { Layout } from '../../layout/Layout-sidecar'
import { Abstract, Published } from '../../shared/Abstract-sidecar'
import { ZenLink } from '../../shared/ZenLink'

const scratchWidth = 750
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

export const ScratchClockLinearFull = () => {
  return (
    <Layout title='Scratch Clock Linear'>
      <Abstract>
        See your life scratch away. Originally part of the Trash-Compactor
        collection.
        <Published>Republished: 5/10/2020</Published>
      </Abstract>

      <ZenLink href='/scratch-clock-linear-zen' />

      <ScratchClockLinear />
    </Layout>
  )
}

export const ScratchClockLinear = () => {
  let daysInMonth = clockUtil.daysInMonth()
  let labelsMonth = clockUtil.monthLabels()
  let labelsDates = clockUtil.dateLabels()
  let hourLabels = clockUtil.hourLabels()

  return (
    <div>
      <div>
        <Graph width={scratchWidth + 100} height={400}>
          <ScratchLinear
            name='Month in year'
            labels={labelsMonth}
            x={0}
            y={50}
            width={scratchWidth}
            updateIntervalSeconds={60}
            maxTicks={numTicksGeneral}
            maxLabel={12}
            ticksFunc={_ticksMonthInYear}
          />

          <ScratchLinear
            name='Date in month'
            labels={labelsDates}
            x={0}
            y={100}
            width={scratchWidth}
            updateIntervalSeconds={60}
            maxTicks={numTicksGeneral}
            maxLabel={daysInMonth}
            ticksFunc={_ticksDayInMonth}
          />

          <ScratchLinear
            name='Hour in day'
            labels={hourLabels}
            x={0}
            y={150}
            width={scratchWidth}
            updateIntervalSeconds={60}
            maxTicks={numTicksGeneral}
            maxLabel={24}
            ticksFunc={_ticksHourInDay}
          />

          <ScratchLinear
            name='Minutes in Hour'
            labels={l.map(l.range(0, 60 + 1, 5), (c) => ({
              val: c,
              label: '' + c,
            }))}
            x={0}
            y={200}
            width={scratchWidth}
            updateIntervalSeconds={10}
            maxTicks={numTicksGeneral}
            maxLabel={60}
            ticksFunc={_ticksMinutesInHour}
          />

          <ScratchLinear
            name='Seconds in Minute'
            labels={l.map(l.range(0, 60 + 1, 5), (c) => ({
              val: c,
              label: '' + c,
            }))}
            x={0}
            y={250}
            width={scratchWidth}
            updateIntervalSeconds={0.1}
            maxTicks={numTicksGeneral}
            maxLabel={60}
            ticksFunc={_ticksSecondsInMinute}
          />
        </Graph>
      </div>
    </div>
  )
}
