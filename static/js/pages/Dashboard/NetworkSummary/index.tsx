import {
  Box,
  Grid,
  useMediaQuery,
  CircularProgress,
  Typography,
} from '@mui/material'
import { useState, useEffect } from 'react'
import DashboardStatsBox from '../../../components/common/DashboardStatsBox'
import { ScrollableBoxShades } from '../../../assets'
import ChartSection from '../ChartSection'
import {
  useGetNetworkSummaryQuery,
  useGetNetworkSummaryYearlyGraphQuery,
  useGetNetworkSummaryMonthlyGraphQuery,
  useGetNetworkSummaryWeeklyGraphQuery,
  useGetNetworkSummaryTrendQuery,
} from '../../../services/dashboard'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'

interface GraphData {
  dailyUsdSpend: number[]
  totalUsdSpend: number[]
  dailyNewLeases: number[]
  totalLeases: number[]
  dayBasedTimestamp: number[]
  _id: any[]
}

type KeyMapping = {
  [key: string]: keyof GraphData
}

const NetworkSummary = () => {
  const [activeBoxIndex, setActiveBoxIndex] = useState<number | null>(null)
  const [networkSummaryStats, setNetworkSummaryStats] = useState<any[]>([])
  const isDown900 = useMediaQuery('(max-width:900px)')
  const [selectedTimeRange, setSelectedTimeRange] = useState<number>(7)
  const [graphData, setGraphData] = useState<GraphData>({} as GraphData)
  const keyMapping: KeyMapping = {
    'Daily USD Spent': 'dailyUsdSpend',
    'Total USD Spent': 'totalUsdSpend',
    'Daily new Leases': 'dailyNewLeases',
    'Total Leases': 'totalLeases',
  }

  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth() + 1
  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonth)
  const [selectedYear, setSelectedYear] = useState<number>(currentYear)
  const currentTimestamp = Date.now()
  const currentDate = new Date(currentTimestamp).getDate()
  const [selectedDate, setSelectedDate] = useState<number>(currentDate)
  const [isMonthSelectedInYearlyView, setIsMonthSelectedInYearlyView] =
    useState<boolean>(false)

  const {
    data: networkSummaryData,
    isLoading: networkSummaryDataLoading,
    error: networkSummaryDataError,
  } = useGetNetworkSummaryQuery()

  const {
    data: trendData,
    isLoading: trendIsLoading,
    error: trendError,
  } = useGetNetworkSummaryTrendQuery(
    { date: selectedDate, month: selectedMonth, year: selectedYear },
    {
      refetchOnMountOrArgChange: true,
    }
  ) as any

  const yearlyGraphQuery = useGetNetworkSummaryYearlyGraphQuery(selectedYear, {
    refetchOnMountOrArgChange: true,
  })
  const monthlyGraphQuery = useGetNetworkSummaryMonthlyGraphQuery(
    { month: selectedMonth, year: selectedYear },
    {
      refetchOnMountOrArgChange: true,
    }
  )
  const weeklyGraphQuery = useGetNetworkSummaryWeeklyGraphQuery(
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
    if (networkSummaryData) {
      const { payload } = networkSummaryData as any
      setNetworkSummaryStats([
        {
          name: 'Daily USD Spent',
          value: payload.dailyUsdSpend,
          trend: payload.dailyUsdSpendPercentage >= 0 ? 'Up' : 'Down',
          trendPercentage: Math.abs(payload.dailyUsdSpendPercentage).toFixed(2),
          boxShadeNumber: 1,
          infoIconText: 'Amount spent in the last 24h',
        },
        {
          name: 'Total USD Spent',
          value: payload.totalUsdSpend,
          trend: payload.totalUsdSpendPercentage >= 0 ? 'Up' : 'Down',
          trendPercentage: Math.abs(payload.totalUsdSpendPercentage).toFixed(2),
          boxShadeNumber: 2,
          infoIconText:
            'This is the total amount of USD spent to rent out computing power on Dojo Compute since the beginning of the network',
        },
        {
          name: 'Daily new Leases',
          value: payload.dailyNewLeases,
          trend: payload.dailyNewLeasesPercentage >= 0 ? 'Up' : 'Down',
          trendPercentage: Math.abs(payload.dailyNewLeasesPercentage).toFixed(
            2
          ),
          boxShadeNumber: 2,
          infoIconText: 'Last 24hours',
        },
        {
          name: 'Total Leases',
          value: payload.totalLeases,
          trend: payload.totalLeasesPercentage >= 0 ? 'Up' : 'Down',
          trendPercentage: Math.abs(payload.totalLeasesPercentage).toFixed(2),
          boxShadeNumber: 2,
          infoIconText:
            'This is the total number of leases that were live at some point and that someone paid for - includes test and temporary deployments',
        },
      ])
    }
  }, [networkSummaryData])

  useEffect(() => {
    if (graphDataResponse) {
      const reversedPayload = [...graphDataResponse.payload]
      // .reverse()
      const processedGraphData = reversedPayload.reduce(
        (acc: any, curr: any) => {
          acc['dailyUsdSpend'] = acc['dailyUsdSpend'] || []
          acc['totalUsdSpend'] = acc['totalUsdSpend'] || []
          acc['dailyNewLeases'] = acc['dailyNewLeases'] || []
          acc['totalLeases'] = acc['totalLeases'] || []
          acc['dayBasedTimestamp'] = acc['dayBasedTimestamp'] || []

          acc['dailyUsdSpend'].push(curr.dailyUsdSpend)
          acc['totalUsdSpend'].push(curr.totalUsdSpend)
          acc['dailyNewLeases'].push(curr.dailyNewLeases)
          acc['totalLeases'].push(curr.totalLeases)
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

  if (networkSummaryDataLoading || graphDataLoading || trendIsLoading)
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

  if (networkSummaryDataError || graphDataError || trendError)
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
      // setActiveBoxIndex(null)
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
          {networkSummaryStats.map((stat, index) => (
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
                paddingX: '20px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.04)',
                maxWidth: '557px',
                width: '100%',
                height: '630px',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              id={`${networkSummaryStats[activeBoxIndex]?.name}-box`}
            >
              {networkSummaryStats.map((stat, index) => (
                <DashboardStatsBox
                  key={index}
                  name={stat.name}
                  value={stat.value}
                  trend={stat.trend}
                  trendPercentage={stat.trendPercentage}
                  boxShadeNumber={stat.boxShadeNumber}
                  isActive={activeBoxIndex === index}
                  toggleGraphView={() => toggleGraphView(index)}
                  infoIconText={stat.infoIconText}
                />
              ))}
            </Box>
          )}
          <ChartSection
            statsData={{
              name: networkSummaryStats[activeBoxIndex]?.name,
              value: networkSummaryStats[activeBoxIndex]?.value,
              trend:
                trendData?.payload?.percentageChange[
                  keyMapping[networkSummaryStats[activeBoxIndex]?.name]
                ] >= 0
                  ? 'Up'
                  : 'Down',
              trendPercentage: Math.abs(
                trendData?.payload?.percentageChange[
                  keyMapping[networkSummaryStats[activeBoxIndex]?.name]
                ].toFixed(2)
              ),
            }}
            timelineData={graphData.dayBasedTimestamp}
            graphData={
              graphData[
                keyMapping[networkSummaryStats[activeBoxIndex]?.name]
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

export default NetworkSummary
