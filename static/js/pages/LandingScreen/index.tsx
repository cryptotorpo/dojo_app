import { Box, Button, Typography, useMediaQuery } from '@mui/material'
import {
  CircledMenu,
  CircledRightArrow,
  DojoGreyIcon,
  EfficientIcon,
  FlashlightIcon,
  FoundationSectionBg,
  HighDemandIcon,
  RevolutionaryIcon,
} from '../../assets'
import {
  buttonStyles,
  headingStyles,
  sectionMiniBoxStyles,
  subheadingStyles,
  textStyles,
  typographyStyles,
} from './styles'
import FuelingSection from './FuelingSection'
import DojoGaasSection from './DojoGaasSection'
import GlobeSection from './GlobeSection'
import JoinNowSection from './JoinNowSection'
import CompaniesSection from './CompaniesSection'
import MultifacetedSection from './MultifacetedSection'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../redux/configureStore'

const LandingScreen = () => {
  const navigate = useNavigate()
  const { isLoggedIn } = useAppSelector(state => state.user)
  const isDown900 = useMediaQuery('(max-width:900px)')
  const isDown600 = useMediaQuery('(max-width:600px)')
  const aboutSectionDetails = [
    {
      name: 'Revolutionary',
      icon: RevolutionaryIcon,
      desc: 'Funneling value across a globally distributed cloud network across Solana.',
    },
    {
      name: 'High Demand',
      icon: HighDemandIcon,
      desc: 'The need for computing power will exceed the supply by over 10x.',
    },
    {
      name: 'Efficient',
      icon: EfficientIcon,
      desc: 'Dojo recycles underutilized GPU resources to maximize performance & reduce cost.',
    },
  ]

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pt: '10%',
        alignSelf: 'center',
        width: '100%',
      }}
    >
      {/* ---------------------Hero Section -------------------------------- */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '1200px',
        }}
      >
        <Box
          sx={{
            border: '1px solid #313335',
            borderRadius: '60px',
            p: '4px',
            width: 'max-content',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              ...sectionMiniBoxStyles,
            }}
          >
            <img src={DojoGreyIcon} alt='DojoGreyIcon' /> Dojo Protocol
          </Box>
        </Box>

        <Typography sx={{ ...typographyStyles, pt: '48px', pb: '24px' }}>
          <span
            style={{
              background:
                'linear-gradient(180deg, #FFFFFF 0%, #363A3F 140.97%), #FFFFFF',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            The GPU & Compute Framework
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
            Native to Solana
          </span>
        </Typography>

        <Typography
          sx={{
            fontFamily: 'ProximaNovaRegular',
            fontWeight: 400,
            fontSize: '22px',
            lineHeight: '160%',
            textAlign: 'center',
            color: '#94989C',
          }}
        >
          Fueling a global computing network for the largest sector in the
          world.
        </Typography>

        <Box
          sx={{
            display: 'flex',
            gap: '24px',
            pt: '48px',
            flexWrap: { xs: 'wrap', sm: 'nowrap' },
            justifyContent: 'center',
          }}
        >
          <Button
            sx={{
              ...buttonStyles,
              backgroundColor: '#ffffff',
              '&:hover': {
                backgroundColor: '#f0f0f0',
              },
            }}
            onClick={() =>
              isLoggedIn ? navigate('/home') : navigate('/login')
            }
          >
            Get Started <img src={CircledRightArrow} alt='CircledRightArrow' />
          </Button>
          <Button
            sx={{
              ...buttonStyles,
              backgroundColor: '#000000',
              border: '1px solid #313335',
              color: '#ffffff',
              '&:hover': {
                backgroundColor: '#000000',
                opacity: 0.9,
              },
            }}
          >
            Stake Tokens <img src={FlashlightIcon} alt='FlashlightIcon' />
          </Button>
        </Box>
      </Box>

      {/* ---------------------Foundation Section -------------------------------- */}
      <Box
        sx={{
          width: '100%',
          border: '1px solid #242427',
          borderRadius: '16px',
          mt: '20%',
          mb: '100px',
          maxWidth: '1200px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            height: 'auto',
            position: 'relative',
            backgroundImage: `url(${FoundationSectionBg})`,
            backgroundPosition: 'right',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '66%',
            px: '40px',
            py: '48px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              flex: isDown900 ? '60%' : '45%',
            }}
          >
            <Box sx={{ ...sectionMiniBoxStyles }}>
              <img src={CircledMenu} alt='CircledMenu' /> About
            </Box>

            <Typography sx={headingStyles}>
              <span
                style={{
                  background:
                    'linear-gradient(180deg, #FFFFFF 0%, #363A3F 140.97%), #FFFFFF',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                The Foundation of{' '}
              </span>
              <span
                style={{
                  background:
                    'linear-gradient(180deg, #FFFFFF 0%, #363A3F 140.97%), #FFFFFF',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {' '}
                Future Computing{' '}
              </span>
              <span
                style={{
                  background:
                    'linear-gradient(180deg, #FFFFFF 0%, #363A3F 140.97%), #FFFFFF',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                on Solana
              </span>
            </Typography>

            <Typography sx={subheadingStyles}>
              Dojo revolutionizes GPU & cloud computation on Solana by funneling
              value across a globally distributed cloud network operating
              primarily on Solana.
            </Typography>

            <Typography sx={textStyles}>
              Development in artificial intelligence has seen the fastest growth
              compared to any other sector in tech and the need for computing
              power will exceed the supply by over 10x.
            </Typography>

            <Typography sx={textStyles}>
              Dojo recycles underutilized GPU resources from independent data
              centers, crypto mining farms, and native consumer GPUs to maximize
              performance for everything from small-scale startups to the
              largest AI companies.
            </Typography>
          </Box>

          <Box sx={{ flex: isDown900 ? '40%' : '55%' }} />
        </Box>

        {/* horizontal divider */}
        <Box
          sx={{
            width: `calc(100% - 96px)`,
            height: '1px',
            backgroundColor: '#313335',
          }}
        />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '48px',
            py: '48px',
            px: '48px',
            flexWrap: isDown900 ? 'wrap' : 'nowrap',
          }}
        >
          {aboutSectionDetails.map((detail, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '16px',
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    minWidth: isDown600 ? '34px' : isDown900 ? '52px' : '64px',
                    minHeight: isDown600 ? '34px' : isDown900 ? '52px' : '64px',
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                    backgroundColor: '#09090A',
                    boxShadow:
                      '0px 0.5px 0px rgba(255, 255, 255, 0.2), inset 0px 0.5px 0px rgba(255, 255, 255, 0.4)',
                    textAlign: 'center',
                  }}
                >
                  <img
                    src={detail.icon}
                    alt={detail.name}
                    style={{
                      objectFit: 'cover',
                      width: isDown600 ? '20px' : isDown900 ? '30px' : '39px',
                      height: isDown600 ? '20px' : isDown900 ? '30px' : '39px',
                    }}
                  />
                </Box>
                <Typography
                  sx={{
                    fontFamily: 'ProximaNovaRegular',
                    fontSize: isDown600 ? '18px' : isDown900 ? '20px' : '28px',
                    fontWeight: 600,
                    lineHeight: isDown600
                      ? '20px'
                      : isDown900
                      ? '22px'
                      : '34.72px',
                    color: 'rgba(229, 233, 236, 1)',
                  }}
                >
                  {detail.name}
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontFamily: 'Roboto',
                  fontWeight: 300,
                  color: 'rgba(148, 152, 156, 1)',
                  fontSize: isDown600 ? '14px' : isDown900 ? '16px' : '18px',
                  lineHeight: isDown600
                    ? '22.4px'
                    : isDown900
                    ? '25.6px'
                    : '28.8px',
                }}
              >
                {detail.desc}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* ---------------------Feuling Section -------------------------------- */}
      <FuelingSection />
      {/* ---------------------GaaS Section -------------------------------- */}
      <DojoGaasSection />
      {/* ---------------------Globe Section -------------------------------- */}
      <GlobeSection />
      {/* ---------------------Multifaceted Section -------------------------------- */}
      <MultifacetedSection />
      {/* ---------------------Companies Section -------------------------------- */}
      <CompaniesSection />
      {/* ---------------------Join Now Section -------------------------------- */}
      <JoinNowSection />
    </Box>
  )
}

export default LandingScreen
