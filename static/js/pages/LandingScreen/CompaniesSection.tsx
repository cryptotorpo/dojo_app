import {
  AmdLogo,
  AppleLogo,
  CircledFlashlight,
  GoogleLogo,
  IntelLogo,
} from '../../assets'
import EmblaCarousel from '../../components/EmblaCarousel'
import { headingStyles, sectionMiniBoxStyles } from './styles'
import { Box, Typography, useMediaQuery } from '@mui/material'

const CompaniesSection = () => {
  const isDown800 = useMediaQuery('(max-width: 800px)')
  const isDown600 = useMediaQuery('(max-width: 600px)')
  const isDown400 = useMediaQuery('(max-width: 400px)')

  const slideSize = isDown400 ? 2 : isDown600 ? 3 : isDown800 ? 4 : 5

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        maxWidth: '1200px',
        width: '100%',
        pt: isDown600 ? '100px' : '160px',
      }}
    >
      <Box sx={{ ...sectionMiniBoxStyles, mb: 4, mx: '20px' }}>
        <img src={CircledFlashlight} alt='Chip Icon' /> Driving Innovation
      </Box>

      <Typography
        sx={{
          ...headingStyles,
          textAlign: 'left',
          pb: '64px',
          px: '20px',
        }}
      >
        <span
          style={{
            background:
              'linear-gradient(180deg, #FFFFFF 0%, #363A3F 140.97%), #FFFFFF',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          The Largest Companies in the
        </span>
        <br />
        <span
          style={{
            background:
              'linear-gradient(180deg, #FFFFFF 0%, #363A3F 140.97%), #FFFFFF',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          World Power AI Usage
        </span>
      </Typography>

      <EmblaCarousel
        slides={[
          AmdLogo,
          IntelLogo,
          GoogleLogo,
          AppleLogo,
          AmdLogo,
          IntelLogo,
          GoogleLogo,
          AppleLogo,
        ]}
        customStyles={
          {
            '--slide-height': '8rem',
            '--slide-spacing': '0rem',
            '--slide-size': `calc(100% / ${slideSize} - var(--slide-spacing))`,
          } as React.CSSProperties
        }
        isCompanies={true}
      />
    </Box>
  )
}

export default CompaniesSection
