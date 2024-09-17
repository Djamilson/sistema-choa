'use client'
import Wrapper from '@/components/Header/Wrapper'
import { Hr } from '@/components/Hr'
import { IconBadge } from '@/components/IconBadge'
import { useCarByCarId } from '@/hooks/Entity/useCars'
import { FileText, ImageIcon } from 'lucide-react'
import { BrandForm } from '../BrandForm'
import { ContainerPhoto } from '../ContainerPhoto'
import { DescriptionForm } from '../DescriptionForm'
import ImageGallery from '../ImageGallery'
import { NameForm } from '../NameForm'
import { PlateForm } from '../PlateForm'
import { AcronymForm } from '../AcronymForm'

type ICarDetailProps = {
  params: {
    carId: string
  }
}

const CarDetail = ({ params }: ICarDetailProps) => {
  const { data: initialCar } = useCarByCarId(String(params.carId))

  return (
    <div className="w-full  bg-white px-2 py-4 md:px-8 md:pb-12 md:pt-4">
      <div className="flex flex-col justify-between gap-6 bg-white text-base font-medium text-gray-900">
        <div className="flex w-full flex-col">
          <p className="mb-4 line-clamp-3 text-sm font-bold leading-none text-neutral-500 md:text-lg">
            {initialCar && initialCar?.name}
          </p>
          <p className="mt-0.5 text-sm text-gray-500">
            aqui tá encontra-se as informações da viatura e os dados podem ser
            editados
          </p>
        </div>

        <Wrapper className={`w-full max-w-[1440px] md:mx-auto md:px-2`}>
          <div className="bg-white px-4 py-4 md:flex">
            <div className="w-full max-w-[500px] flex-[1.5] md:mx-1 md:w-auto lg:mx-0 lg:max-w-full">
              <ImageGallery photos={initialCar?.photos} />
            </div>
            <div className="mt-6 w-full flex-[1] py-2 md:ml-6 md:mt-0 md:max-w-[380px]">
              <p className="mb-4 line-clamp-3 text-sm font-bold leading-none text-neutral-500 md:text-lg">
                {initialCar && initialCar?.name}
              </p>

              <Hr />

              <div className="mb-10">
                {initialCar?.id && <NameForm initialCar={initialCar} />}
              </div>
            </div>
          </div>
        </Wrapper>

        <div className="mt-10 grid grid-cols-1 gap-6 text-gray-700 md:grid-cols-2">
          <div className="space-y-4">
            <div className="mt-2 gap-y-4 bg-white px-2 pb-4">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-x-2">
                    <IconBadge icon={ImageIcon} />
                    <h2 className="text-xl">Imagens da viatura</h2>
                  </div>
                  <ContainerPhoto
                    photos={initialCar?.photos}
                    initialCar={initialCar}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="mt-2 gap-y-4 bg-white px-2 pb-4">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-x-2">
                    <IconBadge icon={FileText} />
                    <h2 className="text-xl">Dados</h2>
                  </div>
                  {initialCar?.id && <AcronymForm initialCar={initialCar} />}
                  {initialCar?.id && <PlateForm initialCar={initialCar} />}
                  {initialCar?.id && <BrandForm initialCar={initialCar} />}
                  {initialCar?.id && <FuelTypeForm initialCar={initialCar} />}                  
                  {initialCar?.id && (
                    <DescriptionForm initialCar={initialCar} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarDetail
