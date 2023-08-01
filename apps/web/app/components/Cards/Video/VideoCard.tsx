import { Home, VideoLink } from "@org/cms"
import VideoPlayer from "~/components/VideoPlayer"

// ####
// #### Types
// ####

export type VideoCardPropsType = {
  rounded?: boolean
  light?: boolean
  cardStyle?: string
  titleStyle?: string
  playerStyle?: string
  videoLink: VideoLink[0]
}

// ####
// #### Component
// ####

const VideoCard = ({
  rounded = true,
  light = true,
  cardStyle,
  titleStyle,
  playerStyle,
  videoLink,
}: VideoCardPropsType) => {
  const { id, title, provider } = videoLink
  if (provider) {
    return (
      <div className={"w-full h-full " + cardStyle}>
        {/* Title */}
        {title && (
          <div
            className={
              "text-center pb-4 text-2xl divide-y-4 divide-gray-150 divide-double relative px-6 " +
              titleStyle
            }
          >
            <h2 className="pb-2">{title}</h2>
            <div></div>
          </div>
        )}
        <VideoPlayer
          videoLink={videoLink}
          divStyle={playerStyle}
          rounded={rounded}
          light={
            typeof videoLink.placeholderImage === "object" ? (
              <img
                src={videoLink.placeholderImage.url}
                alt={
                  videoLink.placeholderImage.alt ??
                  videoLink.placeholderImage.caption ??
                  ""
                }
                width={videoLink.placeholderImage?.width ?? undefined}
                height={videoLink.placeholderImage?.height ?? undefined}
                className="w-full aspect-video"
              />
            ) : (
              light
            )
          }
        />
      </div>
    )
  }
  return <div>Error</div>
}

export default VideoCard
