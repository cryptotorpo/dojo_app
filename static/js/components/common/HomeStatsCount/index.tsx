import React, { FC } from "react";

import "./styles.css";
import HomeStatsDivider from "../HomeStatsDivider";

const HomeStatsCount: FC<{
  title1: string;
  title2: string;
  title3: string;
  title4: string;
  title5: string;
  title6: string;
  value1: string;
  value2: string;
  value3: string;
  value4: string;
  value5: string;
  value6: string;
}> = ({
  title1,
  title2,
  value1,
  value2,
  title3,
  title4,
  title5,
  title6,
  value3,
  value4,
  value5,
  value6,
}) => {
  return (
    <>
      <div className="home-stats-sub-box" key={title1}>
        <div key={title1} className="test">
          <div>
            <h3 className="worker-title">{title1}</h3>
          </div>
          <div>
            <h1
              className="worker-stats-value"
              // marginLeft={3}
            >
              {value1}
            </h1>
          </div>
        </div>
        <div key={title2} className="test2">
          <div>
            <h3 className="worker-title">{title2}</h3>
          </div>
          <div>
            <h1 className="worker-stats-value">{value2}</h1>
          </div>
        </div>
      </div>
      <HomeStatsDivider />
      <div className="home-stats-sub-box" key={title1}>
        <div key={title3} className="test">
          <div>
            <h3 className="worker-title">{title3}</h3>
          </div>
          <div>
            <h1
              className="worker-stats-value"
              // marginLeft={3}
            >
              {value3}
            </h1>
          </div>
        </div>
        <div key={title4} className="test2">
          <div>
            <h3 className="worker-title">{title4}</h3>
          </div>
          <div>
            <h1 className="worker-stats-value">{value4}</h1>
          </div>
        </div>
      </div>
      <HomeStatsDivider />
      <div className="home-stats-sub-box" key={title5}>
        <div key={title5} className="test">
          <div>
            <h3 className="worker-title">{title5}</h3>
          </div>
          <div>
            <h1
              className="worker-stats-value"
              // marginLeft={3}
            >
              {value5}
            </h1>
          </div>
        </div>
        <div key={title6} className="test2">
          <div>
            <h3 className="worker-title">{title6}</h3>
          </div>
          <div>
            <h1 className="worker-stats-value">{value6}</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeStatsCount;
