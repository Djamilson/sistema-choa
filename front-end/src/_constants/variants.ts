type IFadeInProps = {
  direction: string
  delay: number
  size?: number
}

export const fadeIn = ({ direction, delay, size = 80 }: IFadeInProps) => {
  return {
    hidden: {
      y: direction === 'up' ? size : direction === 'down' ? -size : 0,
      opacity: 0,
      x: direction === 'left' ? size : direction === 'right' ? -size : 0,
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: 'tween',
        duration: 1.2,
        delay,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  }
}

export const fadeInLogoHome = ({ direction, delay }: IFadeInProps) => {
  return {
    hidden: {
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      opacity: 0,
      x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: 'tween',
        duration: 1.2,
        delay,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  }
}
