import { toast } from 'react-toastify'

export type IToastProps = {
  message: string
  type: 'warning' | 'success' | 'info' | 'error' | 'default'
  autoClose?: number | false | undefined
  hideProgressBar?: boolean
}

function Toast({ type, autoClose, message }: IToastProps) {
  return toast(message, {
    hideProgressBar: false,
    autoClose: autoClose || 5000,
    type,
    position: 'top-right',
    theme: 'light',
  })
}

export { Toast }
