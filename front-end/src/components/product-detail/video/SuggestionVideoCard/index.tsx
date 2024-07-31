'use client'

import { IVideo } from '@/@model/video/video'
import Image from 'next/image'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { VideoLength } from '../VideoLength'

type ISuggestionVideoCard = {
  video: IVideo
  handleSelectedVideo: (video: IVideo) => void
}

const SuggestionVideoCard = ({
  handleSelectedVideo,
  video,
}: ISuggestionVideoCard) => {
  return (
    <button onClick={() => handleSelectedVideo(video)} className="mb-3 flex ">
      <div className="relative h-24 w-40 min-w-[168px] overflow-hidden  bg-slate-800 lg:h-20 lg:w-32 lg:min-w-[128px] xl:h-24 xl:w-40 xl:min-w-[168px]">
        <Image
          width={500}
          height={500}
          className="h-full w-full object-cover"
          src={video.thumbnail_image_url || `/images/placeholder.jpg`}
          alt={video.title}
        />
        {<VideoLength />}
      </div>
      <div className="ml-3 flex flex-col overflow-hidden">
        <span className="line-clamp-2 text-sm font-bold text-neutral-500 lg:text-xs xl:text-sm">
          {video?.title}
        </span>
        <span className="mt-2 flex items-center text-[12px] font-semibold text-neutral-500/[0.7] lg:text-[10px] xl:text-[12px]">
          {video.description}
          {
            <BsFillCheckCircleFill className="ml-1 text-[12px] text-neutral-500/[0.5] lg:text-[10px] xl:text-[12px]" />
          }
        </span>
      </div>
    </button>
  )
}

export { SuggestionVideoCard }
