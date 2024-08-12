type IAlertProps = {
  title: string
  message: string
}

export const Alert = ({ title, message }: IAlertProps) => {
  return (
    <div
      className="mt-4 border-s-4 border-accent bg-red-50 p-2 dark:bg-red-800/30"
      role="alert"
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <span className="inline-flex size-8 items-center justify-center rounded-full border-4 border-red-100 bg-red-200 text-red-800 dark:border-red-900 dark:bg-red-800 dark:text-red-400">
            <svg
              className="size-4 flex-shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
              <path d="M12 9v4" />
              <path d="M12 17h.01" />
            </svg>
          </span>
        </div>
        <div className="ms-3">
          <h3 className="font-semibold text-gray-800 dark:text-white">
            {title}
          </h3>
          <p className="text-sm text-gray-700 dark:text-gray-400">{message}</p>
        </div>
      </div>
    </div>
  )
}
