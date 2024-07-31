import IMenuPolitic from '@/@model/politic/menuPolitic'
import IPolitic from '@/@model/politic/politic'
import { IPoliticSummary } from '@/@model/politic/politicSummary'
import { api } from '@/_services/apiClient'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

export async function getMenuPolitics(): Promise<IMenuPolitic[]> {
  const url = `politics/menus`

  const { data } = await api.get(url)

  return data
}

export function usePoliticsByInitialPolitics(politics: IMenuPolitic[]) {
  return useQuery({
    queryKey: ['initial-politics'],
    queryFn: () => getMenuPolitics(),
    initialData: politics,
  }) as UseQueryResult<IMenuPolitic[], unknown>
}

export function usePolitics() {
  return useQuery({
    queryKey: ['hydrate-politics'],
    queryFn: () => getMenuPolitics(),
  }) as UseQueryResult<IMenuPolitic[], unknown>
}

export async function getPoliticByPoliticId(id: string): Promise<IPolitic> {
  const url = `politics/menus/${id}`

  const { data } = await api.get(url)
  const dataFormatted = {
    ...data,
    description_formatted: data?.description.split('<p>'),
  }

  return dataFormatted
}

export function usePoliticByPoliticIdByInitialTitles(
  id: string,
  politicInitial: IPolitic,
) {
  return useQuery({
    queryKey: ['initial-politic-by-politic-id'],
    queryFn: () => getPoliticByPoliticId(id),
    initialData: politicInitial,
  }) as UseQueryResult<IPolitic, unknown>
}

export function usePoliticByPoliticId(id: string) {
  return useQuery({
    queryKey: ['hydrate-politic-by-politic-id', id],
    queryFn: () => getPoliticByPoliticId(id),
  }) as UseQueryResult<IPolitic, unknown>
}

export async function getPoliticsSummaries(): Promise<IPoliticSummary[]> {
  const url = `summaries/politics/ecommerce`

  const { data } = await api.get(url)

  return data
}

export function usePoliticsSummariesByInitialPoliticsSummaries(
  initialPoliticsSummaries: IPoliticSummary[],
) {
  return useQuery({
    queryKey: ['initial-politics-summaries'],
    queryFn: () => getPoliticsSummaries(),
    initialData: initialPoliticsSummaries,
  }) as UseQueryResult<IPoliticSummary[], unknown>
}

export function usePoliticsSummaries() {
  return useQuery({
    queryKey: ['hydrate-politics-summaries'],
    queryFn: () => getPoliticsSummaries(),
  }) as UseQueryResult<IPoliticSummary[], unknown>
}
