import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useAppDispatch, useAppSelector } from "../../redux/redux-hooks";
import { Link } from "react-router-dom";
import { AccountBox, AddBox } from "@mui/icons-material";
import { logOutAct } from "../../redux/user/userSlice";
import { HEADER_HEIGHT } from "../../constants/constans";
import CustomizedSwitch from "../muiSwitch";
import { useTheme } from "@mui/material";
import { toggleTheme } from "../../redux/theme/themeSlice";
import { setWelcomeToastShown } from "../../redux/toast/toastSlice";

const Header = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userRed.user);
  const theme = useTheme();

  return (
    <Box
      sx={{
        /* marginBottom: "20px", */ width: "100%",
      }}
    >
      <AppBar position="static">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            height: `${HEADER_HEIGHT}px`,
            backgroundColor: "primary.main",
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
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: theme.palette.secondary.light,
                  },
                }}
              >
                CarMarket
              </Typography>
            </Link>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <CustomizedSwitch onChange={() => dispatch(toggleTheme())} />
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
                    }
                    }
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
                      transition: "all 0.3s ease",
                      "&:hover": {
                        color: theme.palette.secondary.light,
                      },
                    }}
                  />
                </Link>
                <Link
                  to="/cabinet"
                  style={{ textDecoration: "none" }}
                >
                  {" "}
                  <AccountBox
                    color="secondary"
                    fontSize="large"
                    sx={{
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
