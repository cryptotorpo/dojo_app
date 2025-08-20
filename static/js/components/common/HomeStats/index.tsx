import React from "react";
import "./styles.css";
import { HomeBg, WorkerBg } from "../../../assets";
import { Skeleton } from "@mui/material";
import HomeStatsCount from "../HomeStatsCount";
import HomeStatsDivider from "../HomeStatsDivider";
import { useAppSelector } from "../../../redux/configureStore";

const HomeStats: React.FC = () => {
  const { dojoPrice } = useAppSelector((state) => state.user);
  const { homeStats, loading } = useAppSelector((state) => state.compute);

  const {
    availableCpu,
    availableGpu,
    totalCpu,
    totalGpu,
    verifiedCpu,
    verifiedGpu,
  } = homeStats;

  return (
    <div className="flex-row flex-col" style={{ width: "100%" }}>
      <div
        className="home-price-box"
        style={{
          backgroundImage: `url(${WorkerBg})`,
          backgroundSize: "cover",
        }}
      >
        <div>
          <p className="home-title" color={"rgba(0, 220, 114, 1)"}>
            Price of $DOAI
          </p>
        </div>
        <h1 className="worker-stats-value">
          {/* {dojoPrice ? ( */}${dojoPrice.toString().slice(0, 6)}
          {/* ) : (
            <Skeleton width={"100%"} />
          )} */}
        </h1>
      </div>

      <div
        className="home-stats-box"
        style={{
          backgroundImage: `url(${HomeBg})`,
          backgroundSize: "cover",
        }}
      >
        <HomeStatsCount
          title1="Total GPUs"
          title2="Total CPUs"
          value1={totalGpu}
          value2={totalCpu}
          title3="Verified GPUs"
          title4="Verified CPUs"
          value3={verifiedGpu}
          value4={verifiedCpu}
          title5="Available GPUs"
          title6="Available CPUs"
          value5={availableGpu}
          value6={availableCpu}
        />

        <HomeStatsDivider style={{ border: "none" }} />

        {/* <HomeStatsCount
            title1="Verified GPUs"
            title2="Verified CPUs"
            value1={verifiedGpu}
            value2={verifiedCpu}
          />
          <HomeStatsDivider />
          <HomeStatsCount
            title1="Available GPUs"
            title2="Available CPUs"
            value1={availableGpu}
            value2={availableCpu}
          /> */}
      </div>
    </div>
  );
};

export default HomeStats;
