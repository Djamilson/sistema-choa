interface ICreateCarDTO {
  name: string
  acronym: string
  brand: string
  description?: string
  fuel_type: string
  plate: string
}

interface IPageCarDTO {
  page: number
  pageSize: number
  query: string
}

export { ICreateCarDTO, IPageCarDTO }
