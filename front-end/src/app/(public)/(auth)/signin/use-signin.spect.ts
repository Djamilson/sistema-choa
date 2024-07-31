import { renderHook } from '@testing-library/react'
import { useAuth } from './components/useAuth'

describe('useSignin', () => {
  it('should return user', () => {
    const { result } = renderHook(() => () => useAuth())

    expect(result.current.name).toBe([])
  })
})
