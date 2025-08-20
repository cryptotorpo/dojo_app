import React, { useEffect, useState, useRef } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ChartOptions,
  ChartData,
} from 'chart.js'
import zoomPlugin from 'chartjs-plugin-zoom'
import { useMediaQuery } from '@mui/material'
import {
  convertTimestampToDate,
  dateWithYear,
  getMonthName,
  getMonthNameWithYear,
  sixDigitsFormatter,
} from '../../utils'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  zoomPlugin
)

interface ChartProps {
  data: number[]
  timelineData: number[]
  trendColor: string
  showDollarSign?: boolean
  isAllTime?: boolean
  selectedBarMonth?: (label: string) => void
  isDisplayingYear?: boolean
  onHoverBar?: (hoveredData: { value: number; label: string } | null) => void
}

const DashboardBarChart: React.FC<ChartProps> = ({
  data,
  timelineData,
  trendColor,
  showDollarSign,
  isAllTime,
  selectedBarMonth,
  isDisplayingYear,
  onHoverBar,
}) => {
  const chartRef = useRef<HTMLDivElement>(null)

  const lightenColor = (color: string, opacity: number) => {
    const r = parseInt(color.slice(1, 3), 16)
    const g = parseInt(color.slice(3, 5), 16)
    const b = parseInt(color.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${opacity})`
  }

  const lighterTrendColor = lightenColor(trendColor, 0.2)
  // const tooltipBgColor = lightenColor(trendColor, 0.4)
  const isDown600 = useMediaQuery('(max-width:600px)')
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        chartRef.current &&
        !chartRef.current.contains(event.target as Node)
      ) {
        setHoveredBarIndex(null)
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const handleMouseLeave = () => {
    if (onHoverBar) {
      onHoverBar(null)
    }
    setHoveredBarIndex(null)
  }

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        bottom: 50,
      },
    },
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const clickedIndex = elements[0].index
        const clickedValue = data[clickedIndex]

        if (clickedValue === 0) {
          return
        }
        const clickedLabel = isAllTime
          ? getMonthName(timelineData[clickedIndex])
          : convertTimestampToDate(timelineData[clickedIndex])

        isDisplayingYear && selectedBarMonth && selectedBarMonth(clickedLabel)
      }
    },
    onHover: (event, elements) => {
      if (elements.length > 0) {
        const hoveredIndex = elements[0].index
        const hoveredValue = data[hoveredIndex]
        const hoveredLabel = isDisplayingYear
          ? getMonthNameWithYear(timelineData[hoveredIndex])
          : dateWithYear(timelineData[hoveredIndex])

        if (onHoverBar) {
          onHoverBar({ value: hoveredValue, label: hoveredLabel })
        }
        setHoveredBarIndex(hoveredIndex)
      } else {
        setHoveredBarIndex(null)
        if (onHoverBar) {
          onHoverBar(null)
        }
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgb(0, 0, 0)',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        yAlign: 'bottom',
        position: 'nearest',
        caretPadding: 10,
        cornerRadius: 8,
        displayColors: false,
        titleAlign: 'center',
        bodyAlign: 'center',
        titleFont: {
          size: 18,
          family: 'Roboto',
          weight: 'bold',
        },
        bodyFont: {
          size: 12,
          family: 'ProximaNovaRegular',
          weight: 'normal',
        },
        bodyColor: '#D1D1D1',
        titleColor: '#ffffff',
        callbacks: {
          title: function (tooltipItem: any) {
            return showDollarSign
              ? `$${sixDigitsFormatter(tooltipItem[0].raw)}`
              : `${sixDigitsFormatter(tooltipItem[0].raw)}`
          },
          label: function (tooltipItem: any) {
            return isAllTime
              ? getMonthNameWithYear(timelineData[tooltipItem.dataIndex])
              : dateWithYear(timelineData[tooltipItem.dataIndex])
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          display: false,
          color: '#d1d1d1',
          font: {
            size: 14,
            family: 'ProximaNovaRegular',
          },
        },
      },
      y: {
        grace: '20%',
        grid: {
          display: false,
        },
        ticks: {
          display: false,
          color: '#d1d1d1',
          font: {
            size: 14,
            family: 'ProximaNovaRegular',
          },
        },
      },
    },
  }

  const chartData: ChartData<'bar'> = {
    labels: isAllTime
      ? timelineData.map((val, index) => {
          return val === 0
            ? getMonthName(new Date(2020, index).getTime())
            : getMonthName(val)
        })
      : timelineData.map(val => convertTimestampToDate(val)),
    datasets: [
      {
        label: 'Value',
        data: data,
        minBarLength: 5,
        maxBarThickness: 30,
        backgroundColor(context: any) {
          const { chart, datasetIndex, index } = context
          const ds = chart.data.datasets[datasetIndex]
          const value = ds.data[index]
          const y = chart.scales.y.getPixelForValue(value)
          const meta = chart.getDatasetMeta(datasetIndex)
          const data = meta.data[index]

          if (data) {
            const { x, width, base } = data
            const ctx = chart.ctx

            if (!isFinite(y) || !isFinite(base)) {
              return 'rgba(128, 128, 128, 0.5)'
            }
            if (value === 0) {
              return 'rgba(128, 128, 128, 0.5)'
            } else {
              const gradient = ctx.createLinearGradient(0, y, 0, base)
              gradient.addColorStop(0, trendColor)
              gradient.addColorStop(1, lighterTrendColor)
              return hoveredBarIndex === null || hoveredBarIndex === index
                ? gradient
                : 'rgba(128, 128, 128, 0.5)'
            }
          }
          return trendColor
        },
        borderColor: 'transparent',
        borderWidth: 1,
        borderRadius: 20,
        borderSkipped: false,
      },
    ],
  }

  return (
    <div
      className='chart-container'
      style={{
        position: 'relative',
        width: '100%',
        height: isDown600 ? '300px' : '470px',
      }}
      ref={chartRef}
      onMouseLeave={handleMouseLeave}
    >
      <Bar data={chartData} options={options} />
    </div>
  )
}

export default DashboardBarChart
