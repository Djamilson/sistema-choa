'use client'

import { api } from '@/_services/apiClient'
import { Toast } from '@/components/Toast'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

type IUseSignUpCodeValidationForm = {
  setEmail: Dispatch<SetStateAction<string>>
}

export const useSignUpCodeValidationForm = ({
  setEmail,
}: IUseSignUpCodeValidationForm) => {
  const CELL_COUNT = 6

  const [code, setCode] = useState('')
  const [containerIsFocused, setContainerIsFocused] = useState(false)
  const [isCodeCorrect, setIsCodeCorrect] = useState(false)
  const [isCodeInvalid, setIsCodeInvalid] = useState(false)
  let message = ''

  const codeDigitsArray = new Array(CELL_COUNT).fill(0)
  const ref = useRef<HTMLInputElement>(null)

  const handleOnPress = () => {
    setContainerIsFocused(true)
    ref?.current?.focus()
  }

  const handleOnBlur = () => {
    setContainerIsFocused(false)
  }

  async function handleCorrectPinCode(code_validation: string) {
    try {
      const { data } = await api.get(
        `registers/collaborators/sign-up-code-validations`,
        {
          params: { code_validation },
        },
      )
      setEmail(data.email)
      setIsCodeCorrect(true)
    } catch (error: any) {
      message = 'Ocorreu uma falha ao tentar validar o código, tente novamente!'

      if (error?.response?.data?.statusCode === 401) {
        message = 'esse código não existe, tente novamente!'
      }

      if (error?.response?.data?.statusCode === 402) {
        message = 'esse código já expirou, gere um novo código!'
      }

      Toast({
        message,
        type: 'error',
      })

      setIsCodeCorrect(false)
      setIsCodeInvalid(false)
    }
  }

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (value.length <= CELL_COUNT) {
      setCode(value)
      message = ''
      setIsCodeCorrect(false)
      setIsCodeInvalid(false)

      if (value.length === CELL_COUNT) {
        handleCorrectPinCode(value)
      }
    }
  }

  useEffect(() => {
    ref?.current?.focus()
  }, [])

  return {
    handleOnPress,
    codeDigitsArray,
    containerIsFocused,
    ref,
    code,
    handleChangeText,
    handleOnBlur,
    isCodeCorrect,
    isCodeInvalid,
    CELL_COUNT,
    message,
  }
}
