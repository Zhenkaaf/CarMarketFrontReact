import { useParams } from "react-router-dom";
import { useGetCarQuery } from "../../redux/carsApi";
import { Box, CardContent, Typography, useTheme } from "@mui/material";
import Spinner from "../../components/Spinner";
import PlaceIcon from "@mui/icons-material/Place";
import SpeedIcon from "@mui/icons-material/Speed";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import TodayIcon from "@mui/icons-material/Today";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { formattedDate } from "../../helpers/formatDate.helper";
import { ImageSlider } from "../../components/slider/ImageSlider";

const SingleAdvertPage = () => {
  const theme = useTheme();
  const { carId } = useParams<{ carId: string }>();
  const { data: singleCar, isLoading, isError } = useGetCarQuery(carId || "");
  console.log(singleCar);
  if (isLoading) {
    return <Spinner open={isLoading} />;
  }

  if (isError) {
    return (
      <Box sx={{ fontSize: "24px", fontWeight: "bold" }}>
        Something went wrong, unable to fetch car data.
      </Box>
    );
  }

  return (
    <>
      {singleCar && (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            [theme.breakpoints.down("md")]: {
              flexDirection: "column-reverse",
            },
            /*  height: "100%", */
            /*  height: `calc(100vh - ${HEADER_HEIGHT}px)`, */
            /*  backgroundColor: "grey", */
          }}
        >
          <Box sx={{ flex: 1 }}>
            <CardContent
              sx={{
                "&:last-child": {
                  paddingBottom: "0px",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  minWidth: "300px",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight={600}
                  >
                    {singleCar.carMake}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "-5px",
                  }}
                >
                  <Typography
                    sx={{ marginLeft: "5px" }}
                    color="grey"
                    fontSize="14px"
                  >
                    {formattedDate(singleCar.createdAt)}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "9px",
                }}
              >
                <Typography variant="h5">
                  {/*   {singleCar.model} */}
                  {singleCar.model.length > 24
                    ? singleCar.model.slice(0, 24)
                    : singleCar.model}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#e1bee7",
                  }}
                >
                  {" "}
                  <MonetizationOnIcon
                    sx={{ marginLeft: "5px" }}
                    color="secondary"
                  />
                  <Typography
                    variant="h4"
                    color="green"
                    fontWeight={700}
                    sx={{
                      marginTop: "3px",
                      fontSize: "20px",
                      padding: "5px 5px",
                    }}
                  >
                    {singleCar.price}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#e1bee7",
                  }}
                >
                  <TimeToLeaveIcon
                    sx={{ marginLeft: "5px" }}
                    color="secondary"
                  />
                  <Typography
                    sx={{
                      padding: "5px 5px",
                    }}
                  >
                    {singleCar.bodyType}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#e1bee7",
                  }}
                >
                  <LocalGasStationIcon
                    sx={{ marginLeft: "5px" }}
                    color="secondary"
                  />
                  <Typography sx={{ padding: "5px 5px" }}>
                    {singleCar.fuelType}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#e1bee7",
                  }}
                >
                  <TodayIcon
                    sx={{ marginLeft: "5px" }}
                    color="secondary"
                  />
                  <Typography sx={{ padding: "5px 5px" }}>
                    {singleCar.year}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#e1bee7",
                  }}
                >
                  <SpeedIcon
                    sx={{ marginLeft: "5px" }}
                    color="secondary"
                  />
                  <Typography
                    sx={{
                      padding: "5px 5px",
                    }}
                  >
                    {singleCar.mileage} thds.km.
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#e1bee7",
                  }}
                >
                  <PlaceIcon
                    sx={{ marginLeft: "5px" }}
                    color="secondary"
                  />
                  <Typography sx={{ padding: "5px 5px" }}>
                    {singleCar.region}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#e1bee7",
                  }}
                >
                  <PhoneInTalkIcon
                    sx={{ marginLeft: "5px" }}
                    color="secondary"
                  />
                  <Typography sx={{ padding: "5px 5px" }}>
                    {singleCar.user?.phoneNumber}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#e1bee7",
                  }}
                >
                  <AccountCircleIcon
                    sx={{ marginLeft: "5px" }}
                    color="secondary"
                  />
                  <Typography sx={{ padding: "5px 5px" }}>
                    {singleCar.user?.name}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  marginTop: "5px",
                  height: "210px",
                  overflow: "hidden",
                  backgroundColor: "#e1bee7",
                  overflowY: "auto",
                  padding: "5px",
                  [theme.breakpoints.down("md")]: {
                    /*  height: "200px", */
                    marginBottom: "10px",
                  },
                }}
              >
                <Typography sx={{ lineHeight: 1.26 }}>
                  {singleCar.desc ? singleCar.desc : "Description missing"}
                </Typography>
              </Box>
            </CardContent>
          </Box>
          <Box sx={{ flex: 2, overflow: "hidden", backgroundColor: "#e1bee7" }}>
            <Box
              sx={{
                maxWidth: "1023px",
                aspectRatio: "10 / 6",
                margin: "0 auto",
              }}
            >
              <ImageSlider images={singleCar.photos} />
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default SingleAdvertPage;
