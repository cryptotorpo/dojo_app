import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ComputeState {
  continent: string;
  data: any;
  totalCpuGpu: number;
  cpu: {
    NorthAmerica: number;
    SouthAmerica: number;
    Europe: number;
    Asia: number;
    Africa: number;
    Oceania: number;
  };
  gpu: {
    NorthAmerica: number;
    SouthAmerica: number;
    Europe: number;
    Asia: number;
    Africa: number;
    Oceania: number;
  };
  homeStats: {
    totalGpu: string;
    totalCpu: string;
    verifiedGpu: string;
    verifiedCpu: string;
    availableGpu: string;
    availableCpu: string;
  };
  loading: boolean;
}

const initialState: ComputeState = {
  continent: "Europe",
  data: {},
  totalCpuGpu: 0,
  cpu: {
    NorthAmerica: 0,
    SouthAmerica: 0,
    Europe: 0,
    Asia: 0,
    Africa: 0,
    Oceania: 0,
  },
  gpu: {
    NorthAmerica: 0,
    SouthAmerica: 0,
    Europe: 0,
    Asia: 0,
    Africa: 0,
    Oceania: 0,
  },
  homeStats: {
    totalGpu: "0",
    totalCpu: "0",
    verifiedGpu: "0",
    verifiedCpu: "0",
    availableGpu: "0",
    availableCpu: "0",
  },
  loading: false,
};

export const computeSlice = createSlice({
  name: "compute",
  initialState,
  reducers: {
    setComputeDataContinent: (state, action: PayloadAction<string>) => {
      state.continent = action.payload;
    },
    setComputeData: (state, action: PayloadAction<any>) => {
      const processors = action.payload[0].processor;
      let processorInfo: any = {};
      Object.keys(processors).map(
        (pc) =>
          (processorInfo[pc] = {
            name: action.payload.processorNames[pc],
            value: processors[pc],
          })
      );
      console.log(processorInfo);
      state.data = processorInfo;
    },
    setTotalCpuGpu: (state, action: PayloadAction<number>) => {
      state.totalCpuGpu = action.payload;
    },
    setGpu: (state, action: PayloadAction<any>) => {
      state.gpu = action.payload;
    },
    setCpu: (state, action: PayloadAction<any>) => {
      state.cpu = action.payload;
    },
    setHomeStats: (state, action: PayloadAction<any>) => {
      state.homeStats = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setComputeDataContinent,
  setComputeData,
  setTotalCpuGpu,
  setCpu,
  setGpu,
  setHomeStats,
  setLoading,
} = computeSlice.actions;

export default computeSlice.reducer;
