import { Popover } from "@mui/material";
import React, { FC } from "react";
import { HomeBg, LogoutIcon, ProfileIcon } from "../../../assets";
import { useAppDispatch, useAppSelector } from "../../../redux/configureStore";
import { setIsLoggedIn, setUserInfo } from "../../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const MenuBox: FC<{
  id: "simple-popover" | undefined;
  open: boolean;
  anchorEl: any;
  handleClose: () => void;
}> = ({ id, open, anchorEl, handleClose }) => {
  const { profilePicture, name, email } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    handleClose();
    dispatch(
      setUserInfo({
        name: "",
        email: "",
        profilePicture: "",
      })
    );

    dispatch(setIsLoggedIn(false));

    navigate("/login");
  };

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <div
        style={{
          backgroundImage: `url(${HomeBg})`,
          backgroundSize: "cover",
          flexDirection: "column",

          cursor: "pointer",
          background: "black",
          width: 440,
        }}
        className="home-stats-box"
      >
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",

              borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
              paddingBottom: 20,
            }}
          >
            <img
              src={profilePicture || ProfileIcon}
              style={{ height: 50, width: 50, borderRadius: 50 }}
            />
            <div
              style={{ marginLeft: 20 }}
              onClick={() => {
                navigate("/waitlist");
                handleClose();
              }}
            >
              <p style={{ fontSize: 18, fontWeight: "bold" }}>{name}</p>
              <p style={{ fontSize: 12, color: "rgba(209, 209, 209, 1)" }}>
                {email}
              </p>
            </div>
          </div>
        </div>

        <div
          style={{
            background: "rgba(255, 255, 255, 0.06)",
            borderRadius: 32,
            padding: 10,
            display: "flex",
            flexDirection: "row",
            marginTop: 20,
          }}
          onClick={handleLogout}
        >
          <img src={LogoutIcon} alt="" />
          <p
            style={{
              color: "rgba(255, 80, 74, 1)",
              fontSize: 18,
              marginLeft: 5,
            }}
          >
            Sign Out
          </p>
        </div>
      </div>
    </Popover>
  );
};

export default MenuBox;
