import { addDays, endOfHour, format, subHours } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'

/*
export function dateFormattedRound(numberDays: number): string {
  const a = dayjs(Date.now())
  const nowDate = a.add(numberDays, 'day')

  return nowDate.format("dd 'de' MMMM")
}
*/

export function dateFormattedRound(numberDays: number): string {
  const nowDate = addDays(Date.now(), numberDays)

  return format(new Date(nowDate), "dd 'de' MMMM", {
    locale: ptBR,
  })
}

export function dateFormatted(date: string): string {
  const nowDate = subHours(endOfHour(new Date(date)), 3)

  return format(new Date(nowDate), 'dd/MM/yyyy', {
    locale: ptBR,
  })
}

export function dateFormattedDayMonth(date: string): string {
  const nowDate = subHours(endOfHour(new Date(date)), 3)

  return format(new Date(nowDate), 'dd/MMM', {
    locale: ptBR,
  })
}

export function dateFormattedHourMin(date: string): string {
  const nowDate = subHours(endOfHour(new Date(date)), 3)

  return format(new Date(nowDate), 'HH:mm', {
    locale: ptBR,
  })
}

export function dateFormattedBirthDate(date: string): string {
  return format(new Date(date), 'dd/MM/yyyy', {
    locale: ptBR,
  })
}
