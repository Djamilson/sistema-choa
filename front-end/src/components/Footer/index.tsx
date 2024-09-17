import Container from '../Container'
import Wrapper from '../Header/Wrapper'
import { FooterMenuPolitics } from './FooterMenuPolitics'
import { FooterMenuWhoWeAre } from './FooterMenuWhoWeAre'
import { FooterMeuCategories } from './FooterMeuCategories'
import { FooterSocial } from './FooterSocial'
import { NavLink } from './NavLink'

const Footer = () => {
  return (
    <footer className="w-full bg-neutral-50 text-neutral-500">
      <Container>
        <div className="mx-auto grid w-full grid-cols-2 gap-8 pb-10 pt-14 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
          <FooterMeuCategories />
          <FooterMenuPolitics />
          <FooterMenuWhoWeAre />
          <FooterSocial />
        </div>
      </Container>

      <div className="w-full bg-neutral-100 py-6">
        <Wrapper className="flex flex-col justify-between gap-[10px] md:flex-row md:gap-0">
          <div className="cursor-pointer text-center text-sm text-neutral-600 hover:text-accent md:text-left">
            © Choa 2024, Inc. Todos os direitos reservados
          </div>

          <div className="flex flex-wrap justify-center gap-2 text-center md:gap-5 md:text-left">
            <NavLink href="/contact" title="Contato" />
          </div>
        </Wrapper>
      </div>
    </footer>
  )
}

export default Footer
