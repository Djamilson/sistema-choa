import axios from 'axios'
import { useRouter } from 'next/navigation'
import { MouseEvent, useCallback, useMemo } from 'react'
// import { toast } from 'react-hot-toast'

interface IUseFavorite {
  listingId: string
  currentUser?: null
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter()

  // const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list: any = [] // currentUser?.favoriteIds || []

    return list.includes(listingId)
  }, [listingId])

  const toggleFavorite = useCallback(
    async (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()

      if (!currentUser) {
        // return loginModal.onOpen();
      }

      try {
        let request

        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${listingId}`)
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`)
        }

        await request()
        router.refresh()
        //  toast.success('Success')
      } catch (error) {
        // toast.error('Something went wrong.')
      }
    },
    [currentUser, hasFavorited, listingId, router],
  )

  return {
    hasFavorited,
    toggleFavorite,
  }
}

export default useFavorite
