import { api } from '../api'

type GraphDataResponse = {
  payload: Array<{
    x: number
    y: number
  }>
}

export const dashboardApi = api.injectEndpoints({
  endpoints: build => ({
    getNetworkSummary: build.query<void, void>({
      query: () => '/network-summary/get-network-summary',
    }),
    getResourcesLeased: build.query<void, void>({
      query: () => '/resources-leased/get-resources-leased',
    }),
    getNetworkCapacity: build.query<void, void>({
      query: () => '/network-capacity/get-network-capacity',
    }),
    getCluster: build.query<void, void>({
      query: () => '/cluster/get-cluster',
    }),
    getClusterGraph: build.query<any, number>({
      query: range => `/cluster/get-cluster-graph?range=${range}`,
    }),
    //take year as query param
    getNetworkCapacityYearlyGraph: build.query<GraphDataResponse, number>({
      query: year =>
        `/network-capacity/get-network-capacity-graph-month-year?year=${year}&month=0&date=0`,
    }),
    //takes month and year as query params
    getNetworkCapacityMonthlyGraph: build.query<
      GraphDataResponse,
      { month: number; year: number }
    >({
      query: ({ month, year }) =>
        `/network-capacity/get-network-capacity-graph-month-year?year=${year}&month=${month}&date=0`,
    }),
    //takes week, month and year as query params
    getNetworkCapacityWeeklyGraph: build.query<
      GraphDataResponse,
      { date: number; month: number; year: number }
    >({
      query: ({ date, month, year }) =>
        `/network-capacity/get-network-capacity-graph-month-year?year=${year}&month=${month}&date=${date}`,
    }),

    getNetworkCapacityTrend: build.query<
      GraphDataResponse,
      { date: number; month: number; year: number }
    >({
      query: ({ date, month, year }) =>
        `/network-capacity/get-network-capacity-trend-month-year?year=${year}&month=${month}&date=${date}`,
    }),

    getNetworkSummaryYearlyGraph: build.query<GraphDataResponse, number>({
      query: year =>
        `/network-summary/get-network-summary-graph-month-year?year=${year}&month=0&date=0`,
    }),
    getNetworkSummaryMonthlyGraph: build.query<
      GraphDataResponse,
      { month: number; year: number }
    >({
      query: ({ month, year }) =>
        `/network-summary/get-network-summary-graph-month-year?year=${year}&month=${month}&date=0`,
    }),
    getNetworkSummaryWeeklyGraph: build.query<
      GraphDataResponse,
      { date: number; month: number; year: number }
    >({
      query: ({ date, month, year }) =>
        `/network-summary/get-network-summary-graph-month-year?year=${year}&month=${month}&date=${date}`,
    }),
    getNetworkSummaryTrend: build.query<
      GraphDataResponse,
      { date: number; month: number; year: number }
    >({
      query: ({ date, month, year }) =>
        `/network-summary/get-network-summary-trend-month-year?year=${year}&month=${month}&date=${date}`,
    }),

    getResourcesLeasedYearlyGraph: build.query<GraphDataResponse, number>({
      query: year =>
        `/resources-leased/get-resources-leased-graph-month-year?year=${year}&month=0&date=0`,
    }),
    getResourcesLeasedMonthlyGraph: build.query<
      GraphDataResponse,
      { month: number; year: number }
    >({
      query: ({ month, year }) =>
        `/resources-leased/get-resources-leased-graph-month-year?year=${year}&month=${month}&date=0`,
    }),
    getResourcesLeasedWeeklyGraph: build.query<
      GraphDataResponse,
      { date: number; month: number; year: number }
    >({
      query: ({ date, month, year }) =>
        `/resources-leased/get-resources-leased-graph-month-year?year=${year}&month=${month}&date=${date}`,
    }),
    getResourcesLeasedTrend: build.query<
      GraphDataResponse,
      { date: number; month: number; year: number }
    >({
      query: ({ date, month, year }) =>
        `/resources-leased/get-resources-leased-trend-month-year?year=${year}&month=${month}&date=${date}`,
    }),
  }),
})

export const {
  useGetNetworkSummaryQuery,
  useGetResourcesLeasedQuery,
  useGetNetworkCapacityQuery,
  useGetClusterQuery,
  useGetClusterGraphQuery,
  useGetNetworkCapacityYearlyGraphQuery,
  useGetNetworkCapacityMonthlyGraphQuery,
  useGetNetworkCapacityWeeklyGraphQuery,
  useGetNetworkSummaryYearlyGraphQuery,
  useGetNetworkSummaryMonthlyGraphQuery,
  useGetNetworkSummaryWeeklyGraphQuery,
  useGetResourcesLeasedYearlyGraphQuery,
  useGetResourcesLeasedMonthlyGraphQuery,
  useGetResourcesLeasedWeeklyGraphQuery,
  useGetNetworkCapacityTrendQuery,
  useGetNetworkSummaryTrendQuery,
  useGetResourcesLeasedTrendQuery,
} = dashboardApi
