import { setRedirectTo } from '@/utils/setRedirectTo'
import { usePathname } from 'next/navigation'
import { PuffLoader } from 'react-spinners'
import { LinkButtonPopover } from '../../LinkButtonPopover'

function PopoverPanel() {
  const pathname = usePathname()

  function handleNavSigninOnSetRedirectTo() {
    setRedirectTo({ pathname })
  }

  return (
    <>
      <div className="absolute -top-1 left-[46%] z-20 h-0 w-0 border-b-[18px] border-l-[16px] border-r-[16px] border-b-white border-l-transparent border-r-transparent"></div>

      <div className="absolute right-0 top-full z-10 mt-3 w-60 max-w-md overflow-hidden shadow-lg ring-2 ring-gray-900/5">
        <div className="pag-2 bg-white p-4">
          <p className="my-4 text-gray-500">
            {`pra ver seus pedidos e ter uma experiência personalizada, acesse sua conta :)`}
          </p>
          <div className="pag-4 divide-y divide-gray-100 ">
            <LinkButtonPopover
              onMouseOver={handleNavSigninOnSetRedirectTo}
              className="bg-accent text-white ring-accent ring-offset-slate-50 hover:bg-accent hover:ring-2 hover:ring-offset-2"
              title="entrar"
              href="/signin"
            >
              <PuffLoader size={20} color="white" />
            </LinkButtonPopover>
            <LinkButtonPopover
              onMouseOver={handleNavSigninOnSetRedirectTo}
              className="border-2 border-accent bg-white text-accent ring-gray-400 ring-offset-slate-50 hover:border-gray-300 hover:bg-gray-100 hover:text-gray-700 hover:ring-2 hover:ring-offset-2"
              title="criar conta"
              href="/"
            >
              <PuffLoader size={20} color="red" />
            </LinkButtonPopover>
          </div>
        </div>
      </div>
    </>
  )
}

export { PopoverPanel }
