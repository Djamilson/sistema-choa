'use client'

import { useState } from 'react'

const useImageForm = () => {
  const [isEditing, setIsEditing] = useState(false)
  const toggleEdit = () => setIsEditing((current) => !current)
  const [isLoading, setLoading] = useState(true)

  return {
    isEditing,
    toggleEdit,
    isLoading,
    setLoading,
  }
}

export { useImageForm }
