type ICreatePersonDTO = {
  name: string
  email: string
  cpf: string
  birth_date: Date
  rg?: string
  rgss?: string
}

type ICreatePersonDashBoardDTO = {
  name: string
  email: string
  phone: string
  cpf: string
  birth_date: Date
  rg?: string
  rgss?: string
}

type IGroupsIds = {
  group_id: string
  company_id: string
}

type ICreateUserDTO = {
  person: ICreatePersonDTO
  password: string
  groups: IGroupsIds[]
}

type ICreateUserCollaborationDTO = {
  person: ICreatePersonDTO
  password: string
  phone: string
}

type ICreateUserCollaborationDashboardDTO = {
  person: ICreatePersonDashBoardDTO
  password: string
  group: {
    company_id: string
    group_id: string
  }
}

type ICreatePhoneDTO = {
  phone: string
  person_id: string
}

type ICreateAddressDTO = {
  receiver_id: string
  number: number
  street: string
  complement: string | null | undefined
  zip_code: string
  neighborhood: string
  city: string
  state: string
}

type ICreatePersonAndPhoneAndAddressDTO = {
  user: ICreateUserDTO
  phone: string
  address: ICreateAddressDTO
}

type ICreateForgotTokenDTO = {
  user_id: string
  token: string
  code: string
  expires_date: Date
}

type ICreateUserGroupDTO = {
  user_id: string
  group_id: string
}

type ICreateUserReflexTokenDTO = {
  user_id: string
  expires_date: Date
  reflesh_token: string
}

type IUserIdOnCompanyId = {
  user_id: string
  company_id: string
}

export type {
  ICreateAddressDTO,
  ICreateForgotTokenDTO,
  ICreatePersonAndPhoneAndAddressDTO,
  ICreatePersonDTO,
  ICreatePhoneDTO,
  ICreateUserCollaborationDTO,
  ICreateUserCollaborationDashboardDTO,
  ICreateUserDTO,
  ICreateUserGroupDTO,
  ICreateUserReflexTokenDTO,
  IGroupsIds,
  IUserIdOnCompanyId
}

