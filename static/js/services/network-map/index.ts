import { api } from "../api";

export const networkMapApi = api.injectEndpoints({
  endpoints: (build) => ({
    getNetworkMapData: build.query<void, void>({
      query: () => "/home-map/get-total-cpu-gpu",
    }),
  }),
});

export const { useGetNetworkMapDataQuery } = networkMapApi;
