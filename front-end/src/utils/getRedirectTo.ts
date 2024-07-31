import { parseCookies } from 'nookies'

function getRedirectTo(): string {
  const cookies = parseCookies()
  const oldUrl = cookies.redirectTo

  if (oldUrl && oldUrl.endsWith('/images/logo.png')) {
    return '/'
  }

  return oldUrl ?? '/'
}

export { getRedirectTo }
