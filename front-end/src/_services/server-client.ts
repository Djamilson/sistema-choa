type IGetTokenByCookiesProps = {
  token?: string
  refresh_token?: string
}

export const getTokenByCookies = async (): Promise<IGetTokenByCookiesProps> => {
  if (typeof window === 'undefined') {
    const { cookies } = await import('next/headers')

    const token = cookies().get('_next_auth.sho_oferta.ecommerce.token')?.value
    const refresh_token = cookies().get(
      '_next_auth.sho_oferta.ecommerce.refresh_token',
    )?.value

    return { token, refresh_token }
  } else {
    const { getCookie } = await import('cookies-next')

    const token = getCookie('_next_auth.sho_oferta.ecommerce.token')
    const refresh_token = getCookie(
      '_next_auth.sho_oferta.ecommerce.refresh_token',
    )

    return { token, refresh_token }
  }
}
