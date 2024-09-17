'use client'

import { FC, ReactNode, useCallback, useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'

interface ModalProps {
  isOpen?: boolean
  onClose: () => void
  onSubmit: () => void
  onCloseLeftOrRight?: 'left' | 'right'
  sizeModal: string | undefined
  title?: string
  body?: ReactNode
  footer?: ReactNode
  actionLabel: string
  disabled?: boolean
  secondaryAction?: () => void
  secondaryActionLabel?: string
}

const ModalTwo: FC<ModalProps> = ({
  isOpen,
  onClose,

  title,
  body,
  footer,
  disabled,

  onCloseLeftOrRight,
  sizeModal,
}) => {
  const [showModal, setShowModal] = useState(isOpen)

  useEffect(() => {
    setShowModal(isOpen)
  }, [isOpen])

  const handleClose = useCallback(() => {
    if (disabled) {
      return
    }

    setShowModal(false)
    setTimeout(() => {
      onClose()
    }, 300)
  }, [onClose, disabled])

  if (!isOpen) {
    return null
  }
  const style =
    sizeModal || 'h-full w-full md:h-auto md:w-4/6 lg:h-auto lg:w-3/6 xl:w-2/5'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/40 outline-none focus:outline-none ">
      <div className={`relative mx-auto my-6  ${style} `}>
        {/* content */}
        <div
          className={`translate h-full duration-300 ${
            showModal ? 'translate-y-0' : 'translate-y-full'
          } ${showModal ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="translate relative flex h-full w-full flex-col rounded-lg border-0 bg-white shadow-lg  outline-none focus:outline-none md:h-auto lg:h-auto">
            {/* header */}
            <div className="relative flex items-center justify-center rounded-t border-b-[1px] p-6">
              <button
                className={`absolute ${
                  onCloseLeftOrRight && onCloseLeftOrRight === 'right'
                    ? `right-[20px]`
                    : `left-9`
                } border-0 p-1  transition hover:opacity-70`}
                onClick={handleClose}
              >
                <IoMdClose size={18} />
              </button>
              <div className="text-lg font-semibold">{title}</div>
            </div>
            {/* body */}
            <div className="relative flex-auto p-6">{body}</div>
            {/* footer */}
            <div className="flex flex-col gap-2 p-6">{footer}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { ModalTwo }
