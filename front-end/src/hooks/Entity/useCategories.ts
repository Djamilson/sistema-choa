import ICategory from '@/@model/category/category'
import { api } from '@/_services/apiClient'
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

  return data
}

export function useCategory(id: string) {
  return useQuery({
    queryKey: [`category-${id}`],
    queryFn: () => getCategory(id),
  }) as UseQueryResult<ICategory, unknown>
}
