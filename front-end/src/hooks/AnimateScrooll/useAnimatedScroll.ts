import { animateScroll } from './animateScroll'

type IProps = { id: string; duration?: number }

export const meAnimatedScroll = ({ id, duration = 3000 }: IProps) => {
  const getElementPosition = (element: any) => element.offsetTop

  const initialPosition = window.scrollY
  if (id) {
    const element = document.getElementById(id)

    if (!element) {
      return
    }

    animateScroll({
      targetPosition: getElementPosition(element),
      initialPosition,
      duration,
    })
  }
}
