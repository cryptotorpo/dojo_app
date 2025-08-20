import { Box, IconButton, Typography, useMediaQuery } from '@mui/material'
import { useEffect, useState } from 'react'
import { ChartBg, DownArrow, UpArrow } from '../../assets'
import ToggleTimeline from '../../components/ToggleTimeline'
import DashboardBarChart from '../../components/DashboardBarChart'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import {
  getMonthNameFromNumber,
  getMonthNumber,
  getMonths,
  getYears,
} from '../../utils'

interface StatsData {
  name: string
  value: string
  trend?: string
  trendPercentage?: number
  textWithValue?: string
}

interface ChartSectionProps {
  statsData: StatsData
  graphData: number[]
  timelineData: number[]
  datesObjArray: any[]
  onTimeRangeChange: (range: number) => void
  onYearChange?: (year: number) => void
  onMonthChange?: (month: number) => void
  onDateChange?: (date: number) => void
  onMonthSelectedInYearlyView?: (isMonthSelected: boolean) => void
}

const ChartSection: React.FC<ChartSectionProps> = ({
  statsData,
  graphData,
  timelineData,
  datesObjArray,
  onTimeRangeChange,
  onYearChange,
  onMonthChange,
  onDateChange,
  onMonthSelectedInYearlyView,
}) => {
  const [chartTime, setChartTime] = useState<string>('7days')
  const isDown600 = useMediaQuery('(max-width:600px)')
  const isDown900 = useMediaQuery('(max-width:900px)')
  const years = getYears()
  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth() + 1
  const [selectedYear, setSelectedYear] = useState<number>(currentYear)
  const [isDisplayingYear, setIsDisplayingYear] = useState<boolean>(true)
  const [hoveredData, setHoveredData] = useState<{
    value: number
    label: string
  } | null>(null)
  const monthsFromTimestamp = getMonths()

  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth() + 1
  )

  const currentTimestamp = Date.now()
  const currentDate = new Date(currentTimestamp).getDate()
  const [selectedDate, setSelectedDate] = useState<number>(currentDate)

  useEffect(() => {
    if (chartTime === '1month') {
      onMonthChange && onMonthChange(selectedMonth)
      onYearChange && onYearChange(selectedYear)
    }
  }, [selectedMonth, selectedYear, chartTime])

  const handleChartTime = (time: string) => {
    setChartTime(time)

    switch (time) {
      case '7days':
        onTimeRangeChange(7)
        onMonthChange && onMonthChange(currentMonth)
        onDateChange && onDateChange(currentDate)
        onYearChange && onYearChange(currentYear)
        setSelectedMonth(currentMonth)
        setSelectedDate(currentDate)
        setIsDisplayingYear(false)
        break
      case '1month':
        onTimeRangeChange(30)
        setSelectedMonth(currentMonth)
        onDateChange && onDateChange(0)
        setIsDisplayingYear(false)
        break
      case 'alltime':
        onTimeRangeChange(1000000)
        onMonthChange && onMonthChange(0)
        onDateChange && onDateChange(0)
        onYearChange && onYearChange(selectedYear)
        setIsDisplayingYear(true)
        break
      default:
        onTimeRangeChange(7)
        onMonthChange && onMonthChange(currentMonth)
        onDateChange && onDateChange(currentDate)
        setSelectedDate(currentDate)
        onYearChange && onYearChange(currentYear)
        setSelectedMonth(currentMonth)
        setIsDisplayingYear(false)
    }
  }

  const handlePrevMonth = () => {
    setSelectedMonth(prevMonth => {
      const currentIndex = monthsFromTimestamp.findIndex(
        month => month.month === prevMonth
      )
      const newIndex =
        currentIndex > 0 ? currentIndex - 1 : monthsFromTimestamp.length - 1
      const newMonth = monthsFromTimestamp[newIndex].month
      const newYear = monthsFromTimestamp[newIndex].year

      onMonthChange && onMonthChange(newMonth)
      onYearChange && onYearChange(newYear)
      setSelectedMonth(newMonth)
      setSelectedYear(newYear)
      return newMonth
    })
    onMonthSelectedInYearlyView && onMonthSelectedInYearlyView(false)
  }

  const handleNextMonth = () => {
    setSelectedMonth(prevMonth => {
      const currentIndex = monthsFromTimestamp.findIndex(
        month => month.month === prevMonth
      )
      const newIndex =
        currentIndex < monthsFromTimestamp.length - 1 ? currentIndex + 1 : 0
      const newMonth = monthsFromTimestamp[newIndex].month
      const newYear = monthsFromTimestamp[newIndex].year

      onMonthChange && onMonthChange(newMonth)
      onYearChange && onYearChange(newYear)
      setSelectedMonth(newMonth)
      setSelectedYear(newYear)
      return newMonth
    })
    onMonthSelectedInYearlyView && onMonthSelectedInYearlyView(false)
  }

  const handlePrevWeek = () => {
    onDateChange && onDateChange(datesObjArray[0].dayN - 1)
    setSelectedDate(datesObjArray[0].dayN - 1)
    if (datesObjArray[0].dayN - 1 === 0) {
      setSelectedMonth(datesObjArray[0].month - 1)
      onMonthChange && onMonthChange(datesObjArray[0].month - 1)
    } else {
      setSelectedMonth(datesObjArray[0].month)
      onMonthChange && onMonthChange(datesObjArray[0].month)
    }
    if (datesObjArray[0].dayN - 1 === 0 && datesObjArray[0].month - 1 === 0) {
      setSelectedYear(datesObjArray[0].year - 1)
      onYearChange && onYearChange(datesObjArray[0].year - 1)
    } else {
      setSelectedYear(datesObjArray[0].year)
      onYearChange && onYearChange(datesObjArray[0].year)
    }
  }

  const handleNextWeek = () => {
    let currentDay = datesObjArray[datesObjArray.length - 1].dayN
    let currentMonth = datesObjArray[datesObjArray.length - 1].month
    let currentYear = datesObjArray[datesObjArray.length - 1].year

    let nextDay = currentDay + 7

    const daysInMonth = (month: number, year: number) => {
      return new Date(year, month, 0).getDate()
    }

    // Check if the new day exceeds the current month's days
    while (nextDay > daysInMonth(currentMonth, currentYear)) {
      nextDay -= daysInMonth(currentMonth, currentYear) // Carry over the remaining days to the next month
      currentMonth += 1

      // If the month exceeds 12, roll over to the next year
      if (currentMonth > 12) {
        currentMonth = 1
        currentYear += 1
      }
    }

    setSelectedDate(nextDay)
    setSelectedMonth(currentMonth)
    setSelectedYear(currentYear)

    onDateChange && onDateChange(nextDay)
    onMonthChange && onMonthChange(currentMonth)
    onYearChange && onYearChange(currentYear)
  }

  useEffect(() => {
    setChartTime('7days')
    setSelectedMonth(currentMonth)
    setSelectedDate(currentDate)
    onTimeRangeChange(7)
    onMonthChange && onMonthChange(currentMonth)
    onDateChange && onDateChange(currentDate)
    onYearChange && onYearChange(currentYear)
    setIsDisplayingYear(false)
  }, [statsData.name])

  return (
    <Box
      sx={{
        backgroundImage: `url(${ChartBg})`,
        backgroundRepeat: 'no-repeat',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid rgba(255, 255, 255, 0.04)',
        maxWidth: '825px',
        width: '100%',
        height: isDown600 ? 'max-content' : '630px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Typography
        sx={{
          fontSize: '18px',
          fontWeight: 400,
          marginBottom: '10px',
          fontFamily: 'ProximaNovaRegular',
          padding: '6px 20px',
          backgroundColor: 'rgba(255, 255, 255, 0.06)',
          color: '#ffffff',
          borderRadius: '32px',
          height: '44px',
          width: 'max-content',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {statsData.name}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: isDown600 ? 'column' : 'row',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '4px',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'ProximaNovaRegular',
              fontWeight: 700,
              fontSize: '24px',
              lineHeight: '36px',
            }}
          >
            {hoveredData ? (
              <>
                {statsData.name.includes('USD') ? '$' : ''}
                {hoveredData.value.toLocaleString('en-US')}{' '}
                <span style={{ fontSize: '20px' }}>
                  {statsData.textWithValue}
                </span>
                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: 400,
                    fontFamily: 'ProximaNovaRegular',
                    color: 'rgba(255, 255, 255, 0.8)',
                  }}
                >
                  {' '}
                  ({hoveredData.label})
                </span>
              </>
            ) : (
              <>
                {statsData.name.includes('USD') ? '$' : ''}
                {Number(statsData.value).toLocaleString('en-US')}{' '}
                <span style={{ fontSize: '20px' }}>
                  {statsData.textWithValue}
                </span>
              </>
            )}
          </Typography>
          {statsData?.trendPercentage !== 0 &&
            statsData.trend &&
            !hoveredData && (
              <>
                <img
                  src={statsData.trend === 'Up' ? UpArrow : DownArrow}
                  alt='trend icon'
                  height={'24px'}
                  width={'24px'}
                />
                <Typography
                  sx={{
                    fontFamily: 'ProximaNovaRegular',
                    fontWeight: 400,
                    fontSize: '18px',
                    lineHeight: '27px',
                    color:
                      statsData.trend === 'Up'
                        ? 'rgba(0, 220, 114, 1)'
                        : 'rgba(255, 80, 74, 1)',
                  }}
                >
                  {statsData.trendPercentage} %
                </Typography>
              </>
            )}
        </Box>

        <ToggleTimeline
          chartTime={chartTime}
          handleSelectTime={handleChartTime}
        />
      </Box>

      {chartTime === 'alltime' && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            py: '10px',
            alignItems: 'center',
          }}
        >
          <IconButton
            sx={{ color: 'rgba(255, 255, 255, 0.3)' }}
            onClick={() => {
              const index = years.findIndex(year => year === selectedYear)
              if (index > 0) {
                onMonthChange && onMonthChange(0)
                onYearChange && onYearChange(years[index - 1])
                setSelectedYear(years[index - 1])
              }
            }}
            disabled={selectedYear === years[0] || !isDisplayingYear}
          >
            <ChevronLeftIcon />
          </IconButton>
          <Typography
            sx={{
              cursor: isDisplayingYear ? 'default' : 'pointer',
            }}
            onClick={() => {
              if (!isDisplayingYear) {
                setIsDisplayingYear(true)
                onMonthSelectedInYearlyView && onMonthSelectedInYearlyView(true)
                onYearChange && onYearChange(selectedYear)
                onMonthChange && onMonthChange(0)
              }
            }}
          >
            {selectedYear}
          </Typography>
          <IconButton
            sx={{ color: 'rgba(255, 255, 255, 0.3)' }}
            onClick={() => {
              const index = years.findIndex(year => year === selectedYear)
              if (index < years.length - 1) {
                onMonthChange && onMonthChange(0)
                onYearChange && onYearChange(years[index + 1])
                setSelectedYear(years[index + 1])
              }
            }}
            disabled={
              selectedYear === years[years.length - 1] || !isDisplayingYear
            }
          >
            <ChevronRightIcon />
          </IconButton>
        </Box>
      )}

      {chartTime === '1month' && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            py: '10px',
            alignItems: 'center',
          }}
        >
          <IconButton
            sx={{ color: 'rgba(255, 255, 255, 0.3)' }}
            onClick={handlePrevMonth}
            disabled={
              monthsFromTimestamp.findIndex(
                month => month.month === selectedMonth
              ) === 0
            }
          >
            <ChevronLeftIcon />
          </IconButton>
          <Typography>
            {getMonthNameFromNumber(selectedMonth)} {selectedYear}
          </Typography>
          <IconButton
            sx={{ color: 'rgba(255, 255, 255, 0.3)' }}
            onClick={handleNextMonth}
            disabled={
              (selectedMonth === new Date().getMonth() + 1 &&
                selectedYear === new Date().getFullYear()) ||
              monthsFromTimestamp.findIndex(
                month => month.month === selectedMonth
              ) ===
                monthsFromTimestamp.length - 1
            }
          >
            <ChevronRightIcon />
          </IconButton>
        </Box>
      )}

      {chartTime === '7days' && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            py: '10px',
            alignItems: 'center',
          }}
        >
          <IconButton
            sx={{ color: 'rgba(255, 255, 255, 0.3)' }}
            onClick={handlePrevWeek}
            disabled={
              datesObjArray[0].dayN === 3 &&
              datesObjArray[0].month === monthsFromTimestamp[0].month &&
              datesObjArray[0].year === monthsFromTimestamp[0].year
            }
          >
            <ChevronLeftIcon />
          </IconButton>
          <Typography>
            {`${datesObjArray[0].dayN}/${getMonthNameFromNumber(
              datesObjArray[0].month
            )}/${datesObjArray[0].year} - 
              ${
                datesObjArray[datesObjArray.length - 1].dayN
              }/${getMonthNameFromNumber(
              datesObjArray[datesObjArray.length - 1].month
            )}/${datesObjArray[datesObjArray.length - 1].year}`}
          </Typography>
          <IconButton
            sx={{ color: 'rgba(255, 255, 255, 0.3)' }}
            onClick={handleNextWeek}
            disabled={
              selectedDate === currentDate &&
              selectedMonth === currentMonth &&
              selectedYear === currentYear
            }
          >
            <ChevronRightIcon />
          </IconButton>
        </Box>
      )}
      <Box
        sx={{
          height: isDown600
            ? '300px'
            : isDown900
            ? '400px'
            : 'calc(100% - 100px)',
          width: isDown600 ? '100%' : 'calc(100% - 20px)',
          marginTop: isDown600 ? '20px' : '0px',
        }}
      >
        <DashboardBarChart
          data={graphData}
          timelineData={timelineData}
          // trendColor={statsData.trend === 'Up' ? '#00DC72' : '#ff504a'} //feedback
          trendColor='#00DC72'
          showDollarSign={statsData.name.includes('USD')}
          isAllTime={chartTime === 'alltime'}
          selectedBarMonth={(label: string) => {
            const month = getMonthNumber(label) + 1
            onMonthChange && onMonthChange(month)
            onMonthSelectedInYearlyView && onMonthSelectedInYearlyView(true)
            setIsDisplayingYear(false)
          }}
          isDisplayingYear={isDisplayingYear}
          onHoverBar={setHoveredData}
        />
      </Box>
    </Box>
  )
}

export default ChartSection
