import { IMaintenance } from '../maintenance'
import { IMaintenanceService } from '../maintenanceService'

export type ICompany = {
  id: string
  created_at: Date
  updated_at: Date

  name: string
  phone: string
  maintenances: IMaintenance[]
  maintenanceServices: IMaintenanceService[]
}
