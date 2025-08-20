import {
  Box,
  Button,
  Typography,
  styled,
  useMediaQuery,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import { BigCard, DojoCompute, GoogleIcon, TeamIcon } from "../../assets";
import GradientBorder from "../../components/common/GradientBorder";
import { useEffect, useState } from "react";
import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import { useAppDispatch, useAppSelector } from "../../redux/configureStore";
import axios from "axios";
import { devServerUrl } from "../../utils";
import { setIsLoggedIn, setUserInfo } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const GoogleButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  padding: "22px, 40px, 22px, 48px",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  backgroundColor: "rgba(255, 255, 255, 1)",
  color: "rgba(0, 0, 0, 1)",
  fontFamily: "ProximaNovaRegular",
  fontSize: "18px",
  fontWeight: 600,
  width: "387px",
  minWidth: "auto",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  [theme.breakpoints.down("sm")]: {
    width: "auto",
  },
}));

const GIcon = styled("img")({
  width: "20px",
  height: "20px",
});

const Login = () => {
  const isDown800 = useMediaQuery("(max-width:800px)");
  const [user, setUser] = useState<TokenResponse>();
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const signinWithGoogle = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    (async () => {
      if (user) {
        try {
          setLoading(true);
          const { data } = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
            {
              headers: {
                Authorization: `Bearer ${user.access_token}`,
                Accept: "application/json",
              },
            }
          );

          console.log(data);

          await axios.post(devServerUrl + "email", {
            name: data.name,
            email: data.email,
          });

          setLoading(false);
          dispatch(setIsLoggedIn(true));
          dispatch(
            setUserInfo({
              name: data.name,
              email: data.email,
              profilePicture: data.picture,
            })
          );
          navigate("/waitlist");
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      }
    })();
  }, [user]);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "20px",
        paddingBottom: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isDown800 ? "column-reverse" : "row",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundImage: `url(${BigCard})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          padding: "20px",
          margin: "1px",
          gap: "36px",
          maxWidth: "1187px",
        }}
      >
        {
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
              gap: "36px",
              maxWidth: "468px",
            }}
          >
            {loading ? (
              <CircularProgress
                sx={{
                  color: "rgba(255, 255, 255, 1)",
                }}
              />
            ) : (
              <GoogleButton
                variant="contained"
                onClick={() => {
                  setLoading(true);
                  signinWithGoogle();
                }}
              >
                <GIcon src={GoogleIcon} alt="Google logo" />
                Sign in with Google
              </GoogleButton>
            )}

            <Typography
              sx={{
                fontFamily: "ProximaNovaRegular",
                color: "rgba(148,152,156,1)",
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "22.4px",
                textAlign: "center",
                paddingX: "40px",
              }}
            >
              Create your account with Dojo Compute and unlock industry-leading
              decentralized compute power. By proceeding, you confirm your
              acceptance of our Terms and Conditions and acknowledge the Privacy
              Notice provided by Dojo Compute.
            </Typography>
          </Box>
        }

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <img
            src={DojoCompute}
            alt="Dojo Compute"
            style={{ width: "100%", height: "auto" }}
            loading="lazy"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
