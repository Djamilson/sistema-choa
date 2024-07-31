import { PuffLoader } from 'react-spinners'

function LoadingPuff() {
  return (
    <div className="flex w-full items-center justify-center">
      <PuffLoader size={20} color="red" />
    </div>
  )
}

export { LoadingPuff }
