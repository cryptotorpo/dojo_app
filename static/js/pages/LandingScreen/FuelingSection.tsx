import { headingStyles, sectionMiniBoxStyles } from './styles'
import { Box, Typography } from '@mui/material'
import {
  CoreProductsIcon,
  TopGrid,
  DCompIcon,
  DCloudIcon,
  DojoGaasIcon,
  DPNIcon,
} from '../../assets'
import FuelBox from '../../components/common/FuelBox'

const FuelingSection = () => {
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
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 5,
            width: '100%',
            zIndex: 0,
          }}
        >
          <img
            src={TopGrid}
            alt='Bottom Grid'
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: '1200px',
            pt: '100px',
            zIndex: 1,
          }}
        >
          <Box sx={{ ...sectionMiniBoxStyles, mb: '32px' }}>
            <img src={CoreProductsIcon} alt='Core Products Icon' /> Core
            Products
          </Box>

          <Typography sx={{ ...headingStyles, textAlign: 'center' }}>
            Fueling a Global Computing Network
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: '34px',
              pt: '58px',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '32px',
              }}
            >
              <FuelBox
                title='D-Comp'
                description='Access high performance computing through powerful GPUs for heavy tasks.'
                imageSrc={DCompIcon}
                shade='0'
              />
              <FuelBox
                title='Dojo GaaS'
                description='Immediate creation and optimization of compute capacity in < 90 seconds.'
                imageSrc={DojoGaasIcon}
                shade='0'
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
              }}
            >
              <FuelBox
                shade='1'
                title='D-Cloud'
                description='Up to 90% more affordable compared to traditional cloud service providers.'
                imageSrc={DCloudIcon}
              />
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '32px',
              }}
            >
              <FuelBox
                title='Fluid Compute'
                description='Ideal for app development, AI research, machine learning and more.'
                imageSrc={DCompIcon}
                shade='2'
              />
              <FuelBox
                title='DPN'
                description='A virtual private network powered by Dojo serving as a user acquisition strategy & funneling value across the entire ecosystem.'
                imageSrc={DPNIcon}
                shade='0'
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default FuelingSection
