import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppDispatch, useAppSelector } from "../../redux/redux-hooks";
import { Link } from "react-router-dom";
import { PermIdentity, AddCircle } from "@mui/icons-material";
import { logOutAct } from "../../redux/user/userSlice";

const Header = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userRed.user);

  return (
    <Box sx={{ marginBottom: "20px", width: "100%" }}>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
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
              >
                CarMarket
              </Typography>
            </Link>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {user ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Link
                  to="/cabinet"
                  style={{ textDecoration: "none" }}
                >
                  {" "}
                  <PermIdentity color="secondary" />
                </Link>
                <Link
                  to="/post-advert"
                  style={{ textDecoration: "none" }}
                >
                  {" "}
                  <AddCircle color="secondary" />
                </Link>
                <Link
                  to="/"
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    onClick={() => dispatch(logOutAct())}
                    color="secondary"
                  >
                    Logout
                  </Button>
                </Link>
              </Box>
            ) : (
              <Link
                to="/login"
                style={{ textDecoration: "none" }}
              >
                <Button color="secondary">Login</Button>
              </Link>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
