import * as React from 'react'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { Paper, styled } from '@mui/material'
import MuiToggleButton from '@mui/material/ToggleButton'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

type Props = {
  handleSelectTime: (time: string) => void
  chartTime: string
}

const ToggleTimeline: React.FC<Props> = ({ handleSelectTime, chartTime }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [alignment, setAlignment] = React.useState(chartTime)

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment)
      handleSelectTime(newAlignment)
    }
  }

  React.useEffect(() => {
    setAlignment(chartTime)
  }, [chartTime])

  const CustomizedToggleButton = styled(MuiToggleButton, {
    shouldForwardProp: prop => prop !== 'isMobile',
  })<{
    isMobile: boolean
  }>(({ isMobile, disabled }) => ({
    border: '1px solid rgba(255, 255, 255, 0.06) !important',
    fontFamily: 'Roboto',
    fontSize: isMobile ? '10px' : '16px',
    fontWeight: '500',
    color: disabled ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 1)',
    backgroundColor: 'rgba(9, 9, 10, 1)',
    padding: '10px 14px',
    width: 'max-content',
    height: 'max-content',
    textTransform: 'none',
    '&.Mui-selected, &.Mui-selected:hover': {
      color: 'rgba(0, 220, 114, 1)',
      backgroundColor: 'rgba(0, 220, 114, 0.1)',
      border: '1px solid rgba(0, 220, 114, 0.2) !important',
    },
  }))

  const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    '& .MuiToggleButtonGroup-grouped': {
      margin: theme.spacing(0.5),
      border: 0,
      '&.Mui-disabled': {
        border: 0,
      },
      '&:not(:first-of-type)': {
        borderRadius: '8px',
      },
      '&:first-of-type': {
        borderRadius: '8px',
      },
    },
  }))

  return (
    <div>
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          backgroundColor: 'transparent',
        }}
      >
        <StyledToggleButtonGroup
          size='small'
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label='text alignment'
        >
          <CustomizedToggleButton value='7days' isMobile={isMobile}>
            7d
          </CustomizedToggleButton>
          <CustomizedToggleButton value='1month' isMobile={isMobile}>
            1m
          </CustomizedToggleButton>
          <CustomizedToggleButton value='alltime' isMobile={isMobile}>
            All Time
          </CustomizedToggleButton>
        </StyledToggleButtonGroup>
      </Paper>
    </div>
  )
}

export default ToggleTimeline
