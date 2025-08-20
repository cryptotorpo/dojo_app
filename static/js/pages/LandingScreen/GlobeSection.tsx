import { AtomIcon, BigGlobe, OutlinedCloud, TickIcon } from '../../assets'
import { headingStyles, sectionMiniBoxStyles } from './styles'
import { Box, Typography } from '@mui/material'

const GlobeSection = () => {
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
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          pt: '100px',
        }}
      >
        <Box sx={{ ...sectionMiniBoxStyles, mb: 4 }}>
          <img src={OutlinedCloud} alt='Chip Icon' /> Network
        </Box>

        <Typography sx={headingStyles}>
          The Global Cloud Conglomerate
        </Typography>

        <Box
          sx={{
            display: 'flex',
            width: '100%',
            minHeight: '552px',
            position: 'relative',
            backgroundImage: `url(${BigGlobe})`,
            backgroundPosition: 'right',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            px: {
              xs: 4,
              sm: 6,
              md: 8,
              lg: 10,
            },
            border: '1px solid rgba(255, 255, 255, 0.04)',
            justifyContent: 'center',
            alignItems: 'center',
            mt: 6,
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              width: {
                xs: '100%',
                sm: '80%',
                md: '50%',
                lg: '40%',
              },
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
            }}
          >
            <img src={AtomIcon} alt='Atom Icon' width={80} height={80} />
            <Typography
              sx={{
                fontSize: '28px',
                lineHeight: '34.72px',
                letterSpacing: '-0.01em',
                color: 'rgba(229, 233, 236, 1)',
                fontWeight: 600,
                fontFamily: 'ProximaNovaRegular',
              }}
            >
              Efficient Infrastructure
            </Typography>
            <Typography
              sx={{
                color: 'rgba(148, 152, 156, 1)',
                fontSize: '18px',
                lineHeight: '28.8px',
                fontFamily: 'Roboto',
                fontWeight: 300,
              }}
            >
              Dojo is linked to a global cloud that already utilizes GPUs.
              Resources are usually under-utilized, but D-TECH optimizes those
              inefficient systems to output for much better usage through fluid
              computation and interlinks it with the rest of the core products.
            </Typography>

            <Box sx={{ display: 'flex', gap: 2 }}>
              {['Global Network', 'Fluid Computation'].map(text => (
                <Box
                  key={text}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <img src={TickIcon} alt='Tick Icon' width={24} height={24} />
                  <Typography
                    sx={{
                      color: 'rgba(211, 213, 218, 1)',
                      fontSize: '16px',
                      lineHeight: '32px',
                      fontFamily: 'Inter',
                      fontWeight: 400,
                    }}
                  >
                    {text}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          <Box
            sx={{
              width: {
                xs: '0%',
                sm: '20%',
                md: '50%',
                lg: '60%',
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default GlobeSection
