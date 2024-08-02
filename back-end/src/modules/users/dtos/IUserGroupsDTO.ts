import { Group } from '../infra/typeprisma/entities/Group'

export type IGroupDTO = {
  id: string
  name: string
  description: string
}

export type IUserCompanyGroupsDTO = {
  company_id: string
  status: boolean
  groups: Group[]
}
