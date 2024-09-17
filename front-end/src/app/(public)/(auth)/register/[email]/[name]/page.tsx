import RegisterForm from './components/RegisterForm'

type IPageProps = {
  params: {
    email: string
    name: string
  }
}

export default function Register({ params }: IPageProps) {
  return (
    <div className="w-full bg-neutral-100 text-secondary">
      <RegisterForm params={params} />
    </div>
  )
}
