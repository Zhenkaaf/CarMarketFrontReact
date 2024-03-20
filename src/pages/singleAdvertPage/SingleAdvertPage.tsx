import { useParams } from "react-router-dom";
import { useGetCarQuery } from "../../redux/carsApi";
import { Box, CardContent, Typography } from "@mui/material";
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
import { theme } from "../../theme";

const SingleAdvertPage = () => {
  const IMAGES = [
    {
      url: "https://cdn.riastatic.com/photosnew/auto/photo/samsung_sm6__457907116f.webp",
      alt: "Car One",
    },
    {
      url: "https://i0.rst.ua/oldcars/skoda/octavia/14512686-6.jpg",
      alt: "Car Two",
    },
    {
      url: "https://i0.rst.ua/oldcars/skoda/octavia/14512686-9.jpg",
      alt: "Car Three",
    },
    {
      url: "https://i0.rst.ua/oldcars/skoda/octavia/14512686-11.jpg",
      alt: "Car Four",
    },
    {
      url: "https://i0.rst.ua/oldcars/skoda/octavia/14512686-13.jpg",
      alt: "Car Five",
    },
  ];

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
                  marginBottom: "5px",
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
                    backgroundColor: "#d6f5f1",
                  }}
                >
                  {" "}
                  <MonetizationOnIcon
                    fontSize="large"
                    color="warning"
                  />
                  <Typography
                    variant="h4"
                    color="green"
                    fontWeight={700}
                    sx={{
                      marginLeft: "5px",
                      marginTop: "3px",
                      fontSize: "22px",
                    }}
                  >
                    {singleCar.price}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#d6f5f1",
                  }}
                >
                  <TimeToLeaveIcon
                    fontSize="large"
                    color="warning"
                  />
                  <Typography
                    sx={{
                      marginLeft: "5px",
                      fontSize: "22px",
                    }}
                  >
                    {singleCar.bodyType}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#d6f5f1",
                  }}
                >
                  <LocalGasStationIcon
                    fontSize="large"
                    color="warning"
                  />
                  <Typography sx={{ marginLeft: "5px", fontSize: "22px" }}>
                    {singleCar.fuelType}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#d6f5f1",
                  }}
                >
                  <TodayIcon
                    fontSize="large"
                    color="warning"
                  />
                  <Typography sx={{ marginLeft: "5px", fontSize: "22px" }}>
                    {singleCar.year}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#d6f5f1",
                  }}
                >
                  <SpeedIcon
                    fontSize="large"
                    color="warning"
                  />
                  <Typography
                    sx={{
                      marginLeft: "5px",
                      fontSize: "22px",
                      backgroundColor: "#d6f5f1",
                    }}
                  >
                    {singleCar.mileage} thds.km.
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#d6f5f1",
                  }}
                >
                  <PlaceIcon
                    fontSize="large"
                    color="warning"
                  />
                  <Typography sx={{ marginLeft: "5px", fontSize: "22px" }}>
                    {singleCar.city.length > 20
                      ? singleCar.city.slice(0, 20)
                      : singleCar.city}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#d6f5f1",
                  }}
                >
                  <PhoneInTalkIcon
                    fontSize="large"
                    color="warning"
                  />
                  <Typography sx={{ marginLeft: "5px", fontSize: "22px" }}>
                    {singleCar.user?.phoneNumber}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#d6f5f1",
                  }}
                >
                  <AccountCircleIcon
                    fontSize="large"
                    color="warning"
                  />
                  <Typography sx={{ marginLeft: "5px", fontSize: "22px" }}>
                    {singleCar.user?.name}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  marginTop: "5px",
                  height: "215px",
                  overflow: "hidden",
                  backgroundColor: "#d6f5f1",
                  overflowY: "auto",
                  padding: "5px",
                }}
              >
                <Typography sx={{ lineHeight: 1.3 }}>
                  {singleCar.desc ? singleCar.desc : "Description missing"}
                </Typography>
              </Box>
            </CardContent>
          </Box>
          <Box sx={{ flex: 2, overflow: "hidden", backgroundColor: "#d6f5f1" }}>
            <div
              style={{
                maxWidth: "900px",
                /*    maxWidth: "100%",
                maxHeight: "100%", */
                aspectRatio: "10 / 6",
                margin: "0 auto",
              }}
            >
              <ImageSlider images={IMAGES} />
            </div>
          </Box>
        </Box>
      )}
    </>
  );
};

export default SingleAdvertPage;
