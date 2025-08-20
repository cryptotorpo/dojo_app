import React from "react";

import HomeStats from "../../components/common/HomeStats";
import CpuStats from "../../components/common/CpuStats";
import "./styles.css";
import Map from "../../components/common/Map";
import { useAppSelector } from "../../redux/configureStore";
import { HomeBg } from "../../assets";
import { Skeleton } from "@mui/material";
import HomeStatsDivider from "../../components/common/HomeStatsDivider";
import Preloader from "../../components/Preloader";

const Home = () => {
  const { loading } = useAppSelector((state) => state.compute);
  return (
    <div className="home-box">
      {loading ? (
        <Preloader />
      ) : (
        // <div
        //   style={{ display: "flex", flexDirection: "column", width: "100%" }}
        // >
        //   <div
        //     className="home-stats-box"
        //     style={{
        //       backgroundImage: `url(${HomeBg})`,
        //       backgroundSize: "cover",
        //       alignItems: "center",
        //     }}
        //   >
        //     <Skeleton height={40} width="80%" sx={{ mr: "20px" }} />
        //     <HomeStatsDivider />
        //     <Skeleton height={40} width="80%" sx={{ mr: "20px" }} />
        //     <HomeStatsDivider />
        //     <Skeleton height={40} width="80%" sx={{ mr: "20px" }} />
        //   </div>
        //   <div style={{ display: "flex", flexDirection: "row" }}>
        //     <Skeleton height={600} width="60%" sx={{ mr: "20px" }} />
        //     <Skeleton height={600} width="40%" sx={{ mr: "20px" }} />
        //   </div>
        // </div>
        <>
          <HomeStats />
          <div className="home-body">
            <div className="home-box-1">
              <Map showMarkers={false} />
            </div>

            <CpuStats />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
