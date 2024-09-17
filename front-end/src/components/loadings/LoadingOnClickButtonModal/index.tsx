'use client'

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import { Player } from '@lottiefiles/react-lottie-player'
import { useRef } from 'react'
import loadingCar from '../../../../public/js/loadingCar.json'

type ILoadingOnClickButtonModalProps = {
  isOpenModal: boolean
}

export function LoadingOnClickButtonModal({
  isOpenModal = false,
}: ILoadingOnClickButtonModalProps) {
  const ref = useRef(null)

  return (
    <Dialog open={isOpenModal} onClose={() => {}} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/5 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 overflow-y-auto">
        <div className="-mt-16 flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden text-left transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="size-[6.25rem] w-full px-4 pb-4 pt-5">
              <div className="mt-3 flex flex-col items-center justify-center text-center sm:ml-4 sm:mt-0 sm:text-left">
                <Player
                  id="firstLottie"
                  ref={ref}
                  autoplay
                  controls
                  loop
                  src={loadingCar}
                  style={{
                    zIndex: '9999',
                    height: '120%',
                    width: '120%',
                    position: 'absolute',
                    left: '50%',
                    top: '40%',
                    transform: 'translateX(-50%) translateY(-60%)',
                  }}
                ></Player>

                <DialogTitle
                  as="h3"
                  className="mt-10 text-lg font-semibold leading-6 text-accent"
                >
                  aguarde ...
                </DialogTitle>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
