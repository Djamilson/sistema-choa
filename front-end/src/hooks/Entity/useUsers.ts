import { IPerson } from '@/@model/person/person'
import { IUser } from '@/@model/user/user'
import { api } from '@/_services/apiClient'
import { UseQueryResult, useQuery } from '@tanstack/react-query'

export async function getPerson(id: string): Promise<IPerson> {
  const url = `persons/${id}`

  const { data } = await api.get(url)

  return data
}

export async function getUser(userId: string): Promise<IUser> {
  const url = `users/me/colaborators/${userId}`

  const { data } = await api.get(url)

  console.log('Atualizado o usuário::', data)

  return data
}

export function usePersonById(personId: string) {
  return useQuery<any, unknown>({
    queryKey: ['hydrate-person', personId],
    queryFn: () => getPerson(personId),
  })
}

export function useUser(userId: string) {
  return useQuery({
    queryKey: ['hydrate-user'],
    queryFn: () => getUser(userId),
  }) as UseQueryResult<IUser[], unknown>
}
