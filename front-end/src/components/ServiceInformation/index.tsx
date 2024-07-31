import Balance from 'react-wrap-balancer'

function ServiceInformation() {
  return (
    <section className="w-full bg-neutral-50 py-16 sm:py-24">
      <div className="items-center p-4 text-center ">
        <h2 className="mt-1 block text-lg font-medium leading-tight text-accent sm:text-sm md:text-lg lg:text-xl xl:text-2xl">
          <Balance>
            ❤️ ATENDIMENTO DE SEG. A SEX. DAS 09:00 ÀS 17:00 VIA WHATSAPP (63) 9
            9231-5334
          </Balance>
        </h2>
        <h2 className="mt-2 block text-lg font-medium leading-tight text-accent sm:text-sm md:mt-0 md:text-lg lg:text-xl xl:text-2xl">
          <Balance>
            ❤️ ENTREGRA GARANTIDA EM TODO EM TODOS OS PRODUTOS | VEJA NOSSAS
            COLEÇÕES
          </Balance>
        </h2>
      </div>
    </section>
  )
}
export { ServiceInformation }
