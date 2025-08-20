import { FC } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import Navbar from "../components/Navbar";
import Login from "../pages/Login";
import { Box } from "@mui/material";
import { HeroBackground } from "../assets";
import Workers from "../pages/workers";
import Footer from "../components/Footer";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import NetworkMap from "../pages/NetworkMap";
import Clusters from "../pages/Clusters";
import { useSelector } from "react-redux";
import { useAppSelector } from "../redux/configureStore";
import useApp from "../hooks/useApp";

import { HeroBgMovie } from "../assets";

import LandingScreen from "../pages/LandingScreen";
import WaitList from "../pages/WaitList";

const AppRoutes: FC = () => {
  const { isLoggedIn } = useAppSelector((state) => state.user);

  return (
    <Routes>
      {/* <Route path='/' element={<LandingScreen />} /> */}
      {/* <Route path="/" element={isLoggedIn ? <Home /> : <Login />} /> */}
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      {/* <Route path='/workers' element={<Workers />} /> */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/network-map" element={<NetworkMap />} />
      <Route path="/clusters" element={<Clusters />} />
      <Route path="/waitlist" element={<WaitList />} />
      <Route path="/landing" element={<LandingScreen />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

const AppRouter: FC = () => {
  const location = useLocation();
  const currentRoute = location.pathname;
  const { isLoggedIn } = useAppSelector((state) => state.user);
  const { loading } = useAppSelector((state) => state.compute);

  useApp();

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: currentRoute !== "/clusters" ? "100vh" : "max-content",
      }}
    >
      {currentRoute === "/landing" && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            overflow: "hidden",
            zIndex: -1,
          }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              top: 0,
              left: 0,
            }}
          >
            <source src={HeroBgMovie} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <Box
            component="img"
            src={HeroBackground}
            alt="SVG Overlay"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              backgroundColor: "rgba(0, 0, 0, 0.8)",
            }}
          />
        </Box>
      )}

      {!loading && <Navbar />}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          position: "relative",
          zIndex: 1,
          paddingBottom: currentRoute !== "/clusters" ? "70px" : "0px",
        }}
      >
        <AppRoutes />
      </Box>
    </Box>
  );
};

const MainApp: FC = () => {
  return (
    <Router>
      <AppRouter />
      <Footer />
    </Router>
  );
};

export default MainApp;
