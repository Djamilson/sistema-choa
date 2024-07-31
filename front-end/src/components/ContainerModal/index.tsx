'use client'

import cn from '@/utils/cn'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { ReactNode } from 'react'

type IContainerModal = {
  children: ReactNode
  isOpen: boolean
  onClose: () => void
  className?: string
}

export function ContainerModal({
  children,
  isOpen,
  onClose,
  className,
}: IContainerModal) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/40 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className={cn(
                'pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700',
                className,
              )}
            >
              {children}
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
