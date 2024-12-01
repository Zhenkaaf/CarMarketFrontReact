import { useParams } from "react-router-dom";
import { useGetCarQuery } from "../../redux/carsApi";
import { Box, Typography, useTheme } from "@mui/material";
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
    <Box
      sx={{
        maxWidth: "1140px",
        width: "100%",
        margin: "auto",
        marginTop: "20px",
        backgroundColor: theme.palette.background.paper,
      }}
    >
      {singleCar && (
        <>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              [theme.breakpoints.down("md")]: {
                flexDirection: "column-reverse",
              },
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Box
                sx={{
                  paddingRight: "15px",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
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
                      sx={{
                        paddingLeft: "10px",
                        paddingTop: "5px",
                      }}
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
                    marginBottom: "10px",
                    paddingLeft: "10px",
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
                    backgroundColor: theme.palette.background.paper,
                    flex: "1 1 auto",
                    display: "flex",
                    flexDirection: "column",
                    borderTop: `1px solid ${theme.palette.secondary.main}`,
                    [theme.breakpoints.down("md")]: {
                      marginRight: "-15px",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      //backgroundColor: theme.palette.background.paper,
                      border: `1px solid ${theme.palette.secondary.main}`,
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
                      //backgroundColor: theme.palette.background.paper,
                      border: `1px solid ${theme.palette.secondary.main}`,
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
                      //backgroundColor: theme.palette.primary.main,
                      border: `1px solid ${theme.palette.secondary.main}`,
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
                      //backgroundColor: theme.palette.primary.main,
                      border: `1px solid ${theme.palette.secondary.main}`,
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
                      //backgroundColor: theme.palette.primary.main,
                      border: `1px solid ${theme.palette.secondary.main}`,
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
                      //backgroundColor: theme.palette.primary.main,
                      border: `1px solid ${theme.palette.secondary.main}`,
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
                      //backgroundColor: theme.palette.primary.main,
                      border: `1px solid ${theme.palette.secondary.main}`,
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
                      //backgroundColor: theme.palette.primary.main,
                      border: `1px solid ${theme.palette.secondary.main}`,
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

                  <Box
                    sx={{
                      //maxHeight: "295px",
                      maxHeight: "250px",
                      lineHeight: 1.26,
                      paddingLeft: "10px",
                      paddingTop: "5px",
                      paddingBottom: "5px",
                      paddingRight: "15px",
                      overflow: "hidden",
                      scrollbarWidth: "thin",
                      borderTop: `1px solid ${theme.palette.secondary.main}`,
                      overflowY: "auto",
                      [theme.breakpoints.down("md")]: {
                        maxHeight: "100%",
                        paddingTop: "15px",
                        marginBottom: "50px",
                      },
                    }}
                  >
                    {singleCar.desc ? singleCar.desc : "Description missing"}
                  </Box>

                  {/* <TextField
                    InputProps={{
                      readOnly: true,
                      disableUnderline: true,
                    }}
                    multiline
                    maxRows={12}
                    variant="standard"
                    value={
                      singleCar.desc ? singleCar.desc : "Description missing"
                    }
                    sx={{
                      lineHeight: 1.26,
                      paddingLeft: "15px",
                      paddingTop: "4px",
                      //paddingRight: "10px",
                      overflow: "hidden",
                      scrollbarWidth: "thin",
                      borderTop: `1px solid ${theme.palette.secondary.main}`,
                      //maxHeight: "260px",
                      overflowY: "auto",
                    }}
                  >
                    {singleCar.desc ? singleCar.desc : "Description missing"}
                  </TextField> */}
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                flex: 3,
                //overflow: "hidden",
                //backgroundColor: theme.palette.background.paper,
              }}
            >
              <Box
                sx={{
                  /*  maxWidth: "1023px",
                  aspectRatio: "10 / 6",
                  margin: "0 auto", */
                  //maxWidth: "1200px",
                  aspectRatio: "9 / 6.52",
                  [theme.breakpoints.down("md")]: {
                    aspectRatio: "9 / 6",
                  },
                }}
              >
                <ImageSlider images={singleCar.photos} />
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default SingleAdvertPage;
