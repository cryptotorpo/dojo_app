import { Grid, Typography, useMediaQuery } from '@mui/material'

interface IMainTabs {
  handleTabChange: (value: number) => void
  tab: number
}

const MainTabs: React.FC<IMainTabs> = ({ handleTabChange, tab }) => {
  const isDown410 = useMediaQuery('(max-width:410px)')
  const isDown350 = useMediaQuery('(max-width:350px)')

  const commonTabStyles = {
    cursor: 'pointer',
    margin: isDown410 ? '12px 10px' : '12px 24px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
    borderRadius: '8px',
    flex: 'none',
    '&:hover': {
      backgroundColor: '#5f616540',
    },
  }

  const tabLabels = ['Network Summary', 'Resources Leased', 'Network Capacity']

  return (
    <Grid
      container
      sx={{
        display: 'inline-flex',
        padding: '2px',
        justifyContent: 'center',
      }}
    >
      {tabLabels.map((label, index) => (
        <Grid
          item
          key={label}
          onClick={() => handleTabChange(index)}
          sx={{
            ...commonTabStyles,
            ...(tab === index
              ? { color: 'rgba(255, 255, 255, 1)' }
              : { color: 'rgba(255, 255, 255, 0.8)' }),
          }}
        >
          <Typography
            fontSize={isDown350 ? '12px' : '18px'}
            fontWeight={500}
            lineHeight={'30px'}
            fontFamily={'Roboto'}
            sx={{
              borderBottom:
                tab === index ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
            }}
          >
            {label}
          </Typography>
        </Grid>
      ))}
    </Grid>
  )
}

export default MainTabs
