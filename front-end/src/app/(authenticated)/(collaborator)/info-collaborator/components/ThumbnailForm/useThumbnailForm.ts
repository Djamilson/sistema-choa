'use client'
import useGetUserBySession from '@/hooks/auth/useGetUserBySession'
import { useState } from 'react'

const useThumbnailForm = () => {
  const initialUser = useGetUserBySession()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setLoading] = useState(true)

  const toggleEdit = () => setIsEditing((current) => !current)

  return { toggleEdit, isLoading, isEditing, setLoading, initialUser }
}

export default useThumbnailForm
