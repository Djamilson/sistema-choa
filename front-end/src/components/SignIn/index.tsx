import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { destroyCookie } from 'nookies'
import AuthForm from './components/AuthForm'
import FormHeaderLogin from './components/HeaderAuthForm'
import PrivacyPolicy from './components/PrivacyPolicyLink'
import SignUpLink from './components/SignUpLink'
import SocialLogins from './components/SocialLogins'

export default async function SignIn() {
  const session = await auth()

  if (session) {
    return redirect(`/dashboard`)
  }

  if (!session) {
    destroyCookie(null, 'next-auth.pkce.code_verifier')
    destroyCookie(null, 'authjs.callback-url')
    destroyCookie(null, 'authjs.csrf-token')
  }

  return (
    <div className="flex min-h-full flex-col justify-center bg-neutral-100 py-12 sm:px-6 lg:px-8">
      <FormHeaderLogin />
      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-12 shadow sm:px-10">
          <AuthForm />
          <div className="my-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">Ou</span>
              </div>
            </div>
          </div>

          <div className="my-6">
            <SocialLogins />
          </div>
          <div className="my-6">
            <SignUpLink />
          </div>
          <PrivacyPolicy />
        </div>
      </div>
    </div>
  )
}
