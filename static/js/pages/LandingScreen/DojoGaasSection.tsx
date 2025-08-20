import { Box, Typography, styled, Tooltip } from '@mui/material'
import { headingStyles, sectionMiniBoxStyles } from './styles'
import { ChipIcon, StepsShade, StepsArrow, BottomGrid } from '../../assets'

const DojoGaasSection = () => {
  const CircleContainer = styled('div')(({ theme }) => ({
    width: 64,
    height: 64,
    background: 'rgba(9, 9, 10, 1)',
    boxShadow:
      '0px 0.5px 0px rgba(255, 255, 255, 0.15), inset 0px 0.5px 0px rgba(255, 255, 255, 0.16)',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    [theme.breakpoints.down('lg')]: {
      position: 'relative',
      width: 48,
      height: 48,
    },
  }))

  const NumberInsideCircle = styled(Typography)(({ theme }) => ({
    fontFamily: 'ProximaNovaRegular',
    fontWeight: 600,
    fontSize: '24px',
    lineHeight: '31.2px',
    letterSpacing: '-0.01em',
    color: '#FFFFFF',
    [theme.breakpoints.down('lg')]: {
      fontSize: '24px',
    },
  }))

  const StyledBox = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: '100%',
    maxWidth: '288px',
    minHeight: '300px',
    maxHeight: '100%',
    background: `url(${StepsShade}) no-repeat center center`,
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    textAlign: 'left',
    gap: '12px',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: '16px',
    paddingTop: '35px',
    paddingLeft: '24px',
    paddingBottom: '24px',
    paddingRight: '24px',
    transition: 'transform 0.3s ease, background-size 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
      backgroundSize: '110%',
    },
  }))

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...'
    }
    return text
  }

  const steps = [
    {
      name: 'Stake Token',
      desc: "Stake $DOAI to mint native GPU's on Solana that represents computational power.",
    },
    {
      name: 'Mine Computed Yield',
      desc: 'Earn up to 100% in native yield directly from [D-CLOUD] monetization.',
    },
    {
      name: 'Earn Rewards',
      desc: '[D-CLOUD] fees are distributed fairly back to all direct network stakers and participants.',
    },
    {
      name: 'Monitor Usage',
      desc: 'Your bespoke terminal to monitor $DOAI cloud consumption, computation and rewards.',
    },
  ]

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        marginBottom: '300px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          maxWidth: '1240px',
          pt: '100px',
          px: '20px',
          zIndex: 1,
        }}
      >
        <Box sx={{ ...sectionMiniBoxStyles, mb: '32px' }}>
          <img src={ChipIcon} alt='Chip Icon' /> GPU-as-a-Service
        </Box>

        <Typography sx={{ ...headingStyles, textAlign: 'center' }}>
          The Dojo GaaS Program
        </Typography>

        <Typography
          sx={{
            fontFamily: 'ProximaNovaRegular',
            fontWeight: 400,
            fontSize: '22px',
            lineHeight: '160%',
            textAlign: 'center',
            color: '#94989C',
            pt: '24px',
          }}
        >
          Providing GPU-as-a-Service on Solana in 4 simple steps
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '16px',
            flexWrap: 'wrap',
            pt: '58px',
            zIndex: 1,
            justifyContent: 'center',
          }}
        >
          {steps.map((step, index) => (
            <StyledBox key={index}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <CircleContainer>
                  <NumberInsideCircle>{index + 1}</NumberInsideCircle>
                </CircleContainer>

                {index !== steps.length - 1 && (
                  <img src={StepsArrow} alt='Steps Arrow' />
                )}
              </Box>
              <Typography
                sx={{
                  fontFamily: 'ProximaNovaRegular',
                  fontSize: '24px',
                  lineHeight: '29.52px',
                  color: 'rgba(229, 233, 236, 1)',
                  fontWeight: 600,
                }}
              >
                {step.name}
              </Typography>
              <Tooltip title={step.desc} placement='bottom'>
                <Typography
                  sx={{
                    fontFamily: 'ProximaNovaRegular',
                    fontSize: '18px',
                    lineHeight: '28.8px',
                    color: 'rgba(148, 152, 156, 1)',
                    fontWeight: 300,
                  }}
                >
                  {truncateText(step.desc, 70)}
                </Typography>
              </Tooltip>
            </StyledBox>
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          bottom: '-300px',
          width: '100%',
          zIndex: 0,
        }}
      >
        <img
          src={BottomGrid}
          alt='Bottom Grid'
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </Box>
    </Box>
  )
}

export default DojoGaasSection
