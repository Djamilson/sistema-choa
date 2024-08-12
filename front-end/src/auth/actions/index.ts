'use server'

import { signIn, signOut } from '@/auth'
import { getRedirectTo } from '@/utils/getRedirectTo'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export type IFormDataProps = {
  email: string
  password: string
}

export async function doCredentialLogin(formData: IFormDataProps) {
  // eslint-disable-next-line no-useless-catch
  try {
    await signIn('credentials', {
      email: formData.email,
      password: formData.password,
      redirect: false,
      callbackUrl: '/dashboard',
    })

    const href = getRedirectTo()

    redirect((href !== '/' && href) || `http://localhost:3000/`)
  } catch (error) {
    throw error
  }
}

export async function doSocialLogin(formData: any) {
  const action = formData.get('action')
  await signIn(action, { redirectTo: '/' })
}

export async function doLogout() {
  cookies().delete('_next_auth.choa.token')
  cookies().delete('_next_auth.choa.refresh_token')

  cookies().delete('authjs.callback-url')
  cookies().delete('authjs.csrf-token')
  cookies().delete('next-auth.pkce.code_verifier')

  await signOut({ redirectTo: '/' })
}
