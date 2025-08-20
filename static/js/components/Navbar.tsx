import { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Toolbar,
  Button,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Close from "@mui/icons-material/Close";
import { Menu, DojoLogo, ProfileIcon, HomeBg, LogoutIcon } from "../assets";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/configureStore";
import MenuBox from "./common/MenuBox";

interface NavItem {
  name: string;
  activeFontColor: string;
  fontWeight: number;
  fontSize: string;
  activeFontFamily: string;
  fontFamily: string;
  url?: string;
  id: string;
}

const navItemsLanding = [
  {
    name: "AI",
    activeFontColor: "rgba(134, 60, 255, 1)",
    fontWeight: 500,
    fontSize: "18px",
    activeFontFamily: "Roboto",
    fontFamily: "Roboto",
    url: "https://dojoprotocol.com/chatAi",
    id: "ai",
  },
  {
    name: "VPN",
    activeFontColor: "rgba(134, 60, 255, 1)",
    fontWeight: 500,
    fontSize: "18px",
    activeFontFamily: "Roboto",
    fontFamily: "Roboto",
    url: "https://dojoprotocol.com/signup",
    id: "vpn",
  },
  {
    name: "Docs",
    activeFontColor: "rgba(134, 60, 255, 1)",
    fontWeight: 500,
    fontSize: "18px",
    activeFontFamily: "Roboto",
    fontFamily: "Roboto",
    url: "https://docs.dojoai.ink",
    id: "docs",
  },
  {
    name: "Stake",
    activeFontColor: "rgba(134, 60, 255, 1)",
    fontWeight: 500,
    fontSize: "18px",
    activeFontFamily: "Roboto",
    fontFamily: "Roboto",
    url: "https://dojoprotocol.com/stake",
    id: "stake",
  },
  {
    name: "Dashboard",
    activeFontColor: "rgba(134, 60, 255, 1)",
    fontWeight: 500,
    fontSize: "18px",
    activeFontFamily: "Roboto",
    fontFamily: "Roboto",
    id: "home",
  },
] as NavItem[];

const navItems = [
  {
    name: "Home",
    activeFontColor: "rgba(134, 60, 255, 1)",
    fontWeight: 500,
    fontSize: "18px",
    activeFontFamily: "Roboto",
    fontFamily: "Roboto",
    id: "",
  },
  {
    name: "Network Map",
    activeFontColor: "rgba(134, 60, 255, 1)",
    fontWeight: 500,
    fontSize: "18px",
    activeFontFamily: "Roboto",
    fontFamily: "Roboto",
    id: "network-map",
  },
  {
    name: "Dashboard",
    activeFontColor: "rgba(134, 60, 255, 1)",
    fontWeight: 500,
    fontSize: "18px",
    activeFontFamily: "Roboto",
    fontFamily: "Roboto",
    id: "dashboard",
  },
  {
    name: "Clusters",
    activeFontColor: "rgba(134, 60, 255, 1)",
    fontWeight: 500,
    fontSize: "18px",
    activeFontFamily: "Roboto",
    fontFamily: "Roboto",
    id: "clusters",
  },
  // {
  //   name: 'Workers',
  //   activeFontColor: 'rgba(134, 60, 255, 1)',
  //   fontWeight: 500,
  //   fontSize: '18px',
  //   activeFontFamily: 'Roboto',
  //   fontFamily: 'Roboto',
  //   id: 'workers',
  // },
] as NavItem[];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isDown1000 = useMediaQuery("(max-width:1000px)");
  const isDown600 = useMediaQuery("(max-width:600px)");
  const isDown380 = useMediaQuery("(max-width:380px)");
  const location = useLocation();
  const navigate = useNavigate();
  const currentRoute = location.pathname;
  const [activeItem, setActiveItem] = useState(
    currentRoute === "/login" ? "" : "Home"
    // currentRoute === '/' || currentRoute === '/login' ? '' : 'Home' //removing landing page
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const { isLoggedIn } = useAppSelector((state) => state.user);

  const handleClick = (event: any) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const { profilePicture } = useAppSelector((state) => state.user);
  useEffect(() => {
    const routeToNameMap: Record<string, string> = {
      "/": "Home",
      "/home": "Home",
      "/network-map": "Network Map",
      "/dashboard": "Dashboard",
      "/clusters": "Clusters",
    };

    const storedActiveTab = routeToNameMap[currentRoute] || "";
    setActiveItem(storedActiveTab);
  }, [currentRoute]);

  // useEffect(() => {
  //   let storedActiveTab = localStorage.getItem('activeTab')
  //   // if (currentRoute === '/' || currentRoute === '/login') {
  //   //   storedActiveTab = ''
  //   // } else if (!storedActiveTab || storedActiveTab === '/home') {
  //   //   storedActiveTab = 'Home'
  //   // }

  //   if (
  //     storedActiveTab === '/home' ||
  //     currentRoute === '/' ||
  //     currentRoute === '/home'
  //   ) {
  //     storedActiveTab = 'Home'
  //   } else {
  //     storedActiveTab = ''
  //   }

  //   setActiveItem(storedActiveTab)
  // }, [currentRoute])  //removing landing page

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavItemClick = (itemName: string, itemId: string) => {
    if (itemId.includes("https")) {
      window.open(itemId, "_blank");
      return;
    }

    // if (itemName === 'Dashboard' && itemId === 'home') {
    //   setActiveItem('Home')
    //   localStorage.setItem('activeTab', 'Home')
    // } else if (currentRoute === '/' && itemName === 'Dashboard') {
    //   setActiveItem('Home')
    //   localStorage.setItem('activeTab', 'Home')
    // } else {
    //   setActiveItem(itemName)
    //   localStorage.setItem('activeTab', itemName)
    // } //removing landing page

    setActiveItem(itemName);
    localStorage.setItem("activeTab", itemName);

    if (isDown1000) {
      setMobileOpen(false);
    }
    navigate(itemId);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: "center",
        marginTop: "16px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          position: "absolute",
          justifyContent: "end",
          width: "100%",
        }}
      >
        <Box
          sx={{
            marginRight: 5,
          }}
        >
          <IconButton
            onClick={(e) => {
              // e.stopPropagation();
              handleDrawerToggle();
            }}
          >
            <Close sx={{ color: "#ffffff" }} />
          </IconButton>
        </Box>
      </Box>

      <List
        sx={{
          marginTop: "50px",
        }}
      >
        {navItems
          // currentRoute === '/' || currentRoute === '/login'
          // ? navItemsLanding
          // : //removing landing page
          .map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton
                sx={{
                  textAlign: "left",
                  paddingLeft: "10%",
                  paddingY: "30px",
                  gap: "4px",
                  justifyContent: isDown1000 ? "center" : "flex-start",
                  borderBottom: "1px solid #282828",
                  marginX: "16px",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleNavItemClick(item.name, item?.url || item.id);
                }}
              >
                {/* <Tooltip title={item.name} placement='top' enterTouchDelay={0}> */}
                <Typography
                  fontSize={"18px"}
                  fontWeight={500}
                  lineHeight={"21px"}
                  fontFamily="Roboto"
                  color={
                    activeItem !== item.name
                      ? "rgba(255, 255, 255, 0.8)"
                      : "#FFFFFF"
                  }
                >
                  {item.name}
                </Typography>
                {/* </Tooltip> */}
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        width: "calc(100% - 8px)",
        paddingRight: isDown1000 ? "20px" : "2%",
        paddingLeft: isDown1000 ? "10px" : "2%",
        height: "100px",
        alignItems: "center",
        maxWidth: isDown1000 ? "100%" : "90%",
      }}
    >
      <AppBar
        component="nav"
        sx={{
          background: scrolled ? "rgba(0, 0, 0, 0.6)" : "transparent",
          boxShadow: scrolled ? "0 4px 12px rgba(0, 0, 0, 0.15)" : "none",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          transition: "background 0.3s, box-shadow 0.3s, backdrop-filter 0.3s",
          width: "100%",
        }}
        position="fixed"
      >
        <Toolbar sx={{ px: isDown1000 ? "20px" : "0px" }}>
          <Box
            sx={{
              flexGrow: 1,
              display: { md: "block" },
              WebkitWritingMode: "vertical-lr",
            }}
          >
            <img
              src={DojoLogo}
              alt="Logo"
              style={{
                height: isDown1000 ? "50px" : "85px",
                maxWidth: isDown380 ? "100px" : isDown1000 ? "135px" : "150px",
                cursor: "pointer",
                display: mobileOpen ? "none" : "flex",
              }}
              onClick={() => {
                navigate("/");
                localStorage.setItem("activeTab", "Home");
                setActiveItem("Home");
              }}
            />
          </Box>
          <Box
            sx={{
              display: isDown1000 ? "none" : "flex",
              gap: "60px",
              flexGrow: 1,
            }}
          >
            {navItems
              // currentRoute === '/' || currentRoute === '/login'
              // ? navItemsLanding
              // : //removing landing page
              .map((item) => (
                <Button
                  key={item.name}
                  onClick={() => {
                    handleNavItemClick(item.name, item?.url || item.id);
                  }}
                  sx={{
                    textTransform: "none",
                    cursor: "pointer",
                    alignItems: "center",
                    paddingX: "10px",
                    paddingTop: "10px",
                    paddingBottom: "5px",
                    borderRadius: "8px",
                    "&:hover": {
                      backgroundColor: "#5f616540",
                    },
                  }}
                  disableRipple
                >
                  <Typography
                    fontSize={"18px"}
                    fontWeight={500}
                    lineHeight={"21px"}
                    fontFamily="Roboto"
                    color={
                      activeItem !== item.name
                        ? "rgba(255, 255, 255, 0.8)"
                        : "#FFFFFF"
                    }
                    style={{
                      borderBottom:
                        activeItem === item.name
                          ? "1px solid rgba(255, 255, 255, 0.2)"
                          : "0px solid rgba(255, 255, 255, 0.2)",
                      paddingBottom: "6px",
                    }}
                  >
                    {item.name}
                  </Typography>
                </Button>
              ))}
          </Box>
          <Box
            sx={{
              marginRight: isDown1000 ? "10px" : "0px",
              display: mobileOpen ? "none" : "flex",
            }}
          >
            <IconButton onClick={handleClick} id="popover">
              <img
                src={profilePicture || ProfileIcon}
                alt="Profile"
                style={{ height: 50, width: 50, borderRadius: 50 }}
              />
            </IconButton>

            {anchorEl && (
              <MenuBox
                anchorEl={anchorEl}
                handleClose={handleClose}
                id={id}
                open={open}
              />
            )}
          </Box>

          <IconButton
            color="inherit"
            onClick={handleDrawerToggle}
            sx={{
              display: isDown1000 ? "block" : "none",
              visibility: mobileOpen ? "hidden" : "visible",
            }}
          >
            <img
              src={Menu}
              alt="Menu"
              style={{ width: "24px", height: "24px" }}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* <Box component="nav"> */}
      {mobileOpen && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            // right: "300px", // Adjust width as needed
            width: "100%",
            height: "100vh",
            backgroundColor: "black", // Semi-transparent background

            zIndex: 1300, // Higher z-index to overlay content
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "16px",
          }}
        >
          {drawer}
        </Box>
      )}
      {/* </Box> */}
    </Box>
  );
};

export default Navbar;
