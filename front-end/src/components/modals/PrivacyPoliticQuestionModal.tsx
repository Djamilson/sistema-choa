'use client'

import IPolitic from '@/@model/politic/politic'
import usePrivacyPoliticQuestionModal from '@/hooks/modal/usePrivacyPoliticQuestionModal'
import { useCallback, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { Heading } from '../Heading'
import { ModalTwo } from './ModalTwo'

type IPrivacyPoliticQuestionModal = {
  politic: IPolitic
  sizeModal: string | undefined
}

const PrivacyPoliticQuestionModal = ({
  politic,
  sizeModal,
}: IPrivacyPoliticQuestionModal) => {
  const privacyPoliticQuestionModal = usePrivacyPoliticQuestionModal()

  const [isLoading, setIsLoading] = useState(false)

  const { handleSubmit } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = () => {
    setIsLoading(true)
  }

  const onToggle = useCallback(() => {
    // registerModal.onClose();
    // loginModal.onOpen();
  }, [])

  const bodyContent = (
    <div className="flex h-32 flex-col gap-4 overflow-auto">
      <Heading title="Welcome to Airbnb" subtitle="Create an account!" />
      <div className="flex flex-col gap-4">
        {politic?.description_formatted?.map((item, index) => {
          return (
            <p
              key={index}
              className="mb-4 mt-4 text-base font-light leading-relaxed text-gray-500 sm:mb-5 dark:text-gray-400"
            >
              {item}
            </p>
          )
        })}
      </div>
    </div>
  )

  const footerContent = (
    <div className="mt-3 flex flex-col gap-4">
      <hr />

      <div className="mt-4 text-center font-light text-neutral-500">
        <p>
          Already have an account?
          <span
            onClick={onToggle}
            className="cursor-pointer text-neutral-800 hover:underline"
          >
            {' '}
            Log in
          </span>
        </p>
      </div>
    </div>
  )

  return (
    <ModalTwo
      sizeModal={sizeModal}
      disabled={isLoading}
      isOpen={privacyPoliticQuestionModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={privacyPoliticQuestionModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default PrivacyPoliticQuestionModal
