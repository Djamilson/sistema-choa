import { auth } from '@/auth'
import CartOnFavorite from '@/components/navbar/CartOnFavorite'
import { PopoverAuthenticated } from '@/components/navbar/PopoverAuthenticated'
import { PopoverNotAuthenticated } from '@/components/navbar/PopoverNotAuthenticated'

async function ContainerSession() {
  const session = await auth()

  return (
    <div className="flex bg-gradient-to-b p-2 ">
      <div className="ml-auto flex space-x-5">
        {session && session.user ? (
          <div className="flex gap-2">
            <PopoverAuthenticated
              name={session?.user?.person?.name.split(' ')[0]}
              avatar_url=""
            />
          </div>
        ) : (
          <PopoverNotAuthenticated />
        )}
        <CartOnFavorite />
      </div>
    </div>
  )
}

export default ContainerSession
