import {
  Grid,
  Box,
  CircularProgress,
  useMediaQuery,
  Typography,
} from '@mui/material'
import { useState, useEffect } from 'react'
import DashboardStatsBox from '../../../components/common/DashboardStatsBox'
import { ScrollableBoxShades } from '../../../assets'
import ChartSection from '../ChartSection'
import {
  useGetNetworkCapacityQuery,
  useGetNetworkCapacityYearlyGraphQuery,
  useGetNetworkCapacityMonthlyGraphQuery,
  useGetNetworkCapacityWeeklyGraphQuery,
  useGetNetworkCapacityTrendQuery,
} from '../../../services/dashboard'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'

interface GraphData {
  activeProviders: number[]
  CPUCapacity: number[]
  GPUCapacity: number[]
  memoryCapacity: number[]
  diskStorageCapacity: number[]
  dayBasedTimestamp: number[]
  _id: any[]
}

type KeyMapping = {
  [key: string]: keyof GraphData
}

const NetworkCapacity = () => {
  const [activeBoxIndex, setActiveBoxIndex] = useState<number | null>(null)
  const [networkCapacityStats, setNetworkCapacityStats] = useState<any[]>([])
  const [graphData, setGraphData] = useState<GraphData>({} as GraphData)
  const [selectedTimeRange, setSelectedTimeRange] = useState<number>(7)
  const isDown900 = useMediaQuery('(max-width:900px)')
  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth() + 1
  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonth)
  const [selectedYear, setSelectedYear] = useState<number>(currentYear)
  const currentTimestamp = Date.now()
  const currentDate = new Date(currentTimestamp).getDate()
  const [selectedDate, setSelectedDate] = useState<number>(currentDate)

  const [isMonthSelectedInYearlyView, setIsMonthSelectedInYearlyView] =
    useState<boolean>(false)

  const keyMapping: KeyMapping = {
    'Active Providers': 'activeProviders',
    'CPU Capacity': 'CPUCapacity',
    'GPU Capacity': 'GPUCapacity',
    'Memory Capacity': 'memoryCapacity',
    'Disk Storage Capacity': 'diskStorageCapacity',
  }

  const { data, isLoading, error } = useGetNetworkCapacityQuery()

  const {
    data: trendData,
    isLoading: trendIsLoading,
    error: trendError,
  } = useGetNetworkCapacityTrendQuery(
    { date: selectedDate, month: selectedMonth, year: selectedYear },
    {
      refetchOnMountOrArgChange: true,
    }
  ) as any

  const yearlyGraphQuery = useGetNetworkCapacityYearlyGraphQuery(selectedYear, {
    refetchOnMountOrArgChange: true,
  })

  const monthlyGraphQuery = useGetNetworkCapacityMonthlyGraphQuery(
    { month: selectedMonth, year: selectedYear },
    {
      refetchOnMountOrArgChange: true,
    }
  )

  const weeklyGraphQuery = useGetNetworkCapacityWeeklyGraphQuery(
    { date: selectedDate, month: selectedMonth, year: selectedYear },
    {
      refetchOnMountOrArgChange: true,
    }
  )

  let graphDataResponse: any
  let graphDataLoading: any
  let graphDataError: any

  if (selectedTimeRange > 30) {
    graphDataResponse = isMonthSelectedInYearlyView
      ? monthlyGraphQuery.data
      : yearlyGraphQuery.data
    graphDataLoading = isMonthSelectedInYearlyView
      ? monthlyGraphQuery.isLoading
      : yearlyGraphQuery.isLoading
    graphDataError = isMonthSelectedInYearlyView
      ? monthlyGraphQuery.error
      : yearlyGraphQuery.error
  } else if (selectedTimeRange === 30) {
    graphDataResponse = monthlyGraphQuery.data
    graphDataLoading = monthlyGraphQuery.isLoading
    graphDataError = monthlyGraphQuery.error
  } else if (selectedTimeRange === 7) {
    graphDataResponse = weeklyGraphQuery.data
    graphDataLoading = weeklyGraphQuery.isLoading
    graphDataError = weeklyGraphQuery.error
  }

  useEffect(() => {
    if (data) {
      const { payload } = data as any
      setNetworkCapacityStats([
        {
          name: 'Active Providers',
          value: payload.activeProviders,
          trend: payload.activeProvidersPercentage >= 0 ? 'Up' : 'Down',
          trendPercentage: Math.abs(payload.activeProvidersPercentage).toFixed(
            2
          ),
          boxShadeNumber: 1,
          infoIconText:
            'This is the number of currently active providers on the network',
        },
        {
          name: 'CPU Capacity',
          value: payload.CPUCapacity.toFixed(2),
          trend: payload.CPUCapacityPercentage >= 0 ? 'Up' : 'Down',
          trendPercentage: Math.abs(payload.CPUCapacityPercentage).toFixed(2),
          boxShadeNumber: 1,
          textWithValue: 'CPU',
        },
        {
          name: 'GPU Capacity',
          value: payload.GPUCapacity.toFixed(2),
          trend: payload.GPUCapacityPercentage >= 0 ? 'Up' : 'Down',
          trendPercentage: Math.abs(payload.GPUCapacityPercentage).toFixed(2),
          boxShadeNumber: 1,
          textWithValue: 'GPU',
        },
        {
          name: 'Memory Capacity',
          value: payload.memoryCapacity.toFixed(2),
          trend: payload.memoryCapacityPercentage >= 0 ? 'Up' : 'Down',
          trendPercentage: Math.abs(payload.memoryCapacityPercentage).toFixed(
            2
          ),
          boxShadeNumber: 1,
          textWithValue: 'GB',
        },
        {
          name: 'Disk Storage Capacity',
          value: payload.diskStorageCapacity.toFixed(2),
          trend: payload.diskStorageCapacityPercentage >= 0 ? 'Up' : 'Down',
          trendPercentage: Math.abs(
            payload.diskStorageCapacityPercentage
          ).toFixed(2),
          boxShadeNumber: 1,
          textWithValue: 'GB',
        },
      ])
    }
  }, [data])

  useEffect(() => {
    if (graphDataResponse) {
      const reversedPayload = [...graphDataResponse.payload]
      const processedGraphData = reversedPayload.reduce(
        (acc: any, curr: any) => {
          acc['activeProviders'] = acc['activeProviders'] || []
          acc['CPUCapacity'] = acc['CPUCapacity'] || []
          acc['GPUCapacity'] = acc['GPUCapacity'] || []
          acc['memoryCapacity'] = acc['memoryCapacity'] || []
          acc['diskStorageCapacity'] = acc['diskStorageCapacity'] || []
          acc['dayBasedTimestamp'] = acc['dayBasedTimestamp'] || []

          acc['activeProviders'].push(curr.activeProviders)
          acc['CPUCapacity'].push(curr.CPUCapacity)
          acc['GPUCapacity'].push(curr.GPUCapacity)
          acc['memoryCapacity'].push(curr.memoryCapacity)
          acc['diskStorageCapacity'].push(curr.diskStorageCapacity)
          acc['dayBasedTimestamp'].push(curr.dayBasedTimestamp)

          acc['_id'] = acc['_id'] || []
          acc['_id'].push(curr._id)

          return acc
        },
        {}
      )
      setGraphData(processedGraphData)
    }
  }, [graphDataResponse, selectedTimeRange])

  useEffect(() => {
    if (activeBoxIndex !== null) {
      setSelectedTimeRange(7)
      setSelectedYear(currentYear)
      setSelectedMonth(currentMonth)
      setSelectedDate(currentDate)
      setIsMonthSelectedInYearlyView(false)
    }
  }, [activeBoxIndex])

  if (isLoading || graphDataLoading || trendIsLoading)
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
          textAlign: 'center',
        }}
      >
        <CircularProgress sx={{ fontSize: 100, color: '#fff' }} />
      </Box>
    )

  if (error || graphDataError || trendError)
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
          textAlign: 'center',
        }}
      >
        <WarningAmberIcon sx={{ fontSize: 60, color: 'orange' }} />
        <Typography
          sx={{
            mt: 2,
            fontSize: isDown900 ? '16px' : '24px',
            fontFamily: 'Roboto',
            fontWeight: 600,
          }}
        >
          Unable to load data. Please wait and try again.
        </Typography>
      </Box>
    )

  const toggleGraphView = (index: number) => {
    if (activeBoxIndex === index) {
      // setActiveBoxIndex(null);
      return
    } else {
      setActiveBoxIndex(index)
    }
  }

  const displayListOfStats = () => {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Grid
          container
          spacing={2}
          justifyContent={'flex-start'}
          sx={{ maxWidth: '1200px', marginTop: '24px' }}
        >
          {networkCapacityStats.map((stat, index) => (
            <Grid
              item
              md={6}
              sm={12}
              xs={12}
              key={index}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <DashboardStatsBox
                key={index}
                name={stat.name}
                value={stat.value}
                trend={stat.trend}
                trendPercentage={stat.trendPercentage}
                boxShadeNumber={stat.boxShadeNumber}
                isActive={activeBoxIndex === index}
                toggleGraphView={() => toggleGraphView(index)}
                textWithValue={stat.textWithValue}
                infoIconText={stat.infoIconText}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    )
  }

  return (
    <Box>
      {activeBoxIndex === null ? (
        displayListOfStats()
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: isDown900 ? 'column' : 'row',
            gap: '20px',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {isDown900 ? (
            displayListOfStats()
          ) : (
            <Box
              sx={{
                backgroundImage: `url(${ScrollableBoxShades})`,
                backgroundRepeat: 'no-repeat',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.04)',
                maxWidth: '557px',
                width: '100%',
                height: '630px',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                overflowY: 'auto',
                padding: '22px 20px',
                boxSizing: 'border-box',
                '&::-webkit-scrollbar': {
                  width: '8px',
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: 'transparent',
                  width: '4px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  marginBlock: '8px',
                  borderRadius: '4px',
                  paddingBlock: '2px',
                },
                '&::-webkit-scrollbar-thumb': {
                  borderRadius: '4px',
                  backgroundColor: 'rgba(25, 26, 26, 1)',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '22px',
                  marginTop: '0px',
                }}
              >
                {networkCapacityStats.map((stat, index) => (
                  <DashboardStatsBox
                    key={index}
                    name={stat.name}
                    value={stat.value}
                    trend={stat.trend}
                    trendPercentage={stat.trendPercentage}
                    boxShadeNumber={stat.boxShadeNumber}
                    isActive={activeBoxIndex === index}
                    toggleGraphView={() => toggleGraphView(index)}
                    textWithValue={stat.textWithValue}
                    infoIconText={stat.infoIconText}
                  />
                ))}
              </Box>
            </Box>
          )}

          <ChartSection
            statsData={{
              name: networkCapacityStats[activeBoxIndex]?.name,
              value: networkCapacityStats[activeBoxIndex]?.value,
              trend:
                trendData?.payload?.percentageChange[
                  keyMapping[networkCapacityStats[activeBoxIndex]?.name]
                ] >= 0
                  ? 'Up'
                  : 'Down',
              trendPercentage: Math.abs(
                trendData?.payload?.percentageChange[
                  keyMapping[networkCapacityStats[activeBoxIndex]?.name]
                ].toFixed(2)
              ),
              textWithValue:
                networkCapacityStats[activeBoxIndex]?.textWithValue,
            }}
            timelineData={graphData.dayBasedTimestamp}
            graphData={
              graphData[
                keyMapping[networkCapacityStats[activeBoxIndex]?.name]
              ] || []
            }
            onTimeRangeChange={setSelectedTimeRange}
            onYearChange={setSelectedYear}
            onMonthChange={setSelectedMonth}
            onDateChange={setSelectedDate}
            onMonthSelectedInYearlyView={setIsMonthSelectedInYearlyView}
            datesObjArray={graphData._id}
          />
        </Box>
      )}
    </Box>
  )
}

export default NetworkCapacity
