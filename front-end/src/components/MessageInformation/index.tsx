import Image from 'next/image'

function MessageInformation() {
  return (
    <section className="w-full bg-white shadow-md">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <Image
            src="/images/empty-cart.jpg"
            width={300}
            height={300}
            alt=""
            className="h-48 w-full object-cover md:h-full md:w-48"
          />
        </div>
        <div className="flex flex-1 items-center p-8">
          <h2 className="block text-center text-lg font-medium leading-tight text-accent sm:text-sm md:text-lg lg:text-xl xl:text-2xl">
            ❤️ DE UM PRESENTE PARA A QUEM VOCÊ AMA | VEJA NOSSAS COLEÇÕES
          </h2>
        </div>
      </div>
    </section>
  )
}
export { MessageInformation }
