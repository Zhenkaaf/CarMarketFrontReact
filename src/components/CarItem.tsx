import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { theme } from "../theme";
import { formattedDate } from "../helpers/formatDate.helper";
import PlaceIcon from "@mui/icons-material/Place";
import SpeedIcon from "@mui/icons-material/Speed";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import { ICar } from "./../types";

/* const CarItem: React.FC<{ car: ICar }> = ({ car }) => { */
const CarItem = ({ car }: { car: ICar }) => {
  return (
    <Card
      key={car.carId}
      sx={{
        height: "200px",
        display: "flex",
        backgroundColor: "yellow",
        padding: "20px",
        marginBottom: "20px",
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
          padding: "0px 0px 0px 20px",

          [theme.breakpoints.down("sm")]: {
            padding: "0px 20px",
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography
              variant="h6"
              fontWeight={600}
              marginTop="-5px"
            >
              {car.carMake.length > 15
                ? car.carMake.slice(0, 15) + "..."
                : car.carMake}{" "}
              {car.year}
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
              {formattedDate(car.createdAt)}
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
            variant="h5"
            color="green"
            fontWeight={700}
          >
            {car.price} $
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "110px",
            }}
          >
            <TimeToLeaveIcon
              fontSize="small"
              color="warning"
            />
            <Typography sx={{ marginLeft: "5px" }}>{car.bodyType}</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <SpeedIcon
              fontSize="small"
              color="warning"
            />
            <Typography sx={{ marginLeft: "5px" }}>
              {car.mileage} thds.km.
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "110px",
            }}
          >
            <LocalGasStationIcon
              fontSize="small"
              color="warning"
            />
            <Typography sx={{ marginLeft: "5px" }}>{car.fuelType}</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <PlaceIcon
              fontSize="small"
              color="warning"
            />
            <Typography sx={{ marginLeft: "5px" }}>{car.city}</Typography>
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
            {car.desc.length > 120 ? car.desc.slice(0, 120) + "..." : car.desc}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CarItem;
