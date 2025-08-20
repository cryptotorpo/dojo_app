import {
  Box,
  CircularProgress,
  Grid,
  Skeleton,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { ClustersBarBg, ClustersSplineBg, WorkerBg } from '../../assets'
import SplineGraph from '../../components/common/SplineGraph'
import BarGraph from '../../components/common/BarGraph'
import { useGetClusterGraphQuery } from '../../services/dashboard'
import { useEffect, useState } from 'react'

const Clusters = () => {
  const isDown600 = useMediaQuery('(max-width:600px)')
  const isDown721 = useMediaQuery('(max-width:721px)')
  const [latestData, setLatestData] = useState<any>(null)
  const [graphData, setGraphData] = useState<any>({
    dailyEarningsData: [],
    totalEarningsData: [],
  })
  const [timelineData, setTimelineData] = useState<any>([])
  const [isDataProcessing, setIsDataProcessing] = useState<boolean>(false)

  const {
    data: clusterStatsData,
    isLoading: clusterStatsLoading,
    error: clusterStatsError,
  } = useGetClusterGraphQuery(1000)

  useEffect(() => {
    if (clusterStatsData && clusterStatsData.payload.length > 0) {
      const latest = clusterStatsData.payload[0] || {}
      setLatestData(latest)

      const totalEarningsData = clusterStatsData.payload
        .map((item: any) => item.totalNetworkEarnings || 0)
        .reverse()

      const dailyEarningsData = clusterStatsData?.payload
        .slice(-10)
        .map((item: any) => item.networkDailyEarnings || 0)
        .reverse()

      const timelineData = clusterStatsData.payload
        .map((item: any) => item.dayBasedTimestamp || '')
        .reverse()

      setGraphData({ dailyEarningsData, totalEarningsData })
      setTimelineData(timelineData)
      setIsDataProcessing(false)
    }
  }, [clusterStatsData])

  const getClusterStatStyles = (index: number) => ({
    backgroundColor: index === 3 ? 'rgba(0, 220, 114, 1)' : '#f3ec78',
    backgroundImage:
      index === 3
        ? 'none'
        : 'linear-gradient(180deg, #ffffff 0%, #363a3f 140.97%)',
    backgroundSize: '100%',
    WebkitBackgroundClip: 'text',
    MozBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    MozTextFillColor: 'transparent',
    paddingX: '10px',
    fontFamily: 'ProximaNovaRegular',
    fontWeight: 600,
    fontSize: isDown600 ? 32 : 40,
  })

  const getTypographyStyles = {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    padding: '6px 20px',
    fontSize: isDown600 ? '14px' : '18px',
    lineHeight: '27px',
    color: '#FFFFFF',
    fontWeight: 400,
    fontFamily: 'ProximaNovaRegular',
    borderRadius: '32px',
    width: 'fit-content',
  }

  if (clusterStatsLoading || isDataProcessing)
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '70vh',
          textAlign: 'center',
        }}
      >
        <CircularProgress sx={{ fontSize: 100, color: '#fff' }} />
      </Box>
    )

  if (clusterStatsError)
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <div>Error loading data</div>
      </Box>
    )

  return (
    <Box
      sx={{
        width: '100%',
        pt: 2,
        pb: '30px',
        px: 2,
        maxWidth: '1440px',
        alignSelf: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: isDown600 ? 'column' : 'row',
          justifyContent: 'space-between',
          gap: 4,
          border: '1px solid rgba(255, 255, 255, 0.03)',
          height: isDown600 ? 'max-content' : 156,
          backgroundImage: `url(${ClustersSplineBg})`,
          backgroundSize: 'cover',
          mb: 3,
          p: 2,
          overflow: 'hidden',
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            width: { xs: '100%', sm: '40%', md: '25%', lg: '20%', xl: '20%' },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Typography sx={getTypographyStyles}>
            Total Network Earnings
          </Typography>
          {latestData && latestData.totalNetworkEarnings !== undefined ? (
            <Typography
              sx={{
                backgroundColor: '#f3ec78',
                backgroundImage:
                  'linear-gradient(180deg, #ffffff 0%, #363a3f 140.97%)',
                backgroundSize: '100%',
                WebkitBackgroundClip: 'text',
                MozBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                MozTextFillColor: 'transparent',
                px: 1,
                fontFamily: 'ProximaNovaRegular',
                fontWeight: 600,
                fontSize: isDown600 ? 32 : 40,
              }}
            >
              {`$${latestData.totalNetworkEarnings.toLocaleString()}`}
            </Typography>
          ) : (
            <Skeleton variant='text' width='100%' height={40} />
          )}
        </Box>

        <Box
          sx={{
            width: { xs: '100%', sm: '60%', md: '75%', lg: '80%', xl: '80%' },
            overflow: 'hidden',
          }}
        >
          {timelineData.length > 0 ? (
            <SplineGraph
              graphData={graphData.totalEarningsData}
              timelineData={timelineData}
            />
          ) : (
            <Skeleton variant='rectangular' width='100%' height={109} />
          )}
        </Box>
      </Box>

      <Grid
        container
        justifyContent={isDown721 ? 'center' : 'flex-start'}
        gap={'20px'}
      >
        {[
          {
            name: 'Total Compute Hours Served',
            val: latestData && latestData.totalHoursServed !== undefined,
            data: latestData?.totalHoursServed,
          },
          {
            name: 'Total GPU/CPU Served Today',
            val: latestData && latestData.hoursServedToday !== undefined,
            data: latestData?.hoursServedToday,
          },
          {
            name: 'Total Clusters Created',
            val: latestData && latestData.totalClustersCreated !== undefined,
            data: latestData?.totalClustersCreated,
          },
          {
            name: 'Current Running Clusters',
            val: latestData && latestData.currentRunningClusters !== undefined,
            data: latestData?.currentRunningClusters,
          },
        ].map((stat, index) => (
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            xl={3}
            key={index}
            sx={{
              backgroundImage: `url(${WorkerBg})`,
              backgroundSize: 'cover',
              padding: '22px 20px',
              borderRadius: 2,
              maxWidth: isDown721 ? '100%' : '335px !important',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              border: '1px solid rgba(255, 255, 255, 0.03)',
              height: 156,
            }}
          >
            <Typography sx={getTypographyStyles}>{stat.name}</Typography>
            {stat.val ? (
              <Typography sx={getClusterStatStyles(index)}>
                {index === 0 || index === 1
                  ? `${stat.data?.toLocaleString()} hrs`
                  : stat.data?.toLocaleString()}
              </Typography>
            ) : (
              <Skeleton variant='text' width='100%' height={40} />
            )}
          </Grid>
        ))}
      </Grid>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          border: '1px solid rgba(255, 255, 255, 0.03)',
          height: 336,
          backgroundImage: `url(${ClustersBarBg})`,
          backgroundSize: 'cover',
          mb: 3,
          p: 2,
          mt: 3,
          borderRadius: 2,
          gap: 1,
        }}
      >
        <Typography
          sx={{
            ...getTypographyStyles,
            height: 44,
          }}
        >
          Network Daily Earnings
        </Typography>
        <BarGraph
          graphData={graphData.dailyEarningsData}
          timelineData={timelineData.slice(-10)}
        />
      </Box>
    </Box>
  )
}

export default Clusters
