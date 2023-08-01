import SlickSlider, { Settings as SliderSettings } from "react-slick"

import type { ConsultingSlides } from "@org/cms"

import slick from "slick-carousel/slick/slick.css"
import slickTheme from "slick-carousel/slick/slick-theme.css"

export const links = () => [
  { rel: "stylesheet", href: slick },
  { rel: "stylesheet", href: slickTheme },
]

const defaultOptions: SliderSettings = {
  dots: true,
  infinite: true,
  speed: 1500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
}

// ####
// #### Types
// ####

export type SliderPropsType = {
  slides: ConsultingSlides
  sliderStyle?: string
  rounded?: boolean
  options?: SliderSettings
  containerClassName?: string
}

// ####
// #### Component
// ####

const Slider = ({
  slides,
  sliderStyle,
  rounded = false,
  options = defaultOptions,
  containerClassName,
}: SliderPropsType) => {
  return (
    <div
      className={`${
        rounded && "rounded overflow-hidden w-full"
      } ${containerClassName}`}
    >
      <SlickSlider
        {...options}
        className={`w-full rounded overflow-hidden z-10 ${sliderStyle}`}
      >
        {slides.map((slide) => {
          const image = slide?.image
          if (typeof image === "object") {
            return (
              <div
                key={image?.id}
                className={` relative w-full aspect-[3/2] z-50`}
              >
                <img
                  src={image?.url ?? ""}
                  alt={image?.alt ?? image.caption ?? ""}
                  className="object-cover w-full h-full -z-[1]"
                />
              </div>
            )
          }
        })}
      </SlickSlider>
    </div>
  )
}

export default Slider
