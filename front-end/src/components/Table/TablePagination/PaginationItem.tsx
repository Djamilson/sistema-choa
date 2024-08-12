'use client'

interface PaginationItemProps {
  isCurrent?: boolean
  number: number
  onPageChange: (page: number) => void
}
export function PaginationItem({
  isCurrent = false,
  number,
  onPageChange,
}: PaginationItemProps) {
  if (isCurrent) {
    return (
      <button className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        {number}
      </button>
    )
  }

  return (
    <button
      className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
      onClick={() => onPageChange(number)}
    >
      {number}
    </button>
  )
}
