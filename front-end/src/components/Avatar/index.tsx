import cn from '@/utils/cn'
import Image from 'next/image'

interface AvatarProps {
  src: string | null | undefined
  className?: string | undefined
}

const Avatar = ({ src, className }: AvatarProps) => {
  return (
    <Image
      className={cn(
        `inline-block h-9 w-9 rounded-full object-cover ring-2 ring-white`,
        className,
      )}
      height={32}
      width={32}
      alt="avatar"
      src={src || '/images/placeholder.jpg'}
    />
  )
}

export default Avatar
