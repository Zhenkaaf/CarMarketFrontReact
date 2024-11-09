import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  useTheme,
} from "@mui/material";
import { timePassed } from "../helpers/formatDate.helper";
import PlaceIcon from "@mui/icons-material/Place";
import SpeedIcon from "@mui/icons-material/Speed";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import TodayIcon from "@mui/icons-material/Today";
import { ICar } from "./../types";

/* const CarItem: React.FC<{ car: ICar }> = ({ car }) => { */
const CarItem = ({
  car,
  applyHoverStyles,
}: {
  car: ICar;
  applyHoverStyles?: boolean;
}) => {
  const theme = useTheme();

  return (
    <Card
      key={car.carId}
      sx={{
        height: "250px",
        display: "flex",
        backgroundColor: theme.palette.primary.main,
        padding: "20px",
        marginBottom: "15px",
        transition: applyHoverStyles ? "transform 0.3s ease" : "none",
        "&:hover": applyHoverStyles ? { transform: "scale(1.05)" } : {},
        [theme.breakpoints.down("lg")]: {
          "&:hover": {
            transform: "none",
          },
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
          image={
            car.photos?.length
              ? car.photos[0].url
              : "https://gas-kvas.com/uploads/posts/2023-01/thumbs/1674658270_gas-kvas-com-p-konturnii-risunok-avto-27.jpg"
          }
          title={`Photo of ${car.carMake}`}
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
            {car.carMake} {car.model}{" "}
            {/* {car.model.length > 16 ? car.model.slice(0, 16) + ".." : car.model}{" "} */}
          </Typography>
          <Box>
            <Typography
              variant="h5"
              color="green"
              fontWeight={700}
              sx={{
                [theme.breakpoints.down("sm")]: {
                  fontSize: "22px",
                },
              }}
            >
              {car.price} $
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            width: "fit-content",
            border: `1px dashed ${theme.palette.secondary.main}`,
            gridTemplateColumns: "repeat(3, minmax(0px, 200px))",
            [theme.breakpoints.down("sm")]: {
              width: "100%",
              gridTemplateColumns: "repeat(2, auto)",
            },
            [theme.breakpoints.down("xs")]: {
              width: "fit-content",
              gridTemplateColumns: "repeat(2, minmax(0px, 220px))",
            },
          }}
        >
          <Box
            sx={{
              padding: "5px",
              border: `1px dashed ${theme.palette.secondary.main}`,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <TodayIcon
                fontSize="small"
                color="secondary"
              />
              <Typography
                sx={{
                  marginLeft: "5px",
                  [theme.breakpoints.down("xs")]: {
                    fontSize: "14px",
                  },
                }}
              >
                {car.year}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              padding: "5px",
              border: `1px dashed ${theme.palette.secondary.main}`,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <PlaceIcon
                fontSize="small"
                color="secondary"
              />
              <Typography
                sx={{
                  marginLeft: "5px",
                  [theme.breakpoints.down("xs")]: {
                    fontSize: "14px",
                  },
                }}
              >
                {car.region}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              padding: "5px",
              border: `1px dashed ${theme.palette.secondary.main}`,
            }}
          >
            {" "}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <QueryBuilderIcon
                fontSize="small"
                color="secondary"
              />
              <Typography
                sx={{
                  marginLeft: "5px",
                  [theme.breakpoints.down("xs")]: {
                    fontSize: "14px",
                  },
                }}
              >
                {timePassed(car.createdAt)} ago
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              padding: "5px",
              border: `1px dashed ${theme.palette.secondary.main}`,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <LocalGasStationIcon
                fontSize="small"
                color="secondary"
              />
              <Typography
                sx={{
                  marginLeft: "5px",
                  [theme.breakpoints.down("xs")]: {
                    fontSize: "14px",
                  },
                }}
              >
                {car.fuelType}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              padding: "5px",
              border: `1px dashed ${theme.palette.secondary.main}`,
            }}
          >
            {" "}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <SpeedIcon
                fontSize="small"
                color="secondary"
              />
              <Typography
                sx={{
                  marginLeft: "5px",
                  whiteSpace: "nowrap",
                  [theme.breakpoints.down("xs")]: {
                    fontSize: "14px",
                  },
                }}
              >
                {car.mileage} thds.km.
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              padding: "5px",
              border: `1px dashed ${theme.palette.secondary.main}`,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <TimeToLeaveIcon
                fontSize="small"
                color="secondary"
              />
              <Typography
                sx={{
                  marginLeft: "5px",
                  [theme.breakpoints.down("xs")]: {
                    fontSize: "14px",
                  },
                }}
              >
                {car.bodyType}
              </Typography>
            </Box>
          </Box>
        </Box>
        {/*  <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              marginBottom: "5px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginRight: "20px",
              }}
            >
              <TodayIcon
                fontSize="small"
                color="secondary"
              />
              <Typography
                sx={{
                  marginLeft: "5px",
                  [theme.breakpoints.down("xs")]: {
                    fontSize: "14px",
                  },
                }}
              >
                {car.year}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginRight: "20px",
              }}
            >
              <PlaceIcon
                fontSize="small"
                color="secondary"
              />
              <Typography
                sx={{
                  marginLeft: "5px",
                  [theme.breakpoints.down("xs")]: {
                    fontSize: "14px",
                  },
                }}
              >
                {car.region}
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
                color="secondary"
              />
              <Typography
                sx={{
                  marginLeft: "5px",
                  [theme.breakpoints.down("xs")]: {
                    fontSize: "14px",
                  },
                }}
              >
                Posted {timePassed(car.createdAt)} ago
              </Typography>
            </Box>
          </Box>
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
              <LocalGasStationIcon
                fontSize="small"
                color="secondary"
              />
              <Typography
                sx={{
                  marginLeft: "5px",
                  [theme.breakpoints.down("xs")]: {
                    fontSize: "14px",
                  },
                }}
              >
                {car.fuelType}
              </Typography>
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
                color="secondary"
              />
              <Typography
                sx={{
                  marginLeft: "5px",
                  whiteSpace: "nowrap",
                  [theme.breakpoints.down("xs")]: {
                    fontSize: "14px",
                  },
                }}
              >
                {car.mileage} thds.km.
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <TimeToLeaveIcon
                fontSize="small"
                color="secondary"
              />
              <Typography
                sx={{
                  marginLeft: "5px",
                  [theme.breakpoints.down("xs")]: {
                    fontSize: "14px",
                  },
                }}
              >
                {car.bodyType}
              </Typography>
            </Box>
          </Box>
        </Box> */}

        <Box>
          <Box
            sx={{
              /*  display: '-webkit-box',
              -webkit-box-orient: 'vertical',
              overflow: 'hidden',
              -webkit-line-clamp: '3', */
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              WebkitLineClamp: "3",
              /*  maxHeight: "62px",
              overflow: "hidden",*/
              [theme.breakpoints.down("sm")]: {
                marginTop: "10px",
              },
            }}
          >
            <Typography sx={{ lineHeight: 1.5 }}>
              {car.desc ? car.desc : "No description"}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CarItem;
