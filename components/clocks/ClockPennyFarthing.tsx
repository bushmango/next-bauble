import l from 'lodash'
import React from 'react'
import { Layout } from '../layout/Layout'
import { Abstract, Published } from '../shared/Abstract'
import { ZenLink } from '../shared/ZenLink'
import { clockUtil } from '../trash-compactor/clocks/clockUtil-sidecar'
import { ScratchRadial } from '../trash-compactor/clocks/ScratchRadial'
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
            fdsa
            <img src='/svgs/penny-farthing-clock.svg' />
          </div>
          <div style={{ position: 'absolute' }}>
            asdf
            <Graph width={maxSize} height={maxSize} fill=''>
              <Translate x={190} y={165}>
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
      </div>
    </div>
  )
}
