'use client'
import { ButtonLink } from '@/components/buttons/ButtonLink'
import Wrapper from '@/components/Header/Wrapper'
import { Hr } from '@/components/Hr'
import { useCarByCarId } from '@/hooks/Entity/useCars'
import { Container } from 'lucide-react'
import ImageGallery from '../ImageGallery'
import useCarDetail from './useCarDetail'

type ICarDetailProps = {
  params: {
    carId: string
  }
}

const CarDetail = ({ params }: ICarDetailProps) => {
  const { data: car } = useCarByCarId(String(params.carId))

  const { handleClickDetailCar, selectedCarPhoto } = useCarDetail()

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
          <Wrapper className={`w-full max-w-[1440px] md:mx-auto md:px-2`}>
            <div className="mt-6 flex flex-col gap-[30px] px-1 md:px-4 lg:flex-row lg:gap-[20px]">
              <div className="bg-white px-4 py-4 md:flex">
                <div className="w-full max-w-[500px] flex-[1.5] md:mx-1 md:w-auto lg:mx-0 lg:max-w-full">
                  <div className="mb-9 flex flex-col">
                    <h3 className="pb-4">compartilhamento</h3>
                    kjkjlj
                  </div>
                  <ImageGallery photos={selectedCarPhoto?.photos} />
                </div>
                <div className="mt-6 w-full flex-[1] py-2 md:ml-6 md:mt-0 md:max-w-[380px]">
                  <p className="mb-4 line-clamp-3 text-sm font-bold leading-none text-neutral-500 md:text-lg">
                    initialProduct && initialProduct?.subcategory?.name
                  </p>

                  <Hr />
                  <div className="markdown text-md mb-5">
                    <p className="mt-4 line-clamp-3 text-sm font-normal text-gray-500">
                      {car?.name}
                    </p>

                    <ButtonLink
                      onClick={() => handleClickDetailCar('detailCar')}
                    >
                      mais informações
                    </ButtonLink>
                  </div>

                  <Hr />
                  <div className="mb-10">sdfjhsakjhdfkha edittar</div>
                  <div className="mb-10">eidta</div>

                  <div className="mb-10">dfsafdsa</div>
                </div>
              </div>
            </div>
          </Wrapper>
          <Container>kjdkljfljalj</Container>
        </div>
      </div>
    </div>
  )
}

export default CarDetail
