import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { devServerUrl } from '../utils'

const baseQuery = fetchBaseQuery({ baseUrl: devServerUrl })

export const api = createApi({
  baseQuery: baseQuery,
  endpoints: () => ({}),
  refetchOnFocus: true,
})
