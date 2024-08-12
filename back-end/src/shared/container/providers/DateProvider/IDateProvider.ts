import { Dayjs } from 'dayjs'

interface IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number
  convertToUTC(date: Date): string
  formatDateToUTC(date: string): Date
  current_date(start_date: Date): boolean
  dateNow(): Date
  compareInDays(start_date: Date, end_date: Date): number
  addDays(days: number): Date
  addHours(hour: number): Dayjs
  arrayDates(startDate: Date, end_date: Date): string[]
  arrayDatesBD(startDate: Date, end_date: Date): string[]
  quantityDays(startDate: Date, end_date: Date): number
  checkDateAvailable(arrayUser: string[], arrayBD: any): boolean
}

export { IDateProvider }
