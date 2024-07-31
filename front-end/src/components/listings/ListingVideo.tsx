'use client'

import { IVideo } from '@/@model/video/video'
import { useVideos } from '@/hooks/Entity/useVideos'
import { ReactNode, useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { Toast } from '../Toast'
import { LoadingPulseLoader } from '../loadings/LoadingPulseLoader'
import { SuggestionVideoCard } from '../product-detail/video/SuggestionVideoCard'

export type THandleVideo = {
  yesOrNot: 'yes' | 'not'
  answerId: string
  oldStatus: boolean
}

interface ListingVideoProps {
  productId: string
  children: ReactNode
}

const ListingVideo = ({ productId, children }: ListingVideoProps) => {
  const [videos, setVideos] = useState<IVideo[]>([] as IVideo[])
  const [selectedVideo, setSelectedVideo] = useState<IVideo>({} as IVideo)

  const {
    data: videosDB,
    isLoading: isLoadingVideo,
    isFetching: isFetchingVideo,
  } = useVideos(productId, true)

  useEffect(() => {
    if (videosDB && videosDB.length > 0) {
      setVideos(videosDB)
    }
  }, [videosDB])

  useEffect(() => {
    if (videos && videos.length > 0) {
      setSelectedVideo(videos[0])
    }
  }, [videos])

  function handleSelectedVideo(video: IVideo) {
    if (video.id === selectedVideo.id) {
      Toast({
        type: 'warning',
        message: 'Esse video já está selecionado!',
      })
    } else {
      setSelectedVideo(video)
    }
  }

  return (
    <div className="flex w-full flex-1 flex-col bg-white px-4 py-4">
      <div className="flex w-full flex-col">
        <div className="flex flex-1 flex-col items-center justify-center">
          {isLoadingVideo && isFetchingVideo && <LoadingPulseLoader />}
          {!isLoadingVideo && !isFetchingVideo && !videos?.length && children}
        </div>

        <div className="flex w-full flex-col gap-6 ">
          <div className="flex h-[calc(100%-56px)] flex-row justify-center">
            <div className="flex w-full max-w-[1280px] flex-col lg:flex-row">
              {selectedVideo?.video_url && (
                <div className="flex flex-col overflow-y-auto px-4 py-3 lg:w-[calc(100%-350px)] lg:py-6 xl:w-[calc(100%-400px)]">
                  <div className="ml-[-16px] mr-[-16px] h-[200px] md:h-[400px] lg:ml-0 lg:mr-0 lg:h-[400px] xl:h-[550px]">
                    <ReactPlayer
                      url={`https://www.youtube.com/watch?v=${selectedVideo.video_url}`}
                      controls
                      width="100%"
                      height="100%"
                      style={{
                        backgroundColor: '#000000',
                      }}
                      playing={false}
                    />
                  </div>
                  <div className="mt-4 line-clamp-2 text-sm font-bold text-neutral-500 md:text-xl">
                    {selectedVideo?.title}
                  </div>
                </div>
              )}
              <div className="flex flex-col overflow-y-auto px-4 py-6 lg:w-[350px] xl:w-[400px]">
                {videos &&
                  videos.map((item) => {
                    return (
                      <SuggestionVideoCard
                        key={item.id}
                        video={item}
                        handleSelectedVideo={handleSelectedVideo}
                      />
                    )
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListingVideo
