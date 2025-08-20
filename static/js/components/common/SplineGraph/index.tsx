import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import { convertTimestampToDate, sixDigitsFormatter } from '../../../utils'

interface Props {
  graphData: Array<any>
  timelineData: Array<any>
}

const SplineGraph: React.FC<Props> = ({ graphData, timelineData }) => {
  const series = [
    {
      name: 'Earnings',
      data: graphData.length === 1 ? [0, graphData[0]] : graphData,
    },
  ]
  const options: ApexOptions = {
    colors: ['rgba(0, 220, 114, 1)'],
    chart: {
      height: 109,
      width: '60%',
      type: 'area',
      foreColor: 'orange',
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: false,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'vertical',
        shadeIntensity: 1,
        opacityFrom: 0.0001,
        opacityTo: 0,
      },
    },
    xaxis: {
      type: 'category',
      tickAmount: 10,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      categories:
        timelineData.length === 1
          ? [timelineData[0], timelineData[0]]
          : timelineData,
      labels: {
        show: false,
        formatter: function (val: any) {
          return convertTimestampToDate(val)
        },
      },
    },
    noData: {
      text: 'No Data',
      align: 'center',
      verticalAlign: 'middle',
      offsetX: 0,
      offsetY: 0,
      style: {
        color: '#FFF',
        fontSize: '14px',
        fontFamily: 'Roboto',
      },
    },
    yaxis: {
      show: false,
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    tooltip: {
      style: {
        fontSize: '12px',
        fontFamily: 'ProximaNovaRegular',
      },
      theme: 'dark',
      y: {
        formatter: function (val: any) {
          return '$' + sixDigitsFormatter(val)
        },
      },
    },
  }

  return <Chart options={options} series={series} type='area' height={109} />
}

export default SplineGraph
