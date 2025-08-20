import React, { useEffect } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'
import './embla.css'
import { Box, Typography, useMediaQuery } from '@mui/material'
import { isDOMComponent } from 'react-dom/test-utils'

type SlidePropType = {
  icon: string
  name: string
}

type PropType = {
  slides: SlidePropType[]
  options?: EmblaOptionsType
  syncApi?: any
  onInit?: (api: any) => void
  iconOnLeft?: boolean
}

const VerticalEmblaCarousel: React.FC<PropType> = props => {
  const { slides, options, syncApi, onInit, iconOnLeft = false } = props
  const isDown750 = useMediaQuery('(max-width:750px)')

  const defaultStyles: React.CSSProperties & {
    '--slide-height': string
    '--slide-spacing': string
    '--slide-size': string
  } = {
    maxWidth: '100%',
    width: '100%',
    margin: 'auto',
    '--slide-height': '48px',
    '--slide-spacing': '1rem',
    '--slide-size': `calc(100% / ${
      isDown750 ? 3.5 : 2
    } - var(--slide-spacing))`,
  }

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

  return (
    <div id='verticalEmblaCarousel' className='embla' style={defaultStyles}>
      <div className='embla__viewport' ref={emblaRef}>
        <div className='embla__container'>
          {slides.map((slide, index) => (
            <div className='embla__slide' key={index}>
              <div className='embla__slide__number'>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '8px',
                    alignItems: 'center',
                    height: '64px',
                    border: '0.5px solid rgba(255, 255, 255, 0.25)',
                    borderRadius: '12px',
                    boxShadow: '0px 0px 8px 4px rgba(37, 37, 40, 1)',
                    backgroundColor: 'rgba(0,0,0,1)',
                    width: 'max-content',
                    paddingLeft: {
                      xs: iconOnLeft ? '8px' : '12px',
                      sm: iconOnLeft ? '8px' : '12px',
                      md: iconOnLeft ? '14px' : '22px',
                      lg: iconOnLeft ? '16px' : '24px',
                    },
                    paddingRight: {
                      xs: iconOnLeft ? '12px' : '8px',
                      sm: iconOnLeft ? '12px' : '8px',
                      md: iconOnLeft ? '22px' : '14px',
                      lg: iconOnLeft ? '24px' : '16px',
                    },
                  }}
                >
                  {iconOnLeft && (
                    <Box
                      src={slide.icon}
                      alt={`slide-${index}`}
                      sx={{
                        height: {
                          xs: '24px',
                          sm: '28px',
                          md: '30px',
                          lg: '32px',
                        },
                        width: {
                          xs: '24px',
                          sm: '28px',
                          md: '30px',
                          lg: '32px',
                        },
                      }}
                      component={'img'}
                    />
                  )}
                  <Typography
                    sx={{
                      fontFamily: 'ProximaNovaRegular',
                      fontSize: {
                        xs: '12px',
                        sm: '14px',
                        md: '18px',
                      },
                      fontWeight: 400,
                      lineHeight: '27px',
                      color: 'rgba(148, 152, 156, 1)',
                    }}
                  >
                    {slide.name}
                  </Typography>
                  {!iconOnLeft && (
                    <Box
                      src={slide.icon}
                      alt={`slide-${index}`}
                      sx={{
                        height: {
                          xs: '24px',
                          sm: '28px',
                          md: '30px',
                          lg: '32px',
                        },
                        width: {
                          xs: '24px',
                          sm: '28px',
                          md: '30px',
                          lg: '32px',
                        },
                      }}
                      component={'img'}
                    />
                  )}
                </Box>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default VerticalEmblaCarousel
