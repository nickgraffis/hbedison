export type Day = {
  date: string
  isToday: boolean
  isSelected: boolean
  isWeekend: boolean
  week: number
  month: number
  year: number
  dayOfWeek: number
}

export type Week = {
  days: Day[]
  week: number
  year: number
  month: number
}

export type Month = {
  weeks: Week[]
  month: number
  year: number
}

export type Year = {
  months: Month[]
  year: number
}

export type Minute = {
  date: Date
  week: Number
  month: Number
  year: Number
  day: Number
  isAm: Boolean
  hour: Number
  minutes: Number
}

export type Hour = {
  date: Date
  week: Number
  month: Number
  year: Number
  day: Number
  isAm: Boolean
  hour: Number
  minutes?: Minute
}

export type Matrix<T> = {
  prev: T
  current: T
  next: T
}

export function getNumberOfWeeksInMonth(month: number, year: number): number {
  const date = new Date(year, month, 1)
  const day = date.getDay()
  const lastDay = new Date(year, month + 1, 0).getDate()
  return Math.ceil((lastDay + day) / 7)
}

export function getDateCellByIndex(weekIndex: number, dayIndex: number, month: number, year: number): Date {
  const date = new Date(year, month, 1)
  const day = date.getDay()
  const lastDay = new Date(year, month + 1, 0).getDate()
  const firstDayIndex = day === 0 ? 6 : day - 1
  const lastDayIndex = firstDayIndex + lastDay
  const index = weekIndex * 7 + dayIndex
  const dateIndex = index - firstDayIndex
  const dateCell = new Date(year, month, dateIndex)
  return dateCell
}

export function getWeeksInMonth(month: number, year: number): Week[] {
  const weeks: Week[] = []
  const numberOfWeeks = getNumberOfWeeksInMonth(month, year)
  for (let i = 0; i < numberOfWeeks; i++) {
    const days: Day[] = []
    for (let j = 0; j < 7; j++) {
      const date = getDateCellByIndex(i, j, month, year)
      days.push({
        date: date.toISOString().split('T')[0],
        isToday: date.getDate() === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear(),
        isSelected: false,
        isWeekend: date.getDay() === 0 || date.getDay() === 6,
        dayOfWeek: date.getDay(),
        week: i,
        month,
        year,
      })
    }
    weeks.push({
      days,
      week: i,
      year,
      month,
    })
  }
  return weeks
}

export function createMonth(month: number, year: number): Month {
  return {
    weeks: getWeeksInMonth(month, year),
    month,
    year,
  }
}

export function createMonthViewMatrix(month: number, year: number): Matrix<Month> {
  const prevMonth = month === 0 ? 11 : month - 1
  const nextMonth = month === 11 ? 0 : month + 1
  const prevYear = month === 0 ? year - 1 : year
  const nextYear = month === 11 ? year + 1 : year
  return {
    prev: createMonth(prevMonth, prevYear),
    current: createMonth(month, year),
    next: createMonth(nextMonth, nextYear),
  }
}
