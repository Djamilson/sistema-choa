'use client'
import Wrapper from '@/components/Header/Wrapper'
import { Hr } from '@/components/Hr'
import { IconBadge } from '@/components/IconBadge'
import { useCarByCarId } from '@/hooks/Entity/useCars'
import { ImageIcon } from 'lucide-react'
import Image from 'next/image'
import { ContainerPhoto } from '../ContainerPhoto'
import { DescriptionForm } from '../DescriptionForm'
import ImageGallery from '../ImageGallery'

type ICarDetailProps = {
  params: {
    carId: string
  }
}

const CarDetail = ({ params }: ICarDetailProps) => {
  const { data: initialCar } = useCarByCarId(String(params.carId))
  console.log('coo:', initialCar)

  return (
    <div className="w-full  bg-white px-2 py-4 md:px-8 md:pb-12 md:pt-4">
      <div className="flex flex-col justify-between gap-6 bg-white text-base font-medium text-gray-900">
        <div className="flex w-full flex-col">
          <p>últimas viaturas</p>
          <p className="mt-0.5 text-sm text-gray-500">
            aqui tá seu pedido mais recente, acompanhe todos pelo menu lateral
            meus pedidos
          </p>
        </div>

        <Wrapper className={`w-full max-w-[1440px] md:mx-auto md:px-2`}>
          <div className="bg-white px-4 py-4 md:flex">
            <div className="w-full max-w-[500px] flex-[1.5] md:mx-1 md:w-auto lg:mx-0 lg:max-w-full">
              <div className="mb-9 flex flex-col">
                <h3 className="pb-4">compartilhamento</h3>
              </div>
              <ImageGallery photos={initialCar?.photos} />
            </div>
            <div className="mt-6 w-full flex-[1] py-2 md:ml-6 md:mt-0 md:max-w-[380px]">
              <p className="mb-4 line-clamp-3 text-sm font-bold leading-none text-neutral-500 md:text-lg">
                {initialCar && initialCar?.name}
              </p>

              <Hr />

              <div className="mb-10">
                {initialCar?.id && <DescriptionForm initialCar={initialCar} />}
              </div>
            </div>
          </div>
        </Wrapper>

        <div className="mt-10 grid grid-cols-1 gap-6 text-gray-700 md:grid-cols-2">
          <div className="space-y-4">
            <div>
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
          </div>

          <div className={`mt-0`}>
            <div className="flex h-20 items-center gap-x-2">
              {initialCar?.thumbnail_url ? (
                <Image
                  className={`inline-block h-12 w-12 rounded-full object-cover ring-2 ring-white`}
                  height={32}
                  width={32}
                  alt="brand"
                  src={initialCar?.thumbnail_url || '/images/placeholder.jpg'}
                />
              ) : (
                <IconBadge icon={ImageIcon} />
              )}
              <h2 className="line-clamp-2 text-lg">Marca aqui</h2>
            </div>

            <div className="mt-2 gap-y-4 bg-white px-2 pb-4">
              {initialCar?.id && <DescriptionForm initialCar={initialCar} />}
              {initialCar?.id && <DescriptionForm initialCar={initialCar} />}
              {initialCar?.id && <DescriptionForm initialCar={initialCar} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarDetail
