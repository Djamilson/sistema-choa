import { setCookie } from 'nookies'

type ISetRedirectToProps = {
  pathname: string
}

function setRedirectTo({ pathname }: ISetRedirectToProps) {
  const targetUrl = 'http://localhost:3000/images/logo.png'

  setCookie(
    undefined,
    'redirectTo',
    pathname === targetUrl ? 'http://localhost:3000/' : pathname,
    {
      maxAge: 60, // 1 minuto
      path: '/',
      sameSite: true,
      secure: true,
    },
  )
}

export { setRedirectTo }
