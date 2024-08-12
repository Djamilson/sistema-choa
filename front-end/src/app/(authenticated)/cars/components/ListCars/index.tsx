'use client'

import { Search } from '@/components/inputs/Search'
import { SubHeader } from '@/components/SubHeader'
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
      <div className="flex flex-col justify-between gap-6 text-base font-medium text-gray-900">
        <div className="flex w-full flex-col">
          <p>últimas viaturas</p>
          <p className="mt-0.5 text-sm text-gray-500">
            aqui tá seu pedido mais recente, acompanhe todos pelo menu lateral
            meus pedidos
          </p>
        </div>

        <div className="flex w-full flex-col">
          <h3>lista de viaturas</h3>
        </div>

        <div className="mt-4">
          <div className="relative overflow-x-auto shadow-md ">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <Search.Root>
                    <Search.Input
                      type={`text`}
                      iconSecond={BiSearch}
                      name="search"
                      value={searchTerm}
                      placeholder="busca viatura"
                      onChange={handleChangeSearch}
                    />
                  </Search.Root>
                </div>

                <div className="ml-4 flex items-center md:ml-6">
                  <NewCarModal
                    isOpen={isOpenNewModalCar}
                    onClose={closeNewModalCar}
                  />
                  <SubHeader.Button
                    icon={BsPlusLg}
                    title="nova viatura"
                    className={`w-54 whitespace-nowrap text-accent hover:bg-accent hover:text-white`}
                    onClick={() => {
                      setIsOpenNewModalCar(true)
                    }}
                  />
                </div>
              </div>
            </div>

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
                    Action
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

                {cars?.cars?.map((car) => {
                  return (
                    <tr
                      key={car.id}
                      className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600"
                    >
                      <td className="w-4 p-4">
                        <div className="flex items-center">
                          <input
                            id="checkbox-table-3"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                          />
                          <label for="checkbox-table-3" className="sr-only">
                            checkbox
                          </label>
                        </div>
                      </td>
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
        </div>
      </div>
    </div>
  )
}

export { ListCars }
