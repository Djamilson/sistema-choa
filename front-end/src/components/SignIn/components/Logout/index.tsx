import { doLogout } from '@/auth/actions'

type ILogoutProps = {
  title?: string
}

const Logout = ({ title = 'sim' }: ILogoutProps) => {
  return (
    <form action={doLogout}>
      <button
        className="inline-flex w-full min-w-24 justify-center bg-red-600 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
        type="submit"
      >
        {title}
      </button>
    </form>
  )
}

export default Logout
