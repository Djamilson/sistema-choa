'use client'

import { PuffLoader } from 'react-spinners'

const LoadingPuffLoader = () => {
  return (
    <div className="flex h-[10vh] flex-col items-center justify-center">
      <PuffLoader size={30} color="red" />
    </div>
  )
}

export { LoadingPuffLoader }
