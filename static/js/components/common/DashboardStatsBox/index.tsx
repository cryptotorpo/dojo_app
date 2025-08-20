import React from 'react'
import {
  InfoIcon,
  UpArrow,
  DownArrow,
  BackArrow,
  GraphIcon,
  BoxShadeOne,
  BoxShadeTwo,
} from '../../../assets/'
import { Typography, Box, Tooltip, useMediaQuery } from '@mui/material'
import { numFormatter } from '../../../utils'

interface DashboardStatsBoxProps {
  name: string
  value: string
  trend?: string
  trendPercentage?: number
  boxShadeNumber: number
  isActive: boolean
  toggleGraphView: () => void
  textWithValue?: string
  infoIconText?: string
}

const DashboardStatsBox: React.FC<DashboardStatsBoxProps> = ({
  name,
  value,
  trend,
  trendPercentage,
  boxShadeNumber,
  isActive,
  toggleGraphView,
  textWithValue,
  infoIconText = '',
}) => {
  const boxShade = boxShadeNumber === 1 ? BoxShadeOne : BoxShadeTwo

  const { amount, symbol } = numFormatter(Number(value), 2)
  const isDown600 = useMediaQuery('(max-width:600px)')

  return (
    <div
      style={{
        backgroundImage: `url(${boxShade})`,
        backgroundRepeat: 'no-repeat',
        padding: '16px',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.04)',
        maxWidth: '590px',
        width: '100%',
        minHeight: '130px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
      id={`${name}-box`}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '8px',
          alignItems: 'center',
        }}
      >
        <Typography
          sx={{
            fontFamily: 'ProximaNovaRegular',
            fontWeight: 600,
            fontSize: '18px',
            lineHeight: '27px',
          }}
        >
          {name}
        </Typography>
        {infoIconText?.length > 0 && (
          <Tooltip title={infoIconText} placement='top' enterTouchDelay={0}>
            <img
              src={InfoIcon}
              alt='info icon'
              height={'24px'}
              width={'24px'}
            />
          </Tooltip>
        )}
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: isDown600 ? '2px' : '4px',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'ProximaNovaRegular',
              fontWeight: 700,
              fontSize: isDown600 ? '18px' : '24px',
              lineHeight: '36px',
            }}
          >
            {amount}
            <span
              style={{
                fontSize: isDown600 ? '18px' : '20px',
              }}
            >
              {symbol} {textWithValue}
            </span>
          </Typography>

          {trend && (
            <img
              src={trend === 'Up' ? UpArrow : DownArrow}
              alt='trend icon'
              height={isDown600 ? '18px' : '24px'}
              width={isDown600 ? '18px' : '24px'}
            />
          )}
          {trend && (
            <Typography
              sx={{
                fontFamily: 'ProximaNovaRegular',
                fontWeight: 400,
                fontSize: isDown600 ? '12px' : '18px',
                lineHeight: '27px',
                color:
                  trend === 'Up'
                    ? 'rgba(0, 220, 114, 1)'
                    : 'rgba(255, 80, 74, 1)',
              }}
            >
              {trendPercentage}%
            </Typography>
          )}
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '4px',
            alignItems: 'center',
            backgroundColor: isActive
              ? 'rgba(255, 255, 255, 0.2)'
              : 'rgba(255, 255, 255, 0.06)',
            width: isDown600 ? '80px' : '108px',
            height: isDown600 ? '35px' : '44px',
            borderRadius: '32px',
            justifyContent: 'center',
            cursor: isActive ? 'default' : 'pointer',
            '&:hover': {
              backgroundColor: isActive
                ? 'rgba(255, 255, 255, 0.2)'
                : 'rgba(255, 255, 255, 0.1)',
            },
          }}
          onClick={toggleGraphView}
        >
          <img
            src={
              // isActive ? BackArrow :
              GraphIcon
            }
            alt='graph icon'
            height={isDown600 ? 24 : 24}
            width={isDown600 ? 24 : 24}
          />
          <Typography
            sx={{
              fontFamily: 'ProximaNovaRegular',
              fontWeight: 400,
              fontSize: isDown600 ? '12px' : '16px',
              lineHeight: '24px',
            }}
          >
            Graph
            {/* {isActive ? "Back" : "Graph"} */}
          </Typography>
        </Box>
      </Box>
    </div>
  )
}

export default DashboardStatsBox
