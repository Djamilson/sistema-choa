import { addDays, differenceInDays, format } from 'date-fns'
import dayjs, { Dayjs } from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { IDateProvider } from '../IDateProvider'

dayjs.extend(utc)

class DayjsDateProvider implements IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number {
    const end_date_utc = this.convertToUTC(end_date)
    const start_date_utc = this.convertToUTC(start_date)

    return dayjs(end_date_utc).diff(start_date_utc, 'hours')
  }

  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format()
  }

  dateNow(): Date {
    return dayjs().toDate()
  }

  compareInDays(start_date: Date, end_date: Date): number {
    const end_date_utc = this.convertToUTC(end_date)
    const start_date_utc = this.convertToUTC(start_date)

    return dayjs(end_date_utc).diff(start_date_utc)
  }

  isDate(input: Date) {
    return dayjs(input).isValid()
  }

  current_date(start_date: Date): boolean {
    const dateNow = this.convertToUTC(new Date(this.dateNow()))
    const start_date_utc = this.convertToUTC(new Date(start_date))

    console.log('1---', dateNow)
    console.log('2---', start_date_utc)
    console.log('3---', dayjs(dateNow).isBefore(start_date_utc))

    if (!this.isDate(start_date)) {
      throw new Error('Formato de data inválido para start_date_utc')
    }

    return dayjs(dateNow).isBefore(start_date_utc)
  }

  addDays(days: number): Date {
    return dayjs().add(days, 'days').toDate()
  }

  addHours(hour: number): Dayjs {
    return dayjs().add(hour, 'hour')
  }

  quantityDays(startDate: Date, end_date: Date): number {
    const dStart = Number(format(startDate, 'dd'))
    const mStart = Number(format(startDate, 'MM'))
    const yStart = Number(format(startDate, 'yyyy'))

    const dExpectedReturn = Number(format(end_date, 'dd'))
    const mExpectedReturn = Number(format(end_date, 'MM'))
    const yExpectedReturn = Number(format(end_date, 'yyyy'))

    const dateDay = differenceInDays(
      new Date(yExpectedReturn, mExpectedReturn, dExpectedReturn, 23, 0),
      new Date(yStart, mStart, dStart, 0, 0),
    )

    return dateDay > 0 ? dateDay + 1 : 1
  }

  arrayDates(startDate: Date, end_date: Date): string[] {
    const dStart = Number(format(startDate, 'dd'))
    const mStart = Number(format(startDate, 'MM'))
    const yStart = Number(format(startDate, 'yyyy'))

    const dExpectedReturn = Number(format(end_date, 'dd'))
    const mExpectedReturn = Number(format(end_date, 'MM'))
    const yExpectedReturn = Number(format(end_date, 'yyyy'))

    const dateDay = differenceInDays(
      new Date(yExpectedReturn, mExpectedReturn, dExpectedReturn, 23, 0),
      new Date(yStart, mStart, dStart, 0, 0),
    )

    const myDates = [...new Array(dateDay > 0 ? dateDay + 1 : 1)].map(
      (_, idx) => {
        const meDate = addDays(startDate, idx)

        return format(meDate, 'yyyy-MM-dd')
      },
    )

    return myDates
  }

  arrayDatesBD(startDate: Date, end_date: Date): string[] {
    const dStart = Number(format(startDate, 'dd'))

    const mStart = Number(format(startDate, 'MM'))
    const yStart = Number(format(startDate, 'yyyy'))

    const dExpectedReturn = Number(format(end_date, 'dd'))
    const mExpectedReturn = Number(format(end_date, 'MM'))
    const yExpectedReturn = Number(format(end_date, 'yyyy'))

    const dateDay = differenceInDays(
      new Date(yExpectedReturn, mExpectedReturn, dExpectedReturn, 23, 0),
      new Date(yStart, mStart, dStart, 0, 0),
    )

    const myDates = [...new Array(dateDay > 0 ? dateDay + 1 : 1)].map(
      (_, idx) => {
        const meDate = addDays(startDate, idx)

        return format(meDate, 'yyyy-MM-dd')
      },
    )

    return myDates
  }

  formatDateToUTC(date: string): Date {
    const now = new Date(date)
    return new Date(now.getTime() - now.getTimezoneOffset() * 60000)
  }

  checkDateAvailable(myArrayDate: string[], arrayBDRental: any): boolean {
    if (arrayBDRental && arrayBDRental?.length > 0) {
      const p = arrayBDRental?.map((item: any) => {
        const myArrayDatee = this.arrayDatesBD(
          this.formatDateToUTC(item.start_date),
          this.formatDateToUTC(item.expected_return_date),
        )

        return myArrayDatee
      })

      const hasAllRoles = p.some((item: any) =>
        item.some((object: any) => {
          return myArrayDate.includes(object)
        }),
      )

      return hasAllRoles
    }

    return false
  }
}

export default DayjsDateProvider
