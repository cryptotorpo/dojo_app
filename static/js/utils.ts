import axios from 'axios'

export const shortenSolanaAddress = (
  address: string,
  startLength = 4,
  endLength = 4
) => {
  if (!address) return ''

  const start = address.slice(0, startLength)
  const end = address.slice(-endLength)
  return `${start}...${end}`
}

// export const devServerUrl = 'http://18.220.207.166:3000/v1/'
export const devServerUrl = 'https://backend-app.dojoprotocol.com/v1/'
// export const devServerUrl = 'http://3.134.201.186:3000/v1/'
// export const devServerUrl = 'https://939b-101-53-228-55.ngrok-free.app/v1/'

export const formatNumber = (value: number) => {
  // Split the number into integer and decimal parts
  const [integerPart, decimalPart] = value.toFixed(2).split('.')

  // Add commas to the integer part
  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  // Return the formatted number with the decimal part if it exists
  return decimalPart && parseInt(decimalPart, 10) !== 0
    ? `${formattedIntegerPart}.${decimalPart}`
    : formattedIntegerPart
}

export const fetchUsdPrice = async (id: string) => {
  const { data } = await axios.get(
    `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`
  )

  return data[id].usd
}

export const numFormatter = (number: number, precision: number = 2) => {
  if (number > Math.pow(2, 53)) number = 0

  let symbol = ''
  let status = true

  // Ensure the number is valid
  if (typeof number !== 'number') number = 0

  // Handle negative values
  if (number < 0) {
    status = false
    number = Math.abs(number)
  }

  let truncatedNumber = number

  // Determine the appropriate suffix and scale the number
  if (number >= 1e12) {
    symbol = 'T' // Trillions
    truncatedNumber = truncateToPrecision(number / 1e12, precision)
  } else if (number >= 1e9) {
    symbol = 'B' // Billions
    truncatedNumber = truncateToPrecision(number / 1e9, precision)
  } else if (number >= 1e6) {
    symbol = 'M' // Millions
    truncatedNumber = truncateToPrecision(number / 1e6, precision)
  } else if (number >= 1e3) {
    symbol = 'K' // Thousands
    truncatedNumber = truncateToPrecision(number / 1e3, precision)
  } else {
    truncatedNumber = truncateToPrecision(number, precision) // Less than 1K, no suffix
  }

  // Format the number with conditional precision
  const formattedAmount = formatNumber(truncatedNumber)

  return { amount: formattedAmount, symbol, status }
}

// Truncate without rounding based on the precision
export const truncateToPrecision = (num: number, precision: number): number => {
  const factor = Math.pow(10, precision)
  return Math.floor(num * factor) / factor
}

export const sixDigitsFormatter = (num: number): string => {
  if (num < 1) {
    return String(parseFloat(num.toPrecision(2)))
  }

  const si = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'B' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ]

  let i
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break
    }
  }

  const truncatedAmount = truncateExact(num / si[i].value, 2) // Ensure truncation with 2 decimal places
  return truncatedAmount + si[i].symbol
}

export const truncateExact = (num: number, fixed: number): number => {
  if (num) {
    const sNumber = num.toString()
    const index = sNumber.indexOf('.')
    const newNumber = index !== 0 ? sNumber : '0' + sNumber
    const re = new RegExp('^-?\\d+(?:.\\d{0,' + (fixed || -1) + '})?')
    const number = newNumber.toString().match(re)
    if (number) {
      return parseFloat(number[0])
    }
    return num
  } else {
    return num
  }
}

export const convertTimestampToDate = (timestamp: number) => {
  const date = new Date(timestamp)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

export const dateWithYear = (timestamp: number) => {
  const date = new Date(timestamp)

  const day = date.getDate()
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const month = monthNames[date.getMonth()]
  const year = date.getFullYear()

  return `${day} ${month} ${year}`
}

export const isIOS = () => {
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
  )
}

// export const startingTimestampForGraphs = 1725321600000 // 3 sep 2024
export const startingTimestampForGraphs = 1719964800000 // July 1, 2024

export const getYears = () => {
  const currentYear = new Date().getFullYear()
  const startYear = new Date(startingTimestampForGraphs).getFullYear()
  const years = []
  for (let i = startYear; i <= currentYear; i++) {
    years.push(i)
  }
  return years
}

export const getMonthName = (timestamp: number) => {
  const date = new Date(timestamp)
  return date.toLocaleString('default', { month: 'short' })
}

export const getMonthNameWithYear = (timestamp: number) => {
  const date = new Date(timestamp)
  return date.toLocaleString('default', { month: 'short', year: 'numeric' })
}

//return month number when given month name in short form
export const getMonthNumber = (month: string) => {
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  return monthNames.indexOf(month)
}

//return array of month along with year from starting timestamp
export const getMonths = () => {
  const currentYear = new Date().getFullYear()
  const startYear = new Date(startingTimestampForGraphs).getFullYear()
  const startMonth = new Date(startingTimestampForGraphs).getMonth()
  const months = []
  for (let i = startYear; i <= currentYear; i++) {
    for (let j = 0; j < 12; j++) {
      if (i === startYear && j < startMonth) continue
      months.push({ year: i, month: j + 1 })
    }
  }
  return months
}

export const getMonthNameFromNumber = (month: number) => {
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  return monthNames[month - 1]
}

export const getWeekOfMonth = (timestamp: any) => {
  const date = new Date(timestamp)

  // Get the day of the month (1-31)
  const dayOfMonth = date.getDate()

  // Find the first day of the current month
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)

  // Get the day of the week of the first day (0-6, where 0 is Sunday and 6 is Saturday)
  const firstDayOfWeek = firstDayOfMonth.getDay()

  // Calculate the week number
  const weekOfMonth = Math.ceil((dayOfMonth + firstDayOfWeek) / 7)

  return weekOfMonth
}
