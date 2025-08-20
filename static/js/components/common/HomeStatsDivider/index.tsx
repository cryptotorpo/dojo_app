import React, { FC } from "react";

import "./styles.css";

const HomeStatsDivider: FC<{ style?: {} }> = ({ style = {} }) => {
  return <div className="divider" style={{ ...style }}></div>;
};

export default HomeStatsDivider;
