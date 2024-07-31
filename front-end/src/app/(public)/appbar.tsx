import { auth } from '@/auth'
import Link from 'next/link'
import Logout from './(auth)/signin/components/Logout'

async function AppBar() {
  const session = await auth()

  return (
    <div className="flex gap-2 bg-gradient-to-b  p-2 ">
      <Link href={'/clientPage'}>So se estiver logado</Link>
      <Link href={'/serverPage'}>Server Page</Link>
      <Link href={`/clientNotLogadPage`}>Não precisa esta logado</Link>
      <Link href={'/middlewareProtected'}>Só se estiver logado</Link>
      <div className="ml-auto">
        {session && session.user ? (
          <div className="flex gap-2">
            <p>{session?.user?.person?.name}</p>
            <Logout />
          </div>
        ) : (
          <Link href={'/signin'}>fazer login</Link>
        )}
      </div>
    </div>
  )
}

export default AppBar
