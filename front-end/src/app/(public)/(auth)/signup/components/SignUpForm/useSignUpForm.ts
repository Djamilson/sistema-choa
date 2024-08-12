'use client'

import { useState } from 'react'

export const useSignUpForm = () => {
  const [email, setEmail] = useState<string>('')
  const [currentStep, setCurrentStep] = useState<number>(1)

  const handlerCurrentStep = () => setCurrentStep((old) => old + 1)
  const handlerGoBackCurrentStep = () => setCurrentStep((old) => old - 1)

  return {
    currentStep,
    setCurrentStep,
    handlerCurrentStep,
    handlerGoBackCurrentStep,
    email,
    setEmail,
  }
}
