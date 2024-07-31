import Link from 'next/link'
import Balance from 'react-wrap-balancer'

export default function PrivacyPolicyLink() {
  return (
    <p className="text-center text-sm text-gray-500">
      <Balance>
        Ao continuar com o acesso, você concorda com a nossa
        <Link href="#" className="ml-2 cursor-pointer font-semibold underline">
          política de privacidade
        </Link>
      </Balance>
    </p>
  )
}
