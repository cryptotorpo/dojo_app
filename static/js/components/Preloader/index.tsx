import React, { useEffect, useState } from "react";
import { DojoPreloader } from "../../assets";

const Preloader: React.FC = () => {
  // const [loading, setLoading] = useState(true)
  // useEffect(() => {
  //   const handleLoad = () => setLoading(false)
  //   const id = setTimeout(handleLoad, 3000)

  //   return () => clearTimeout(id)
  // }, [])

  return (
    <>
      {/* {loading && ( */}
      <div style={preloaderStyles}>
        <video autoPlay loop muted playsInline style={videoStyles}>
          <source src={DojoPreloader} type={"video/mp4"} />
        </video>
      </div>
      {/* )} */}
    </>
  );
};

const preloaderStyles: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "black",
  zIndex: 9999,
  padding: "10px",
  boxSizing: "border-box",
};

const videoStyles: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "contain",
  maxWidth: "100%",
  maxHeight: "100%",
};

export default Preloader;
