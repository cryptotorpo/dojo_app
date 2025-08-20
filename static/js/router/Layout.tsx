import React, { FC, useState, useEffect } from "react";
import AppRoutes from ".";
import { useMediaQuery } from "@mui/material";
import Preloader from "../components/Preloader";

const AppLayout: FC = () => {
  const [loading, setLoading] = useState(true);
  const isDown1000 = useMediaQuery("(max-width:1000px)");

  // useEffect(() => {
  //   const timer = setTimeout(() => setLoading(false), 3000)
  //   return () => clearTimeout(timer)
  // }, [])

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <AppRoutes />
    </div>
  );
};

export default AppLayout;
