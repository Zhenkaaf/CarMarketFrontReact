import { useParams } from "react-router-dom";
import { useGetCarQuery } from "../../redux/carsApi";
import { Box, CardContent, CardMedia, Typography } from "@mui/material";
import Spinner from "../../components/Spinner";
import CarItem from "../../components/CarItem";
import { theme } from "../../theme";
import PlaceIcon from "@mui/icons-material/Place";
import SpeedIcon from "@mui/icons-material/Speed";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import { formattedDate } from "../../helpers/formatDate.helper";
import SimpleSlider from "../../components/Carousel";

const SingleAdvertPage = () => {
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
        <Box sx={{ display: "flex", width: "100%" }}>
          <Box sx={{ backgroundColor: "orange", flex: 1 }}>
            <CardContent
              sx={{
                padding: "20px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight={600}
                  >
                    {singleCar.carMake.length > 15
                      ? singleCar.carMake.slice(0, 15) + "..."
                      : singleCar.carMake}{" "}
                    {singleCar.year}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "-5px",
                  }}
                >
                  <QueryBuilderIcon
                    fontSize="small"
                    color="warning"
                    sx={{ marginTop: "-3px" }}
                  />
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
                <Typography
                  variant="h4"
                  color="green"
                  fontWeight={700}
                >
                  {singleCar.price} $
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
                  }}
                >
                  <TimeToLeaveIcon
                    fontSize="large"
                    color="warning"
                  />
                  <Typography sx={{ marginLeft: "5px", fontSize: "22px" }}>
                    {singleCar.bodyType}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <SpeedIcon
                    fontSize="large"
                    color="warning"
                  />
                  <Typography sx={{ marginLeft: "5px", fontSize: "22px" }}>
                    {singleCar.mileage} {/* thds. */} km.
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
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
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <PlaceIcon
                    fontSize="large"
                    color="warning"
                  />
                  <Typography sx={{ marginLeft: "5px", fontSize: "22px" }}>
                    {singleCar.city}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  marginTop: "5px",
                  maxHeight: "82px",
                  overflow: "hidden",
                }}
              >
                <Typography sx={{ lineHeight: 1.3 }}>
                  {singleCar.desc}
                  {/*  {desc.length > 250 ? desc.slice(0, 250) + "..." : desc} */}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <PhoneInTalkIcon
                  fontSize="large"
                  color="warning"
                />
                <Typography sx={{ marginLeft: "5px", fontSize: "22px" }}>
                  {singleCar.user?.phoneNumber}
                </Typography>
                <Typography sx={{ marginLeft: "15px", fontSize: "22px" }}>
                  {singleCar.user?.name}
                </Typography>
              </Box>
            </CardContent>
          </Box>
          <Box sx={{ backgroundColor: "green", flex: 2, height: "500px" }}>
            {" "}
            <CardMedia
              component="img"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                [theme.breakpoints.down("sm")]: {
                  height: "250px",
                  marginBottom: "10px",
                },
              }}
              image="https://cdn0.riastatic.com/photosnew/auto/photo/dacia_logan-mcv__535291690hd.webp"
              title="Dacia Logan 2008"
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default SingleAdvertPage;
