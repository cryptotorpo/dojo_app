import { Box, Typography, useMediaQuery } from '@mui/material'
import { headingStyles, sectionMiniBoxStyles } from './styles'
import {
  ExchangeLines,
  HeroBgMovie,
  CPIconOne,
  CPIconTwo,
  CPIconThree,
  CPIconFour,
  CPIconFive,
  CPIconSix,
  CPIconSeven,
  CPIconEight,
  CPIconNine,
  CPIconTen,
  CPIconEleven,
  CPIconTwelve,
  CPIconThirteen,
  CPIconFourteen,
  DojoGlow,
} from '../../assets'
import VerticalEmblaCarousel from '../../components/VerticalEmblaCarousel'

const MultifacetedSection = () => {
  const isDown750 = useMediaQuery('(max-width:750px)')
  const carouselOne = [
    {
      name: 'Computer Vision',
      icon: CPIconOne,
    },
    {
      name: 'Speech Recognition',
      icon: CPIconTwo,
    },
    {
      name: 'NLP Based Applications',
      icon: CPIconThree,
    },
    {
      name: 'TradFi Applications',
      icon: CPIconFour,
    },
    {
      name: 'Recommendation Systems',
      icon: CPIconFive,
    },
    {
      name: 'Smart Homes',
      icon: CPIconSix,
    },
    {
      name: 'Healthcare Systems',
      icon: CPIconSeven,
    },
  ]
  const carouselTwo = [
    {
      name: 'Expert Systems',
      icon: CPIconEight,
    },
    {
      name: 'Robotics',
      icon: CPIconNine,
    },
    {
      name: 'Machine Learning',
      icon: CPIconTen,
    },
    {
      name: 'Deep Learning',
      icon: CPIconEleven,
    },
    {
      name: 'Autonomous AI',
      icon: CPIconTwelve,
    },
    {
      name: 'Virtual Assistants',
      icon: CPIconThirteen,
    },
    {
      name: 'Fraud Detection',
      icon: CPIconFourteen,
    },
  ]
  return (
    <Box
      sx={{
        px: '20px',
        width: '100%',
        maxWidth: '1240px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          maxWidth: '1200px',
          pt: isDown750 ? '100px' : '180px',
          width: '100%',
        }}
      >
        <Box sx={{ ...sectionMiniBoxStyles, mb: '32px' }}>
          <img src={ExchangeLines} alt='Chip Icon' /> The Power of Dojo
        </Box>

        <Typography sx={headingStyles}>
          Multifaceted Computational Power
        </Typography>

        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: '1200px',
            height: '592px',
            width: '100%',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.04)',
            borderRadius: '16px',
            mt: '48px',
          }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              top: 0,
              left: 0,
              zIndex: 1,
              opacity: 0.25,
              backgroundBlendMode: 'luminosity',
            }}
          >
            <source src={HeroBgMovie} type='video/mp4' />
            Your browser does not support the video tag.
          </video>

          {/* black overlay */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 3,
              backgroundColor: 'rgba(0, 0, 0, 0.75)',
            }}
          />

          <Box
            sx={{
              display: 'flex',
              flexDirection: isDown750 ? 'column' : 'row',
              alignItems: 'center',
              gap: { xs: '10px', sm: '20px', md: '50px', lg: '80px' },
              width: '100%',
              justifyContent: 'center',
              zIndex: 4,
              paddingX: { xs: '20px', sm: '40px', md: '50px', lg: '62px' },
            }}
          >
            {/* Vertical carousel 1 */}
            <VerticalEmblaCarousel
              slides={carouselOne}
              options={{
                axis: isDown750 ? 'x' : 'y',
              }}
            />
            {/* DojoGlow img */}
            <Box
              component='img'
              src={DojoGlow}
              alt='DojoGlow'
              sx={{
                width: { xs: '200px', sm: '200px', md: '250px', lg: '317px' },
                height: { xs: '200px', sm: '200px', md: '250px', lg: '320px' },
              }}
            />

            {/* Vertical carousel 2 */}
            <VerticalEmblaCarousel
              slides={carouselTwo}
              options={{
                axis: isDown750 ? 'x' : 'y',
              }}
              iconOnLeft={true}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default MultifacetedSection
