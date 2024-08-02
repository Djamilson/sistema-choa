'use client'

import { LoadingOnClickButtonModal } from '@/components/loadings/LoadingOnClickButtonModal'
import useLoadingOnClickButtonModal from '@/components/loadings/LoadingOnClickButtonModal/useLoadingOnClickButtonModal'

const Loading = () => {
  const { isOpen } = useLoadingOnClickButtonModal()

  return !isOpen && <LoadingOnClickButtonModal isOpenModal={true} />
}

export default Loading
