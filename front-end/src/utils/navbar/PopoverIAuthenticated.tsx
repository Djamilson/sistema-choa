import { Popover, Transition } from '@headlessui/react'
import { Fragment, useRef } from 'react'
import { ButtonSignin } from './Popover/ButtonSignin'
import { PopoverPanel } from './Popover/PoroverPanel'

function PopoverIAuthenticated() {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const timeoutDuration = 200
  let timeout: ReturnType<typeof setTimeout>

  const closePopover = (): boolean | undefined => {
    return buttonRef.current?.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
        cancelable: true,
      }),
    )
  }
  const onMouseEnter = (open: boolean): void => {
    clearTimeout(timeout)
    if (open) return
    return buttonRef.current?.click()
  }

  const onMouseLeave = (open: boolean): void => {
    if (!open) return
    timeout = setTimeout(() => closePopover(), timeoutDuration)
  }

  return (
    <Popover.Group className="lg:flex lg:gap-x-12">
      <Popover className="relative hidden md:block">
        {({ open }) => {
          return (
            <div onMouseLeave={onMouseLeave.bind(null, open)}>
              <Popover.Button
                ref={buttonRef}
                onMouseEnter={onMouseEnter.bind(null, open)}
                onMouseLeave={onMouseLeave.bind(null, open)}
                className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-white"
              >
                <ButtonSignin />
              </Popover.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute -right-6 top-full z-10 mt-3 w-60 max-w-md">
                  <div
                    className=""
                    onMouseEnter={onMouseEnter.bind(null, open)}
                    onMouseLeave={onMouseLeave.bind(null, open)}
                  >
                    <PopoverPanel />
                  </div>
                </Popover.Panel>
              </Transition>
            </div>
          )
        }}
      </Popover>

      <Popover className="relative md:hidden">
        <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-white">
          <ButtonSignin />
        </Popover.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="absolute -right-6 top-full z-10 mt-3 w-60 max-w-md">
            <div className="">
              <PopoverPanel />
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </Popover.Group>
  )
}

export { PopoverIAuthenticated }
