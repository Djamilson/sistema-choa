const pow = Math.pow

function easeOutQuart(x: any) {
  return 1 - pow(1 - x, 4)
}

type IProps = {
  targetPosition: number
  initialPosition: number
  duration: number
}

export function animateScroll({
  targetPosition,
  initialPosition,
  duration,
}: IProps) {
  let start: any
  let position: number
  let animationFrame: number

  const requestAnimationFrame = window.requestAnimationFrame
  const cancelAnimationFrame = window.cancelAnimationFrame

  // maximum amount of pixels we can scroll
  const maxAvailableScroll =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight

  const amountOfPixelsToScroll = initialPosition - targetPosition

  function step(timestamp: any) {
    if (start === undefined) {
      start = timestamp
    }

    const elapsed = timestamp - start

    const relativeProgress = elapsed / duration

    const easedProgress = easeOutQuart(relativeProgress)

    position =
      initialPosition - amountOfPixelsToScroll * Math.min(easedProgress, 1)

    window.scrollTo(0, position)

    if (
      initialPosition !== maxAvailableScroll &&
      window.scrollY === maxAvailableScroll
    ) {
      cancelAnimationFrame(animationFrame)
      return
    }

    if (elapsed < duration) {
      animationFrame = requestAnimationFrame(step)
    }
  }

  animationFrame = requestAnimationFrame(step)
}
