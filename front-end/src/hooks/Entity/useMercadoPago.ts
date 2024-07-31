import ICategory from '@/@model/category/category'
import { api } from '@/_services/apiClient'
import { IPayerProps } from '@/app/(authenticated)/payments/usePayments'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

export enum TypeCategory {
  MENU = 'menu',
  SLIDE = 'slide',
}

type ICategoriesByInitialCategories = {
  type: TypeCategory
  categories: ICategory[]
}

export async function getCategories(type: TypeCategory): Promise<ICategory[]> {
  const url = `categories/${type}`

  const { data } = await api.get(url)

  return data
}

export function useCategoriesByInitialCategories({
  type,
  categories,
}: ICategoriesByInitialCategories) {
  return useQuery({
    queryKey: [`initial-categories-${type}`],
    queryFn: () => getCategories(type),
    initialData: categories,
  }) as UseQueryResult<ICategory[], unknown>
}

export function useCategories(type: TypeCategory) {
  return useQuery({
    queryKey: [`hydrate-categories-${type}`],
    queryFn: () => getCategories(type),
  }) as UseQueryResult<ICategory[], unknown>
}

export async function getCategory(id: string): Promise<ICategory> {
  const url = `categories/${id}`

  const { data } = await api.get(url)

  // aqui faço a formatação dos dados
  return data
}

type ICreatePreference = {
  preferenceId: string
  init_point: string
  sandbox_init_point: string
  formatTotal: number
}

export type IProductIdAndAmountProps = {
  amount: number
  aggregation_product_id: string
}

export type ICreatePreferencesProps = {
  products: IProductIdAndAmountProps[]
  freight: number
  payer: IPayerProps
}

export async function createPreference({
  products,
  freight,
  payer,
}: ICreatePreferencesProps): Promise<ICreatePreference> {
  const url = `process_payment/mercado_pago/create_preferences`
  console.log('minhapreferencia:', JSON.stringify(products, null, 2))
  console.log('minhapreferencia:', JSON.stringify(freight, null, 2))
  console.log('minhapreferencia:', JSON.stringify(payer, null, 2))
  const { data } = await api.post(url, { products, freight, payer })
  console.log('minhapreferencia:', data)

  return data
}

export function useCreatePreferences({
  products,
  freight,
  payer,
}: ICreatePreferencesProps) {
  return useQuery<ICreatePreference, unknown>({
    queryKey: [`hydrate-create-preference`],
    queryFn: () => createPreference({ products, freight, payer }),
  }) as UseQueryResult<ICreatePreference, unknown>
}
