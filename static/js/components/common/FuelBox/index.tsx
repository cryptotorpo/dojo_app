import React, { useState } from 'react'
import { Box, Typography, Tooltip } from '@mui/material'
import { styled } from '@mui/system'
import {
  CloudIcon,
  CoreShadeOne,
  CoreShadeThree,
  CoreShadeTwo,
  FluidIconOne,
  FluidIconTwo,
  FluidIconThree,
  FluidIconFour,
  FluidIconFive,
  FluidIconEight,
  FluidIconNine,
  FluidIconTen,
  FluidIconEleven,
  FluidIconTwelve,
} from '../../../assets'
import EmblaCarousel from '../../EmblaCarousel'

const StyledBox = styled(Box, {
  shouldForwardProp: prop => prop !== 'shade',
})<{ shade: string }>(({ shade, theme }) => ({
  position: 'relative',
  maxWidth: '377.33px',
  minWidth: '377.33px',
  minHeight: '324px',
  maxHeight: shade === CoreShadeTwo ? '680px' : '377.33px',
  background: `url(${shade}) no-repeat center center`,
  backgroundSize: 'cover',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  textAlign: 'center',
  gap: '12px',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  borderRadius: '16px',
  paddingTop: '35px',
  flexShrink: 0,
  [theme.breakpoints.down('sm')]: {
    maxWidth: '300px',
    minWidth: '300px',
  },
}))

const BottomImage = styled('img', {
  shouldForwardProp: prop => prop !== 'isLongBox',
})<{ isLongBox: boolean }>(({ isLongBox, theme }) => ({
  position: isLongBox ? 'relative' : 'absolute',
  bottom: '0px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '100%',
}))

interface FuelBoxProps {
  shade: string
  title: string
  description: string
  imageSrc: string
}

const FuelBox: React.FC<FuelBoxProps> = ({
  shade,
  title,
  description,
  imageSrc,
}) => {
  const shadeTypes = [CoreShadeOne, CoreShadeTwo, CoreShadeThree]

  const truncatedDescription =
    description.length > 60 ? description.slice(0, 60) + '...' : description

  return (
    <StyledBox shade={shadeTypes[shade as unknown as number] as string}>
      <div>
        {shade === '1' && <img src={CloudIcon} alt='Cloud Icon' />}
        <Typography
          sx={{
            fontFamily: 'ProximaNovaRegular',
            fontSize: '28px',
            lineHeight: '34.72px',
            color: 'rgba(229, 233, 236, 1)',
            fontWeight: 600,
            textAlign: shade === '1' ? 'center' : 'left',
            px: '25px',
          }}
        >
          {title}
        </Typography>
        <Tooltip title={description} arrow>
          <Typography
            sx={{
              fontFamily: 'ProximaNovaRegular',
              fontSize: '18px',
              lineHeight: '28.8px',
              color: 'rgba(148, 152, 156, 1)',
              fontWeight: 300,
              textAlign: shade === '1' ? 'center' : 'left',
              px: '25px',
            }}
          >
            {truncatedDescription}
          </Typography>
        </Tooltip>
      </div>
      {shade === '2' ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            pb: '32px',
          }}
        >
          <EmblaCarousel
            slides={[
              FluidIconOne,
              FluidIconTwo,
              FluidIconThree,
              FluidIconFour,
              FluidIconFive,
              FluidIconEight,
              FluidIconNine,
              FluidIconTen,
              FluidIconEleven,
              FluidIconTwelve,
            ]}
          />
          <EmblaCarousel
            slides={[
              FluidIconEight,
              FluidIconNine,
              FluidIconTen,
              FluidIconEleven,
              FluidIconTwelve,
              FluidIconOne,
              FluidIconTwo,
              FluidIconThree,
              FluidIconFour,
              FluidIconFive,
            ]}
          />
        </Box>
      ) : (
        <BottomImage
          src={imageSrc}
          alt='Image description'
          isLongBox={shade === '1'}
        />
      )}
    </StyledBox>
  )
}

export default FuelBox
