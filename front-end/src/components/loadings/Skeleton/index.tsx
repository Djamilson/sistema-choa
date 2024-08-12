export default function Skeleton() {
  return (
    <div className="pb-42 mx-2 flex max-w-6xl flex-col pt-10 sm:flex-row sm:space-x-4 lg:pl-52">
      <div className="animate-pulse">
        <div className="mb-4 h-48 w-48  bg-gray-200"></div>
        <div className="mb-2.5 h-2 w-48  bg-gray-200"></div>
        <div className="mb-2.5 h-2 w-44  bg-gray-200"></div>
      </div>
      <div className="hidden sm:inline-flex sm:space-x-4">
        <div className="animate-pulse">
          <div className="mb-4 h-48 w-48  bg-gray-200"></div>
          <div className="mb-2.5 h-2 w-48  bg-gray-200"></div>
          <div className="mb-2.5 h-2 w-44  bg-gray-200"></div>
        </div>
        <div className="animate-pulse">
          <div className="mb-4 h-48 w-48  bg-gray-200"></div>
          <div className="mb-2.5 h-2 w-48  bg-gray-200"></div>
          <div className="mb-2.5 h-2 w-44  bg-gray-200"></div>
        </div>
      </div>
    </div>
  )
}
