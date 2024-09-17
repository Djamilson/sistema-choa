'use client'
import Link from 'next/link'
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'

function FooterSocial() {
  return (
    <div className="flex justify-center gap-4 pt-4">
      <button
        type="button"
        onClick={() => window.open('https://facebook.com', '_blank')}
        className="bg-red/[0.25] flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-accent hover:bg-white/[0.5]"
      >
        <FaFacebookF size={20} />
      </button>
      <Link
        href="https://twitter.com"
        className="bg-neutral/[0.25] flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-accent hover:bg-white/[0.5]"
      >
        <FaTwitter size={20} />
      </Link>
      <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/[0.25] text-accent hover:bg-white/[0.5]">
        <FaYoutube size={20} />
      </div>
      <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/[0.25] text-accent hover:bg-white/[0.5]">
        <FaInstagram size={20} />
      </div>
    </div>
  )
}

export { FooterSocial }
