import { useState } from 'react'
import { IReceiverDBProps } from '../../../../payments/components/MainPayment/usePayments'

const useAddress = () => {
  const [selectedReceiver, setSelectedReceiver] = useState<IReceiverDBProps>(
    {} as IReceiverDBProps,
  )

  const handleSelectedReceiver = (receiver: IReceiverDBProps) =>
    setSelectedReceiver(receiver)

  return {
    selectedReceiver,
    setSelectedReceiver,
    handleSelectedReceiver,
  }
}

export default useAddress
