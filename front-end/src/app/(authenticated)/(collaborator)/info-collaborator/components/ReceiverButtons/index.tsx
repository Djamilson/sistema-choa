import { IReceiverDBProps } from '@/app/(authenticated)/payments/components/MainPayment/usePayments'
import HeartButton from '@/app/(authenticated)/payments/components/Payment/components/HeartButton'
import { ButtonDetailProduct } from '@/components/product-detail/ButtonDetailProduct'
import cn from '@/utils/cn'
import { Square, SquareCheckBig } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import { AiFillDelete, AiOutlineDelete } from 'react-icons/ai'

type IReceiverButtonsProps = {
  selectedReceiverId?: string
  receiver: IReceiverDBProps
  handleSelectedReceiver: (receiver: IReceiverDBProps) => void
  toggleFavorite: (receiverId: string) => Promise<void>
  handleSelectedReceiverIdDelete: Dispatch<SetStateAction<string>>
}

const ReceiverButtons = ({
  selectedReceiverId,
  receiver,
  handleSelectedReceiver,
  toggleFavorite,
  handleSelectedReceiverIdDelete,
}: IReceiverButtonsProps) => {
  return (
    <div className="flex w-full items-baseline justify-between">
      <ButtonDetailProduct
        disabled={selectedReceiverId === receiver.id}
        icon={selectedReceiverId === receiver.id ? SquareCheckBig : Square}
        onClick={() => handleSelectedReceiver(receiver)}
        className={cn(
          `w-full`,
          selectedReceiverId === receiver.id && `text-green-600`,
        )}
      >
        {selectedReceiverId === receiver.id
          ? `endereços listados`
          : `mostra endereços`}
      </ButtonDetailProduct>
      <div className="flex w-full justify-end space-x-4">
        {receiver?.id && (
          <HeartButton
            hasFavorited={receiver.main}
            toggleFavorite={toggleFavorite}
            valueId={receiver.id}
          />
        )}

        <div
          onClick={() => handleSelectedReceiverIdDelete(receiver.id)}
          className="relative cursor-pointer transition  hover:opacity-80"
        >
          <AiOutlineDelete
            size={28}
            className="absolute -right-[2px] -top-[2px] fill-green-200"
          />
          <AiFillDelete
            size={24}
            className={`fill-neutral-500/70 hover:fill-rose-500`}
          />
        </div>
      </div>
    </div>
  )
}

export default ReceiverButtons
