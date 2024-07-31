import { Header } from '..'

export function HeaderMY() {
  return (
    <Header.Root>
      <Header.Logo
        href="/"
        urlLogo="/images/logo.png"
      />
      <Header.Search />
    </Header.Root>
  )
}
