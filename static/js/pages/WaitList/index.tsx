import { Box, Skeleton, Typography, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import GradientBorder from '../../components/common/GradientBorder'
import { BigCard, DojoCompute, TeamIcon } from '../../assets'
import axios from 'axios'
import { devServerUrl } from '../../utils'
import { useAppSelector } from '../../redux/configureStore'

const WaitList = () => {
  const isDown800 = useMediaQuery('(max-width:800px)')
  const [count, setCount] = useState<number | null>(null)
  const [emailWaitlist, setEmailWaitlist] = useState<number | null>(null)
  const { email } = useAppSelector(state => state.user)

  const fetchCount = async () => {
    try {
      const { data: emailData } = await axios.get(
        `${devServerUrl}email/count`,
        {
          params: { email },
        }
      )
      console.log('🚀 ~ fetchCount ~ data:', emailData)
      if (emailData.payload) {
        setCount(emailData.payload.count)
        setEmailWaitlist(emailData.payload.emailWaitlist)
      }
    } catch (error) {
      console.error('Failed to fetch count:', error)
    }
  }

  useEffect(() => {
    fetchCount()
  }, [])

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '20px',
        paddingBottom: '20px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: isDown800 ? 'column-reverse' : 'row',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          backgroundImage: `url(${BigCard})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          padding: '20px',
          margin: '1px',
          gap: '36px',
          maxWidth: '1187px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            gap: '36px',
            maxWidth: '468px',
          }}
        >
          <GradientBorder radius='32px'>
            <Box
              sx={{
                borderRadius: '32px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingY: '10px',
                paddingX: '20px',
                margin: '1px',
                background:
                  'radial-gradient(56.52% 74.7% at 50.36% 100%, rgba(255, 255, 255, 0.0408) 0%, rgba(255, 255, 255, 0) 100%), #09090A',
                boxShadow:
                  '0px 2px 8px rgba(0, 0, 0, 0.16), inset 0px 1px 0px rgba(255, 255, 255, 0.15)',
              }}
            >
              <img src={TeamIcon} alt='Team Icon' />
              <Typography
                sx={{
                  fontFamily: 'ProximaNovaRegular',
                  color: 'rgba(148,152,156,1)',
                  fontSize: '24px',
                  fontWeight: 400,
                  lineHeight: '38.4px',
                  textAlign: 'center',
                  paddingX: '20px',
                }}
              >
                {count !== null && emailWaitlist !== null ? (
                  `${count.toLocaleString(
                    'en-US'
                  )}  people have already started their adventure with Compute.`
                ) : (
                  <Skeleton width={210} />
                )}
              </Typography>
            </Box>
          </GradientBorder>

          <Typography
            sx={{
              fontFamily: 'ProximaNovaRegular',
              color: 'rgba(148,152,156,1)',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: '22.4px',
              textAlign: 'center',
              paddingX: '40px',
            }}
          >
            You've joined the queue. <br />
            We'll let you know by email when it's your turn to start.
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          <img
            src={DojoCompute}
            alt='Dojo Compute'
            style={{ width: '100%', height: 'auto' }}
            loading='lazy'
          />
        </Box>
      </Box>
      {/* <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          gap: "36px",
          maxWidth: "468px",
        }}
      >
        <GradientBorder radius="32px">
          <Box
            sx={{
              borderRadius: "32px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingY: "10px",
              paddingX: "20px",
              margin: "1px",
              background:
                "radial-gradient(56.52% 74.7% at 50.36% 100%, rgba(255, 255, 255, 0.0408) 0%, rgba(255, 255, 255, 0) 100%), #09090A",
              boxShadow:
                "0px 2px 8px rgba(0, 0, 0, 0.16), inset 0px 1px 0px rgba(255, 255, 255, 0.15)",
            }}
          >
            <img src={TeamIcon} alt="Team Icon" />
            <Typography
              sx={{
                fontFamily: "ProximaNovaRegular",
                color: "rgba(148,152,156,1)",
                fontSize: "24px",
                fontWeight: 400,
                lineHeight: "38.4px",
                textAlign: "center",
                paddingX: "20px",
              }}
            >
              {count !== null ? (
                `${count} people have already received their access code.`
              ) : (
                <Skeleton width={210} />
              )}
            </Typography>
          </Box>
        </GradientBorder>

        <Typography
          sx={{
            fontFamily: "ProximaNovaRegular",
            color: "rgba(148,152,156,1)",
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "22.4px",
            textAlign: "center",
            paddingX: "40px",
          }}
        >
          You've been added to the Dojo Compute waitlist! <br /> <br />
          We will send you an email containing an access code when more capacity
          is available.
        </Typography>
      </Box> */}
    </Box>
  )
}

export default WaitList
