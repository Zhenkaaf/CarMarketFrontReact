import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useAppDispatch, useAppSelector } from "../../redux/redux-hooks";
import { Link } from "react-router-dom";
import { AccountBox, AddBox } from "@mui/icons-material";
import { logOutAct } from "../../redux/user/userSlice";
import { HEADER_HEIGHT } from "../../constants/constans";
import { useTheme } from "@mui/material";
import { toggleTheme } from "../../redux/theme/themeSlice";
import { setWelcomeToastShown } from "../../redux/toast/toastSlice";
import light from "./../../assets/light.png";
import lightGreen from "./../../assets/lightGreen.png";

const Header = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userRed.user);
  const theme = useTheme();
  const isDarkTheme = useAppSelector((state) => state.themeRed.isDarkTheme);


  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <AppBar
        position="static"
        sx={{
          padding: "0px 20px",
          backgroundColor: theme.palette.background.paper,
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.00), rgba(255, 255, 255, 0.00))",
        }}
      >
        <Toolbar
          sx={{
            height: `${HEADER_HEIGHT}px`,
            backgroundColor: theme.palette.background.paper,
            maxWidth: "1140px",
            margin: "auto",
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/*  <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>{" "} */}
          <Box>
            <Link
              to="/"
              style={{ textDecoration: "none" }}
            >
              <Typography
                variant="h5"
                color="secondary"
                fontWeight={700}
                sx={{
                  marginLeft: "-24px",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: theme.palette.secondary.light,
                  },
                  /*   "@media (min-width: 1180px)": {
                    marginLeft: "-24px",
                  }, */
                }}
              >
                CarMarket
              </Typography>


            </Link>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginRight: "-24px",
              /*  "@media (min-width: 1180px)": {
                marginRight: "-28px",
              }, */
            }}
          >

            <Box
              onClick={() => { dispatch(toggleTheme()) }}
              sx={{
                width: "26px",
                height: "26px",
                margin: "-2px 5px 0px 10px",
                cursor: "pointer",
                backgroundColor: theme.palette.secondary.main,
                borderRadius: "2px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "1.5px",
                "&:hover": {
                  backgroundColor: theme.palette.secondary.light,
                },
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(${isDarkTheme ? light : lightGreen})`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              />
            </Box>

            {user ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Link
                  to="/"
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    onClick={() => {
                      dispatch(logOutAct());
                      dispatch(setWelcomeToastShown(false));
                    }}
                    color="secondary"
                    sx={{
                      textTransform: "uppercase",
                      fontWeight: "700",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        color: theme.palette.secondary.light,
                      },
                    }}
                  >
                    Logout
                  </Typography>
                </Link>
                <Link
                  to="/post-advert"
                  style={{ textDecoration: "none" }}
                >
                  {" "}
                  <AddBox
                    color="secondary"
                    fontSize="large"
                    sx={{
                      marginBottom: "-5px",

                      transition: "all 0.3s ease",
                      "&:hover": {
                        color: theme.palette.secondary.light,
                      },
                    }}
                  />
                </Link>
                {/*  <Box onClick={() => { handleClick(); dispatch(toggleTheme()) }} sx={{
                  width: "26px", height: "26px", marginTop: "-2px", cursor: "pointer", "&:hover": {
                    backgroundColor: theme.palette.secondary.light,
                  },
                }}>
                  <img src={isWhiteBg ? lightGr : lightImg} alt="" style={{
                    padding: "1px",
                    borderRadius: "2px",
                    backgroundColor: "#da3b00",
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }} />
                </Box> */}


                <Link
                  to="/cabinet"
                  style={{ textDecoration: "none" }}
                >
                  {" "}

                  <AccountBox
                    color="secondary"
                    fontSize="large"
                    sx={{
                      marginBottom: "-5px",
                      marginRight: "-5px",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        color: theme.palette.secondary.light,
                      },
                    }}
                  />
                </Link>
              </Box>
            ) : (
              <Link
                to="/login"
                style={{ textDecoration: "none" }}
              >
                <Typography
                  color="secondary"
                  sx={{
                    textTransform: "uppercase",
                    fontWeight: "700",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      color: theme.palette.secondary.light,
                    },
                  }}
                >
                  Login
                </Typography>
              </Link>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
