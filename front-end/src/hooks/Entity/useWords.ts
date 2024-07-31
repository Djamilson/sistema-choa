import { IWord } from '@/@model/word/word'
import { api } from '@/_services/apiClient'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

export async function getWords(): Promise<IWord[]> {
  const url = `words`

  const { data } = await api.get(url)

  const w: IWord[] = data.map((word: IWord) => {
    return {
      ...word,
      status: false,
    }
  })

  return w
}

export function useWordsByInitialWords(titleWords: IWord[]) {
  return useQuery({
    queryKey: ['initial-words'],
    queryFn: () => getWords(),
    initialData: titleWords,
  }) as UseQueryResult<IWord[], unknown>
}

export function useWords() {
  return useQuery({
    queryKey: ['hydrate-words'],
    queryFn: () => getWords(),
  }) as UseQueryResult<IWord[], unknown>
}

export async function getWord(id: string): Promise<IWord> {
  const url = `words/${id}`

  const { data } = await api.get(url)

  return data
}

export function useWordId(wordId: string) {
  return useQuery<IWord, unknown>({
    queryKey: ['hydrate-word-id', wordId],
    queryFn: () => getWord(wordId),
  })
}
