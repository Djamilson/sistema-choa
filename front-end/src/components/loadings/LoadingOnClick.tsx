'use client'

import { LoadingOnClickButtonModal } from './LoadingOnClickButtonModal'
import useLoadingOnClickButtonModal from './LoadingOnClickButtonModal/useLoadingOnClickButtonModal'

const LoadingOnClick = () => {
  const { isOpen } = useLoadingOnClickButtonModal()

  return <LoadingOnClickButtonModal isOpenModal={isOpen} />
}

export default LoadingOnClick
