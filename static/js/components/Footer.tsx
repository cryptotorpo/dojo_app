import React from "react";
import { Box, Link, Typography, useMediaQuery } from "@mui/material";
import { DojoGrey, XIcon, DiscordIcon, TelegramIcon } from "../assets";
import SouthEastIcon from "@mui/icons-material/SouthEast";
import { useNavigate } from "react-router-dom";

const Footer: React.FC = () => {
  const contacts = [
    {
      name: "X",
      link: "https://x.com/dojoai_erc20",
      icon: XIcon,
    },
    {
      name: "Telegram",
      link: "https://t.me/dojoai_erc20",
      icon: TelegramIcon,
    },
    {
      name: "Telegram",
      link: "https://t.me/dojoProtocol",
      icon: TelegramIcon,
    },
  ];

  const footerLinks = [
    {
      name: "AI",
      link: "https://dojoprotocol.com",
    },
    {
      name: "VPN",
      link: "https://dojoprotocol.com",
    },
    {
      name: "Docs",
      link: "https://docs.dojoai.ink",
    },
    {
      name: "Stake",
      link: "https://staking.dojoai.ink",
    },
    {
      name: "Dashboard",
      link: "/",
    },
  ];

  const isDown1000 = useMediaQuery("(max-width:1000px)");
  const isDown800 = useMediaQuery("(max-width:800px)");
  const isDown450 = useMediaQuery("(max-width:450px)");
  const navigate = useNavigate();

  return (
    <footer
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          maxWidth: "100%",
          width: "100%",
          borderTop: "1px solid #14171A",
          paddingY: "100px",
          paddingBottom: isDown1000 ? "16px" : "140px",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          gap={isDown1000 ? "70px" : "16px"}
          flexDirection={isDown1000 ? "column" : "row"}
          px="20px"
          maxWidth={"1200px"}
          alignItems={"center"}
          alignSelf={"center"}
          width={"100%"}
        >
          <Box
            sx={{
              flex: 1,
              width: "100%",
              textAlign: isDown1000 ? "center" : "start",
            }}
          >
            <img
              src={DojoGrey}
              alt="Logo"
              style={{
                height: "50px",
                width: "145px",
              }}
            />
          </Box>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: isDown800 ? "column" : "row",
              gap: "50px",
              justifyContent: isDown1000 ? "space-around" : "end",
            }}
          >
            <Box
              display={"flex"}
              sx={{
                flexDirection: "row",
                gap: isDown450 ? "12px" : "50px",
              }}
            >
              {footerLinks.map((link, index) => (
                <Box
                  key={index}
                  sx={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    link.link.includes("http")
                      ? window.open(link.link, "_blank")
                      : navigate(link.link);
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Roboto",
                      fontWeight: 500,
                      fontSize: isDown1000 ? "12px" : "18px",
                      lineHeight: isDown1000 ? "12px" : "22px",
                      color:
                        link.name === "AI" || link.name === "VPN"
                          ? "rgb(211, 211, 211,0.2)"
                          : "#94989C",
                    }}
                  >
                    {link.name}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Box
              display="flex"
              flexDirection={"row"}
              gap={"32px"}
              paddingLeft={"30px"}
              alignSelf={"center"}
            >
              {contacts.map((contact, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    cursor: "pointer",
                  }}
                  onClick={() => window.open(contact.link, "_blank")}
                >
                  <img
                    src={contact.icon}
                    alt={contact.name}
                    style={{
                      height: isDown1000 ? "14px" : "32px",
                      width: isDown1000 ? "14px" : "32px",
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          borderTop: "1px solid #14171A",
          maxWidth: "1200px",
          display: "flex",
          justifyContent: "space-between",
          py: "48px",
          mx: "5%",
          width: "100%",
          alignSelf: "center",
          px: isDown1000 ? "5%" : "0px",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Roboto",
            fontWeight: 300,
            fontSize: isDown800 ? "10px" : "15px",
            lineHeight: "22.5px",
            color: "#94989C",
            textAlign: "left",
            width: "100%",
          }}
        >
          Dojo GPU © 2025. All rights reserved.
        </Typography>

        {/* <Box
          gap={'16px'}
          display={'flex'}
          width={'100%'}
          justifyContent={'flex-end'}
        >
          <Link
            fontSize={isDown800 ? 10 : 15}
            fontWeight={300}
            lineHeight={isDown800 ? '14px' : '22px'}
            fontFamily={'Roboto'}
            color={'#94989C'}
            href={'/terms-of-service'}
            target='_blank'
            rel='noopener noreferrer'
            sx={{
              textDecoration: 'none',
              textWrap: 'pretty',
              '&:hover': {
                fontWeight: 500,
              },
            }}
          >
            Terms & Conditions
            <SouthEastIcon
              sx={{
                fontSize: 'small',
                verticalAlign: 'middle',
                marginLeft: '3px',
              }}
            />
          </Link>
          <Link
            fontSize={isDown800 ? 10 : 15}
            fontWeight={300}
            lineHeight={isDown800 ? '14px' : '22px'}
            fontFamily={'Roboto'}
            color={'#94989C'}
            href={'/privacy-policy'}
            target='_blank'
            rel='noopener noreferrer'
            sx={{
              textDecoration: 'none',
              '&:hover': {
                fontWeight: 500,
              },
            }}
          >
            Privacy Policy
            <SouthEastIcon
              sx={{
                fontSize: 'small',
                verticalAlign: 'middle',
                marginLeft: '3px',
              }}
            />
          </Link>
        </Box> */}
      </Box>
    </footer>
  );
};

export default Footer;
