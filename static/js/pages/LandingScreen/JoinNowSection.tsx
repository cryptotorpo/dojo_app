import { Box, Button, Typography } from '@mui/material'
import { buttonStyles, headingStyles, sectionMiniBoxStyles } from './styles'
import { DollarIcon, JoinNowShade } from '../../assets'

const JoinNowSection = () => {
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
          mt: '80px',
          position: 'relative',
          backgroundImage: `url(${JoinNowShade})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          minHeight: '517px',
          height: '100%',
          border: '1px solid rgba(255, 255, 255, 0.04)',
          mb: '30px',
          p: 2,
        }}
      >
        <Box sx={{ ...sectionMiniBoxStyles, mb: '32px' }}>
          <img src={DollarIcon} alt='Dollar Icon' /> Start Earning
        </Box>

        <Typography
          sx={{
            ...headingStyles,
            textAlign: 'center',
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
            Power Computation
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
            At Scale on Solana
          </span>
        </Typography>

        <Typography
          sx={{
            fontFamily: 'ProximaNovaRegular',
            fontWeight: 400,
            fontSize: '20px',
            lineHeight: '32px',
            textAlign: 'center',
            color: '#94989C',
            pt: '24px',
          }}
        >
          Fuel a global computing network for the largest sector in the world.
        </Typography>

        <Button
          sx={{
            ...buttonStyles,
            width: '240px',
            backgroundColor: '#ffffff',
            color: '#000000',
            mt: '32px',
          }}
        >
          Join Now
        </Button>
      </Box>
    </Box>
  )
}

export default JoinNowSection
