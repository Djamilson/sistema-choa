'use client'

import { CheckIcon } from '@heroicons/react/24/solid'
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'next-share'
import { Dispatch, SetStateAction, useState } from 'react'
import { MdContentCopy } from 'react-icons/md'
import { Toast } from '../Toast'

type IProps = {
  mountUrl: string
  productId: string
  aggregationProductId: string
}

function SharedButtons({ mountUrl, productId, aggregationProductId }: IProps) {
  const meUrl = `${mountUrl}/${productId}/${aggregationProductId}`

  const [onTimeoutCopy, setOnTimeoutCopy] = useState<boolean>(false)

  function handleMessageCopy(
    copyLabel: string,
    meSetOnTimeout: Dispatch<SetStateAction<boolean>>,
  ) {
    Toast({
      message: `${copyLabel} copiado com sucesso!`,
      type: 'success',
    })

    const timeOutStart = true
    const timeOutEnd = false
    const timeDuration = 3000

    meSetOnTimeout(timeOutStart)
    setTimeout(() => meSetOnTimeout(timeOutEnd), timeDuration)
  }

  const copyUrlToClipboard = async (
    value: string,
    copyLabel: string,
    meSetOnTimeout: Dispatch<SetStateAction<boolean>>,
  ) => {
    navigator.clipboard.writeText(value)
    handleMessageCopy(copyLabel, meSetOnTimeout)
  }

  return (
    <div className="mx-16 grid grid-cols-3 gap-2 lg:grid-cols-5 xl:grid-cols-7">
      <EmailShareButton url={meUrl}>
        <EmailIcon size={32} round />
      </EmailShareButton>
      <FacebookShareButton url={meUrl}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TelegramShareButton url={meUrl}>
        <TelegramIcon size={32} round />
      </TelegramShareButton>
      <TwitterShareButton url={meUrl}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <WhatsappShareButton url={meUrl}>
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
      <LinkedinShareButton url={meUrl}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>

      {onTimeoutCopy ? (
        <div className="w-6 items-center p-2">
          <CheckIcon className="w-6 text-green-600" />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => copyUrlToClipboard(meUrl, 'Link', setOnTimeoutCopy)}
          className="inline-flex items-center py-2 font-bold text-gray-600 hover:text-accent"
        >
          <div className="w-8">
            <MdContentCopy />
          </div>
          <span className="whitespace-nowrap">copiar link</span>
        </button>
      )}
    </div>
  )
}

export { SharedButtons }
