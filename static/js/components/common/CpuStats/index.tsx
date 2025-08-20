import React from "react";
import { Typography } from "@mui/material";
import { Globe, Gpu } from "../../../assets";

import "./styles.css";
import { useAppSelector } from "../../../redux/configureStore";

const CpuStats = () => {
  const { continent, data, gpu, cpu } = useAppSelector(
    (state) => state.compute
  );

  return (
    <div className="cpu-stats-box">
      <div className="cpu-stats-header">
        <div className="flex-row tablet-row ">
          <img src={Globe} alt="" style={{ marginRight: 20 }} />
          <div>
            <Typography
              color={"rgba(148, 152, 156, 1)"}
              fontSize={16}
              fontFamily={"Roboto"}
            >
              Map
            </Typography>
            <Typography
              color={"rgba(229, 233, 236, 1)"}
              fontSize={24}
              fontFamily={"ProximaNovaBold"}
              fontWeight={600}
            >
              {continent}
            </Typography>
          </div>
        </div>

        <div className="flex-row tablet-row mr">
          <img src={Gpu} alt="" style={{ marginRight: 20 }} />
          <div>
            <Typography
              color={"rgba(148, 152, 156, 1)"}
              fontSize={16}
              fontFamily={"Roboto"}
            >
              Total GPUs/CPUs
            </Typography>

            <Typography
              color={"rgba(229, 233, 236, 1)"}
              fontSize={24}
              fontFamily={"ProximaNovaBold"}
              fontWeight={600}
            >
              {gpu[continent.replace(" ", "") as keyof typeof gpu]} /{" "}
              {cpu[continent.replace(" ", "") as keyof typeof cpu]}
            </Typography>
          </div>
        </div>
      </div>

      <div className="cpu-stats-data-box">
        {Object.keys(data).map((proc) => (
          <div className="flex-row" key={data[proc].name}>
            <div className="worker-title">
              <Typography
                fontFamily={"ProximaNovaLight"}
                fontSize={18}
                color={"rgba(209, 209, 209, 1)"}
              >
                {data[proc].name}
              </Typography>
            </div>
            <div className="home-title">
              <Typography
                fontFamily={"ProximaNovaLight"}
                fontSize={18}
                color={"rgba(0, 220, 114, 1)"}
              >
                {data[proc].value}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CpuStats;
