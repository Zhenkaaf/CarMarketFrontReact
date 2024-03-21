import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { theme } from "../theme";
import { timePassed } from "../helpers/formatDate.helper";
import PlaceIcon from "@mui/icons-material/Place";
import SpeedIcon from "@mui/icons-material/Speed";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import TodayIcon from "@mui/icons-material/Today";
import { ICar } from "./../types";

/* const CarItem: React.FC<{ car: ICar }> = ({ car }) => { */
const CarItem = ({ car }: { car: ICar }) => {
  return (
    <Card
      key={car.carId}
      sx={{
        height: "250px",
        display: "flex",
        backgroundColor: "#d6f5f1",
        padding: "20px",
        marginBottom: "15px",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "scale(1.05)",
        },
        [theme.breakpoints.down("sm")]: {
          flexDirection: "column",
          height: "auto",
          padding: "0px",
        },
      }}
    >
      <Box
        sx={{
          flex: 1,
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            [theme.breakpoints.down("sm")]: {
              height: "250px",
              marginBottom: "10px",
            },
          }}
          image="https://cdn0.riastatic.com/photosnew/auto/photo/dacia_logan-mcv__535291690hd.webp"
          title="Dacia Logan 2008"
        />
      </Box>

      <CardContent
        sx={{
          flex: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "0px 0px 0px 20px",
          "&:last-child": {
            paddingBottom: "0px",
          },
          [theme.breakpoints.down("sm")]: {
            paddingRight: "20px",
            "&:last-child": {
              paddingBottom: "20px",
            },
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            [theme.breakpoints.down("sm")]: {
              marginBottom: "10px",
            },
          }}
        >
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{
              paddingRight: "20px",
              [theme.breakpoints.down("sm")]: {
                fontSize: "22px",
              },
            }}
          >
            {car.carMake}{" "}
            {car.model.length > 15 ? car.model.slice(0, 15) + ".." : car.model}{" "}
          </Typography>
          <Box>
            <Typography
              variant="h5"
              color="green"
              fontWeight={700}
            >
              {car.price} $
            </Typography>
          </Box>
        </Box>

        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginRight: "20px",
              }}
            >
              <TimeToLeaveIcon
                fontSize="small"
                color="warning"
              />
              <Typography sx={{ marginLeft: "5px" }}>{car.bodyType}</Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginRight: "20px",
              }}
            >
              <LocalGasStationIcon
                fontSize="small"
                color="warning"
              />
              <Typography sx={{ marginLeft: "5px" }}>{car.fuelType}</Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginRight: "20px",
              }}
            >
              <TodayIcon
                fontSize="small"
                color="warning"
              />
              <Typography sx={{ marginLeft: "5px" }}>{car.year}</Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginRight: "20px",
              }}
            >
              <SpeedIcon
                fontSize="small"
                color="warning"
              />
              <Typography
                sx={{
                  marginLeft: "5px",
                  whiteSpace: "nowrap",
                }}
              >
                {car.mileage} thds.km.
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{ display: "flex", alignItems: "center", marginTop: "10px" }}
          >
            <PlaceIcon
              fontSize="small"
              color="warning"
            />
            <Typography
              sx={{ marginLeft: "5px", fontSize: "12px", marginTop: "2px" }}
            >
              {car.city}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <QueryBuilderIcon
              fontSize="small"
              color="warning"
            />
            <Typography
              sx={{ marginLeft: "5px", fontSize: "12px", marginTop: "2px" }}
            >
              Posted {timePassed(car.createdAt)} ago
            </Typography>
          </Box>
        </Box>

        <Box>
          <Box
            sx={{
              maxHeight: "62px",
              overflow: "hidden",
              [theme.breakpoints.down("sm")]: {
                marginTop: "10px",
              },
            }}
          >
            <Typography sx={{ lineHeight: 1.3 }}>{car.desc}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CarItem;