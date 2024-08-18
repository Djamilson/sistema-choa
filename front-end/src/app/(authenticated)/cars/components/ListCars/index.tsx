'use client'

import { Search } from '@/components/inputs/Search'
import { MeLink } from '@/components/my-account/Sidebar/MeLink'
import { SubHeader } from '@/components/SubHeader'
import { Table } from '@/components/Table'
import { Pencil } from 'lucide-react'
import { BiSearch } from 'react-icons/bi'
import { BsPlusLg } from 'react-icons/bs'
import NewCarModal from '../NewCarModal'
import { useListCars } from './useListCars'

function ListCars() {
  const {
    searchTerm,
    handleChangeSearch,
    isOpenNewModalCar,
    closeNewModalCar,
    selectCarEdit,
    setSelectCarEdit,
    setIsOpenNewModalCar,
    cars,
    page,
    setPage,
    limit,
    isLoading,
    isFetching,
    isOpenModalContainerButton,

    closeModalEditClear,
    error,
  } = useListCars()

  return (
    <div className="gap-22 flex-[4] px-2 py-4 md:px-8 md:pb-12 md:pt-4">
      <div className="flex flex-col justify-between gap-6 text-base font-medium">
        <SubHeader.Title title="lista de viaturas" />

        <div className="mt-4">
          <SubHeader.Root>
            <Search.Input
              type={`text`}
              iconSecond={BiSearch}
              name="search"
              value={searchTerm}
              placeholder="busca viatura"
              onChange={handleChangeSearch}
            />
            <div className="w-56">
              <NewCarModal
                isOpen={isOpenNewModalCar}
                onClose={closeNewModalCar}
              />

              <div className="mx-auto md:max-w-md">
                <SubHeader.Button
                  icon={BsPlusLg}
                  title="novo produto"
                  className={`whitespace-nowrap text-accent hover:bg-accent hover:text-white`}
                  onClick={() => {
                    setIsOpenNewModalCar(true)
                  }}
                />
              </div>
            </div>
          </SubHeader.Root>

          <Table.Button
            isOpen={isOpenModalContainerButton}
            closeModalEditClear={closeModalEditClear}
          >
            <MeLink
              onClick={() => {}}
              href={`/cars/selectProductEdit.id`}
              className="hover:ring-none md:ring-offset-none flex items-center rounded-none border-none px-2 pt-1 transition duration-150 ease-in-out hover:bg-gray-50 hover:text-accent focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 sm:h-12 sm:w-14"
            >
              <div className="flex shrink-0 flex-col items-center justify-center rounded-none">
                <Pencil />
                editar
              </div>
            </MeLink>
          </Table.Button>

          <Table.Skeleton
            isLoading={isLoading}
            isFetching={isFetching}
            error={error}
            title="Ooops! aconteceu algo errado!"
            message="tente novamente!"
          >
            <Table.Root>
              <>
                <div className="relative space-y-4 overflow-x-auto">
                  <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="p-4">
                          <div className="flex items-center">#</div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Nome
                        </th>
                        <th scope="col" className="px-6 py-3">
                          prefixo
                        </th>
                        <th scope="col" className="px-6 py-3">
                          lotada atualmente
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                          ação
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {cars && cars.cars?.length < 1 && (
                        <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                          <td colSpan={6} className=" left-0 w-full p-4">
                            <div className="flex items-center">
                              Não temos viaturas cadastrada ainda
                            </div>
                          </td>
                        </tr>
                      )}

                      {cars?.cars?.map((car, idx) => {
                        return (
                          <tr
                            key={car.id}
                            className="border-b bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600"
                          >
                            <td className="px-6 py-4">{idx + 1}</td>
                            <th
                              scope="row"
                              className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                            >
                              {car.name}
                            </th>
                            <td className="px-6 py-4"> {car.plate}</td>
                            <td className="px-6 py-4"> {car.brand}</td>
                            <td className="px-6 py-4"> {car.fuel_type}</td>
                            <td className="px-6 py-4">
                              <a
                                href={`/cars/${car.id}`}
                                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                              >
                                Edit
                              </a>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
                {cars && cars?.cars?.length > 0 && (
                  <Table.Pagination
                    totalCountOfRegisters={cars?.info?.total}
                    currentPage={page}
                    onPageChange={setPage}
                    registersPerPage={limit}
                  />
                )}
              </>
            </Table.Root>
          </Table.Skeleton>
        </div>
      </div>
    </div>
  )
}

export { ListCars }
