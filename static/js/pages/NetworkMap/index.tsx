import React, { useEffect, useState } from "react";

import "./styles.css";
import { useGetNetworkMapDataQuery } from "../../services/network-map";
import ContinentMap from "../../components/common/ContinentMap";

const NetworkMap = () => {
  const [continentData, setContinentData] = useState<
    {
      name: string;
      value: number;
      lat: number;
      lng: number;
    }[]
  >([
    {
      name: "NorthAmerica",
      value: 0,
      lat: 83.631,
      lng: 74.102,
    },
    {
      name: "SouthAmerica",
      value: 0,
      lat: 8.7832,
      lng: 71.346,
    },
    {
      name: "Europe",
      value: 0,
      lat: 12.459,
      lng: 15.2551,
    },
    {
      name: "Asia",
      value: 0,
      lat: 34.0479,
      lng: 100.6197,
    },
    {
      name: "Africa",
      value: 0,
      lat: 8.7832,
      lng: 34.5085,
    },
    {
      name: "Oceania",
      value: 0,
      lat: 22.7359,
      lng: 140.0188,
    },
  ]);

  const { data } = useGetNetworkMapDataQuery();

  useEffect(() => {
    if (data) {
      const { payload } = data as any;
      setContinentData([
        {
          name: "NorthAmerica",
          value: payload.NorthAmerica,
          lat: 54.2211793,
          lng: -116.7609645,
        },
        {
          name: "SouthAmerica",
          value: payload.SouthAmerica,
          lat: -23.4200359,
          lng: -61.0910808,
        },
        {
          name: "Europe",
          value: payload.Europe,
          lat: 54.526,
          lng: 15.2551,
        },
        {
          name: "Asia",
          value: payload.Asia,
          lat: 33.9147667,
          lng: 82.8250075,
        },
        {
          name: "Africa",
          value: payload.Africa,
          lat: 1.6508,
          lng: 17.4677,
        },
        {
          name: "Oceania",
          value: payload.Oceania,
          lat: -24.5310385,
          lng: 131.875717,
        },
      ]);
    }
  }, [data]);

  console.log(continentData);

  return (
    <div className="network-map-box">
      {/* <NetworkMapStats /> */}
      <div className="network-map-box-1">
        <ContinentMap />
      </div>
    </div>
  );
};

export default NetworkMap;
