import { create } from 'zustand'

type IUseLoadingOnClickButtonModalProps = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const useLoadingOnClickButtonModal = create<IUseLoadingOnClickButtonModalProps>(
  (set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  }),
)

export default useLoadingOnClickButtonModal
