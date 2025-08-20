import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js'
import { convertTimestampToDate, sixDigitsFormatter } from '../../../utils'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

interface Props {
  graphData: Array<number>
  timelineData: Array<number>
}

const BarGraph = ({ graphData, timelineData }: Props) => {
  // const alternatingColors = ['rgba(48, 48, 48, 1)', 'rgba(34, 34, 34, 1)']

  const trendColor = '#00DC72'

  const lightenColor = (color: string, opacity: number) => {
    const r = parseInt(color.slice(1, 3), 16)
    const g = parseInt(color.slice(3, 5), 16)
    const b = parseInt(color.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${opacity})`
  }

  const lighterTrendColor = lightenColor(trendColor, 0.2)

  const data = {
    labels: timelineData.map(val => convertTimestampToDate(val)),
    datasets: [
      {
        label: 'Earnings',
        data: graphData,
        // backgroundColor: graphData.map(
        //   (_, index) => alternatingColors[index % alternatingColors.length]
        // ),
        backgroundColor(context: any) {
          const { chart, datasetIndex, index } = context
          const ds = chart.data.datasets[datasetIndex]
          const value = ds.data[index]
          const y = chart.scales.y.getPixelForValue(value)
          const meta = chart.getDatasetMeta(datasetIndex)
          const data = meta.data[index]

          if (data) {
            const { x, width, base } = data
            if (x !== undefined && width !== undefined && base !== undefined) {
              const ctx = chart.ctx
              const gradient = ctx.createLinearGradient(0, y, 0, base)
              gradient.addColorStop(0, trendColor)
              gradient.addColorStop(1, lighterTrendColor)
              return gradient
            }
          }
          return trendColor
        },
        borderColor: '#222222',
        borderWidth: 1,
      },
    ],
  }

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return '$' + sixDigitsFormatter(context.raw)
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
          color: '#d1d1d1',
          font: {
            size: 14,
            family: 'ProximaNovaRegular',
          },
        },
        border: {
          color: '#9c9c9c',
          width: 1,
        },
      },
      y: {
        grace: '10%',
        grid: {
          display: true,
          color: '#9c9c9c',
        },
        ticks: {
          color: '#d1d1d1',
          font: {
            size: 14,
            family: 'ProximaNovaRegular',
          },
          callback: function (value: any) {
            return '$' + sixDigitsFormatter(value)
          },
        },
        border: {
          color: '#9c9c9c',
          width: 1,
        },
      },
    },
  }

  return (
    <div className='chart-container'>
      <Bar data={data} options={options} height={237} />
    </div>
  )
}

export default BarGraph
