import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { PaginationItem } from './PaginationItem'

interface PaginationProps {
  totalCountOfRegisters: number
  registersPerPage?: number
  currentPage?: number
  onPageChange: (page: number) => void
}

const siblingsCount = 1

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1
    })
    .filter((page) => page > 0)
}

export function TablePagination({
  totalCountOfRegisters,
  registersPerPage,
  currentPage = 1,
  onPageChange,
}: PaginationProps) {
  const lastPage = registersPerPage
    ? Math.ceil(totalCountOfRegisters / registersPerPage)
    : 0

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : []

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage),
        )
      : []

  return (
    <div className="z-0 flex items-center justify-between gap-2 bg-white py-3">
      <div>
        <p className="text-sm text-gray-700">
          página <span className="font-medium">{currentPage}</span> registro(s){' '}
          <span className="font-medium">
            {registersPerPage &&
              (currentPage * registersPerPage >= totalCountOfRegisters
                ? totalCountOfRegisters
                : currentPage * registersPerPage)}
          </span>{' '}
          de <span className="font-medium">{totalCountOfRegisters}</span>{' '}
        </p>
      </div>

      <div>
        <nav
          className="isolate z-0 inline-flex  shadow-sm"
          aria-label="Pagination"
        >
          <a
            href="#"
            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </a>
          {currentPage > 1 + siblingsCount && (
            <>
              <PaginationItem onPageChange={onPageChange} number={1} />
              {currentPage > 2 + siblingsCount && (
                <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                  ...
                </span>
              )}
            </>
          )}

          {previousPages.length > 0 &&
            previousPages.map((page) => {
              return (
                <PaginationItem
                  onPageChange={onPageChange}
                  key={page}
                  number={page}
                />
              )
            })}

          <PaginationItem
            onPageChange={onPageChange}
            number={currentPage}
            isCurrent
          />

          {nextPages.length > 0 &&
            nextPages.map((page) => {
              return (
                <PaginationItem
                  onPageChange={onPageChange}
                  key={page}
                  number={page}
                />
              )
            })}

          {currentPage + siblingsCount < lastPage && (
            <>
              {currentPage + 1 + siblingsCount < lastPage && (
                <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                  ...
                </span>
              )}
              <PaginationItem onPageChange={onPageChange} number={lastPage} />
            </>
          )}
          <a
            href="#"
            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            <span className="sr-only">Next</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </a>
        </nav>
      </div>
    </div>
  )
}
