import { ICompany } from '../company'
import { IService } from '../service'

export type IMaintenance = {
  id: string
  created_at: Date
  updated_at: Date

  description: string
  status: string
  price: number
  company_id: string
  company: ICompany

  service_id: string
  service: IService
}
