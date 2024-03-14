import { FC } from "react";
import img from "./../assets/lock.jpg";
import { useAppSelector } from "../redux/redux-hooks";
import { Box, CardContent, CardMedia, Typography } from "@mui/material";
import Spinner from "./Spinner";
import { getTokenFromLocalStorage } from "../helpers/localStorage.helper";

interface Props {
  children: JSX.Element;
}

export const ProtectedRoute: FC<Props> = ({ children }) => {
  const isUserAuth = useAppSelector((state) => state.userRed.isUserAuth);
  const waitingForProfile = useAppSelector(
    (state) => state.userRed.waitingForProfile
  );

  if (waitingForProfile && Boolean(getTokenFromLocalStorage())) {
    return <Spinner open={waitingForProfile} />;
  }

  return (
    <>
      {isUserAuth ? (
        children
      ) : (
        <Box maxWidth="sm">
          <CardContent>
            <Typography
              variant="h4"
              align="center"
            >
              To view this page you must be logged in.
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{
              width: "100%",
              height: "400px",
              objectFit: "contain",
            }}
            src={img}
            loading="lazy"
            title="Lock"
          />
        </Box>
      )}
    </>
  );
};
