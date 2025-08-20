import React, { useEffect, useState } from "react";
import { devServerUrl, fetchUsdPrice, formatNumber } from "../utils";
import { useAppDispatch } from "../redux/configureStore";
import { setDojoPrice } from "../redux/slices/userSlice";
import axios from "axios";
import {
  setComputeData,
  setComputeDataContinent,
  setCpu,
  setGpu,
  setHomeStats,
  setLoading,
  setTotalCpuGpu,
} from "../redux/slices/computeSlice";

const useApp = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    (async () => {
      try {
        dispatch(setLoading(true));
        const usdPrice = await fetchUsdPrice("dojo-protocol");

        dispatch(setDojoPrice(usdPrice));

        const { data: computeData } = await axios.get(
          `${devServerUrl}compute-type/get-compute-type/Europe`
        );
        const { data: gpuData } = await axios.get(
          `${devServerUrl}home-map/get-home-map-gpu`
        );
        const { data: cpuData } = await axios.get(
          `${devServerUrl}home-map/get-home-map-cpu`
        );

        const { data: homePageData } = await axios.get(
          `${devServerUrl}home-page/get-home-page`
        );

        const { payload: gpuPayload } = gpuData;
        const { payload: cpuPayload } = cpuData;
        const { payload: homePayload } = homePageData;

        console.log("computeData", computeData);
        dispatch(setComputeDataContinent("Europe"));
        dispatch(setComputeData(computeData.payload));
        dispatch(setTotalCpuGpu(computeData.payload[0].totalPerDay));
        dispatch(
          setGpu({
            NorthAmerica: gpuPayload.NorthAmerica,
            SouthAmerica: gpuPayload.SouthAmerica,
            Europe: gpuPayload.Europe,
            Asia: gpuPayload.Asia,
            Africa: gpuPayload.Africa,
            Oceania: gpuPayload.Oceania,
          })
        );
        dispatch(
          setCpu({
            NorthAmerica: cpuPayload.NorthAmerica,
            SouthAmerica: cpuPayload.SouthAmerica,
            Europe: cpuPayload.Europe,
            Asia: cpuPayload.Asia,
            Africa: cpuPayload.Africa,
            Oceania: cpuPayload.Oceania,
          })
        );
        dispatch(
          setHomeStats({
            totalGpu: formatNumber(homePayload.totalGPU),
            totalCpu: formatNumber(homePayload.totalCPU),
            verifiedGpu: formatNumber(homePayload.verifiedGPUs),
            verifiedCpu: formatNumber(homePayload.verifiedCPUs),
            availableGpu: formatNumber(homePayload.GPUsReady),
            availableCpu: formatNumber(homePayload.CPUsReady),
          })
        );
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setLoading(false));
        console.log(error);
      }
    })();
  }, []);
  return "";
};

export default useApp;
