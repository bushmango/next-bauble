import moment from 'moment'
import l from 'lodash'

export function ticksMonthInYear(numTicksMonthInYear: number) {
  let tick = 0
  let subTicks = numTicksMonthInYear / 12
  tick = moment().month() * subTicks
  tick += Math.floor((moment().date() / moment().daysInMonth()) * subTicks)
  return tick
}
export function ticksDayInMonth(numTicksDayInMonth: number) {
  let tick = 0
  let subTicks = numTicksDayInMonth / (moment().daysInMonth() - 1)
  tick = (moment().date() - 1) * subTicks
  tick += Math.floor((moment().hour() / 24) * subTicks)
  return tick
}
export function ticksHourInDay(numTicksHourInDay: number) {
  let tick = 0
  let subHourTicks = numTicksHourInDay / 24
  tick = moment().hour() * subHourTicks
  tick += Math.floor((moment().minute() / 60) * subHourTicks)
  return tick
}
export function ticksMinutesInHour(numTicksMinutesInHour: number) {
  let tick = 0
  let subMinuteTicks = numTicksMinutesInHour / 60
  tick = moment().minute() * subMinuteTicks
  tick += Math.floor((moment().second() / 60) * subMinuteTicks)
  return tick
}
export function ticksSecondsInMinute(numTicksSecondsInMinute: number) {
  let tick = 0
  let subSecondTicks = numTicksSecondsInMinute / 60
  tick = moment().second() * subSecondTicks
  tick += Math.floor((moment().milliseconds() / 1000) * subSecondTicks)
  return tick
}

export function hourLabels() {
  return l.map(l.range(1, 24 + 1), (c) => {
    let label = '' + (c % 12)
    if (label === '0') {
      label = '12'
    }
    return { val: c, label }
  })
}
export function monthLabels(includeEnd = true) {
  let labelsMonth = l.map(l.range(0, 12), (c) => ({
    val: c,
    label: moment().day(1).month(c).format('MMM'),
  }))
  if (includeEnd) {
    labelsMonth.push({ val: 12, label: '' })
  }
  return labelsMonth
}
export function daysInMonth() {
  return moment().daysInMonth()
}
export function dateLabels(includeEnd = true) {
  let labelsDate = l.map(l.range(0, daysInMonth()), (c) => ({
    val: c,
    label: '' + (c + 1),
  }))
  if (includeEnd) {
    labelsDate.push({ val: daysInMonth(), label: '' })
  }
  return labelsDate
}
