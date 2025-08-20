import React, { useEffect } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'
import './embla.css'

type PropType = {
  slides: string[]
  options?: EmblaOptionsType
  syncApi?: any
  onInit?: (api: any) => void
  customStyles?: React.CSSProperties
  isCompanies?: boolean
}

const EmblaCarousel: React.FC<PropType> = props => {
  const {
    slides,
    options,
    syncApi,
    onInit,
    customStyles,
    isCompanies = false,
  } = props

  const carouselOptions = {
    ...options,
    loop: true,
  }

  const [emblaRef, emblaApi] = useEmblaCarousel(carouselOptions, [
    AutoScroll({
      playOnInit: true,
      stopOnInteraction: false,
      speed: 2,
    }),
  ])

  const handleVisibilityChange = () => {
    if (document.visibilityState === 'visible' && emblaApi) {
      emblaApi.reInit()
    }
  }

  useEffect(() => {
    if (emblaApi && syncApi) {
      emblaApi.on('scroll', () => syncApi.scrollTo(emblaApi.scrollProgress()))
      syncApi.on('scroll', () => emblaApi.scrollTo(syncApi.scrollProgress()))
    }

    if (emblaApi && onInit) {
      onInit(emblaApi)
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [emblaApi, syncApi, onInit])

  const defaultStyles: React.CSSProperties & {
    '--slide-height': string
    '--slide-spacing': string
    '--slide-size': string
  } = {
    maxWidth: '100%',
    margin: 'auto',
    '--slide-height': '48px',
    '--slide-spacing': '1rem',
    '--slide-size': 'calc(100% / 4.5 - var(--slide-spacing))',
  }

  return (
    <div
      className='embla'
      id='horizontalEmblaCarousel'
      style={
        isCompanies
          ? {
              ...defaultStyles,
              ...customStyles,
            }
          : defaultStyles
      }
    >
      <div className='embla__viewport' ref={emblaRef}>
        <div className='embla__container'>
          {slides.map((slide, index) => (
            <div className='embla__slide' key={index}>
              <div className='embla__slide__number'>
                <img src={slide} alt={`slide-${index}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EmblaCarousel
