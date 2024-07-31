import { create } from 'zustand'

interface IPrivacyPoliticQuestionModalStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const usePrivacyPoliticQuestionModal =
  create<IPrivacyPoliticQuestionModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  }))

export default usePrivacyPoliticQuestionModal
