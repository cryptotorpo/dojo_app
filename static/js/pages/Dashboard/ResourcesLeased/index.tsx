import {
  Box,
  Grid,
  CircularProgress,
  useMediaQuery,
  Typography,
} from '@mui/material'
import { useState, useEffect } from 'react'
import DashboardStatsBox from '../../../components/common/DashboardStatsBox'
import { ScrollableBoxShades } from '../../../assets'
import ChartSection from '../ChartSection'
import {
  useGetResourcesLeasedQuery,
  useGetResourcesLeasedMonthlyGraphQuery,
  useGetResourcesLeasedYearlyGraphQuery,
  useGetResourcesLeasedWeeklyGraphQuery,
  useGetResourcesLeasedTrendQuery,
} from '../../../services/dashboard'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'

interface GraphData {
  activeLeases: number[]
  CPULeased: number[]
  GPULeased: number[]
  memoryLeased: number[]
  diskStorageLeased: number[]
  dayBasedTimestamp: number[]
  _id: any[]
}

type KeyMapping = {
  [key: string]: keyof GraphData
}

const ResourcesLeased = () => {
  const [activeBoxIndex, setActiveBoxIndex] = useState<number | null>(null)
  const [resourcesLeasedStats, setResourcesLeasedStats] = useState<any[]>([])
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

  const { data, isLoading, error } = useGetResourcesLeasedQuery()

  const {
    data: trendData,
    isLoading: trendIsLoading,
    error: trendError,
  } = useGetResourcesLeasedTrendQuery(
    { date: selectedDate, month: selectedMonth, year: selectedYear },
    {
      refetchOnMountOrArgChange: true,
    }
  ) as any

  const yearlyGraphQuery = useGetResourcesLeasedYearlyGraphQuery(selectedYear, {
    refetchOnMountOrArgChange: true,
  })
  const monthlyGraphQuery = useGetResourcesLeasedMonthlyGraphQuery(
    { month: selectedMonth, year: selectedYear },
    {
      refetchOnMountOrArgChange: true,
    }
  )
  const weeklyGraphQuery = useGetResourcesLeasedWeeklyGraphQuery(
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

  const keyMapping: KeyMapping = {
    'Active Leases': 'activeLeases',
    'CPU Leased': 'CPULeased',
    'GPU Leased': 'GPULeased',
    'Memory Leased': 'memoryLeased',
    'Disk Storage Leased': 'diskStorageLeased',
  }

  useEffect(() => {
    if (data) {
      const { payload } = data as any
      setResourcesLeasedStats([
        {
          name: 'Active Leases',
          value: Number(payload.activeLeases).toFixed(2),
          trend: payload.activeLeasesPercentage >= 0 ? 'Up' : 'Down',
          trendPercentage: Math.abs(payload.activeLeasesPercentage).toFixed(2),
          boxShadeNumber: 1,
          infoIconText:
            'This is the number of currently active leases on the network',
        },
        {
          name: 'CPU Leased',
          value: Number(payload.CPULeased).toFixed(2),
          trend: payload.CPULeasedPercentage >= 0 ? 'Up' : 'Down',
          trendPercentage: Math.abs(payload.CPULeasedPercentage).toFixed(2),
          boxShadeNumber: 1,
          textWithValue: 'CPU',
        },
        {
          name: 'GPU Leased',
          value: Number(payload.GPULeased).toFixed(2),
          trend: payload.GPULeasedPercentage >= 0 ? 'Up' : 'Down',
          trendPercentage: Math.abs(payload.GPULeasedPercentage).toFixed(2),
          boxShadeNumber: 1,
          textWithValue: 'GPU',
        },
        {
          name: 'Memory Leased',
          value: Number(payload.memoryLeased).toFixed(3),
          trend: payload.memoryLeasedPercentage >= 0 ? 'Up' : 'Down',
          trendPercentage: Math.abs(payload.memoryLeasedPercentage).toFixed(2),
          boxShadeNumber: 1,
          textWithValue: 'GB',
        },
        {
          name: 'Disk Storage Leased',
          value: Number(payload.diskStorageLeased).toFixed(3),
          trend: payload.diskStorageLeasedPercentage >= 0 ? 'Up' : 'Down',
          trendPercentage: Math.abs(
            payload.diskStorageLeasedPercentage
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
      // .reverse()
      const processedGraphData = reversedPayload.reduce(
        (acc: any, curr: any) => {
          acc['activeLeases'] = acc['activeLeases'] || []
          acc['CPULeased'] = acc['CPULeased'] || []
          acc['GPULeased'] = acc['GPULeased'] || []
          acc['memoryLeased'] = acc['memoryLeased'] || []
          acc['diskStorageLeased'] = acc['diskStorageLeased'] || []
          acc['dayBasedTimestamp'] = acc['dayBasedTimestamp'] || []

          acc['activeLeases'].push(curr.activeLeases)
          acc['CPULeased'].push(curr.CPULeased)
          acc['GPULeased'].push(curr.GPULeased)
          acc['memoryLeased'].push(curr.memoryLeased)
          acc['diskStorageLeased'].push(curr.diskStorageLeased)
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
          {resourcesLeasedStats.map((stat, index) => (
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
                {resourcesLeasedStats.map((stat, index) => (
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
              name: resourcesLeasedStats[activeBoxIndex]?.name,
              value: resourcesLeasedStats[activeBoxIndex]?.value,
              trend:
                trendData?.payload?.percentageChange[
                  keyMapping[resourcesLeasedStats[activeBoxIndex]?.name]
                ] >= 0
                  ? 'Up'
                  : 'Down',
              trendPercentage: Math.abs(
                trendData?.payload?.percentageChange[
                  keyMapping[resourcesLeasedStats[activeBoxIndex]?.name]
                ].toFixed(2)
              ),
              textWithValue:
                resourcesLeasedStats[activeBoxIndex]?.textWithValue,
            }}
            timelineData={graphData.dayBasedTimestamp}
            graphData={
              graphData[
                keyMapping[resourcesLeasedStats[activeBoxIndex]?.name]
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

export default ResourcesLeased
