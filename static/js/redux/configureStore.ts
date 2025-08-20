import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers";
import { createMigrate, persistReducer, persistStore } from "redux-persist";
import { thunk } from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "../services/api";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const persistConfig = {
  key: "root",
  storage,
  version: 9,
  blacklist: ["api"],
  migrate: createMigrate({
    // @ts-expect-error migrations are poorly typed
    1: (state) => {
      return {
        ...state,
      };
    },
    // @ts-expect-error migrations are poorly typed
    2: (state) => {
      return {
        ...state,
        user: {
          // @ts-expect-error migrations are poorly typed
          ...state.user,
          usedParticipationCode: {},
        },
      };
    },
    // @ts-expect-error migrations are poorly typed
    3: (state) => {
      return {
        ...state,
        user: {
          // @ts-expect-error migrations are poorly typed
          ...state.user,
          dojoPrice: 0,
        },
      };
    },
    // @ts-expect-error migrations are poorly typed
    4: (state) => {
      return {
        ...state,
        compute: {
          // @ts-expect-error migrations are poorly typed
          ...state.compute,
          continent: "",
          data: {},
        },
      };
    },
    // @ts-expect-error migrations are poorly typed
    5: (state) => {
      return {
        ...state,
        compute: {
          // @ts-expect-error migrations are poorly typed
          ...state.compute,
          continent: "Europe",
          data: {},
        },
      };
    },
    // @ts-expect-error migrations are poorly typed
    6: (state) => {
      return {
        ...state,
        compute: {
          // @ts-expect-error migrations are poorly typed
          ...state.compute,
          continent: "Europe",
          data: {},
          totalCpuGpu: 0,
        },
      };
    },
    // @ts-expect-error migrations are poorly typed
    7: (state) => {
      return {
        ...state,
        compute: {
          // @ts-expect-error migrations are poorly typed
          ...state.compute,
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
        },
      };
    },
    // @ts-expect-error migrations are poorly typed
    8: (state) => {
      return {
        ...state,
        user: {
          // @ts-expect-error migrations are poorly typed
          ...state.user,
          name: "",
          email: "",
          profilePicture: "",
        },
      };
    },
    // @ts-expect-error migrations are poorly typed
    9: (state) => {
      return {
        ...state,
        compute: {
          // @ts-expect-error migrations are poorly typed
          ...state.compute,
          homeStats: {
            totalGpu: 0,
            totalCpu: 0,
            verifiedGpu: 0,
            verifiedCpu: 0,
            availableGpu: 0,
            availableCpu: 0,
          },
          loading: false,
        },
      };
    },
  }),
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      api.middleware,
      thunk,
    ]),
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const developmentDispatch: () => AppDispatch = useDispatch;

export const useAppDispatch = developmentDispatch;

export const persistor = persistStore(store);

export const developmentSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppSelector = developmentSelector;
