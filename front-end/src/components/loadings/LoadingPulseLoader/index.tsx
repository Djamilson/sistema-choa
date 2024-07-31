'use client'

import { PulseLoader } from 'react-spinners'

const LoadingPulseLoader = () => {
  return (
    <div className="flex h-[10vh] flex-col items-center justify-center">
      <PulseLoader size={22} color="red" />
    </div>
  )
}

export { LoadingPulseLoader }
