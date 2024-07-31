import { auth } from '@/auth'
import { Breadcrumb } from '@/components/Breadcrumb'
import { ItemBreadcrumb } from '@/components/Breadcrumb/ItemBreadcrumb'
import { ItemBreadcrumbLink } from '@/components/Breadcrumb/ItemBreadcrumbLink'
import Container from '@/components/Container'
import ContainerSession from '@/components/ContainerSession'
import { CookiesWithDismiss } from '@/components/CookiesWithDismiss'
import Footer from '@/components/Footer'
import { Header } from '@/components/Header'
import { HeaderRoot } from '@/components/Header/HeaderRoot'
import { HeaderTitle } from '@/components/Header/HeaderTitle'
import { SideBarNavMenuCategory } from '@/components/MenuCategory/SideBarNavMenuCategory'
import { SideBarNavMenuInfoEcommerce } from '@/components/MenuInfoEcommerce/SideBarNavMenuInfoEcommerce'
import SideBar from '@/components/my-account/Sidebar'
import CategoryMenuHamburger from '@/components/navbar/CategoryMenuHamburger'
import { redirect } from 'next/navigation'
import { ReactElement } from 'react'
import { HiHome } from 'react-icons/hi'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'

type ILayoutProps = {
  children: ReactElement
}

const Layout = async ({ children }: ILayoutProps) => {
  const session = await auth()

  if (!session || !session.user) return redirect(`/signin`)

  return (
    <div className={`bg-neutral-100`}>
      <HeaderTitle />
      <HeaderRoot>
        <Header.Logo href="/" urlLogo="/images/logo.png" />
        <ContainerSession />
      </HeaderRoot>

      <SideBarNavMenuInfoEcommerce />
      <div className="w-full border-b-[1px] shadow-sm">
        <Container>
          <div className="flex w-full flex-row items-center justify-between">
            <CategoryMenuHamburger />
            <div className="hidden flex-row md:block">
              <SideBarNavMenuCategory />
            </div>
          </div>
        </Container>
      </div>

      <Breadcrumb>
        <ItemBreadcrumbLink href="/" title="Início" icon={HiHome} />
        <ItemBreadcrumb
          title="descrição do produto"
          icon={MdOutlineKeyboardArrowRight}
        />
      </Breadcrumb>

      <Container>
        <div className="my-10 flex flex-col gap-4 lg:flex-row">
          <div className="flex-[1] bg-white p-[12px]">
            <h3 className="text-lg font-semibold">Menu</h3>
            <div className="mt-4">
              <SideBar />
            </div>
          </div>
          {children}
        </div>
      </Container>

      <CookiesWithDismiss />
      <Footer />
    </div>
  )
}

export default Layout
