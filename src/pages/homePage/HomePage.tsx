import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
} from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import SpeedIcon from "@mui/icons-material/Speed";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import { theme } from "../../theme";
import {
  useGetCarsQuery,
  useAddCarMutation,
  useUpdateCarMutation,
  useDeleteCarMutation,
} from "../../redux/carsApi";
import { useAppDispatch } from "../../redux/redux-hooks";
import { getProfileAct, logOutAct } from "../../redux/user/userSlice";
import { formattedDate } from "../../helpers/formatDate.helper";
import { Link } from "react-router-dom";
import { linkStyle } from "../../globalStyles";

const HomePage = () => {
  const catTitle = "Dacia Logan";
  const { data: allCars, isLoading } = useGetCarsQuery({});

  console.log(allCars);
  const dispatch = useAppDispatch();
  const [addCar] = useAddCarMutation();
  const [deleteCar, { isError }] = useDeleteCarMutation();
  const [updateCar] = useUpdateCarMutation();

  const handleAddCar = async () => {
    const newCar = {
      bodyType: "Van",
      carMake: "ВАЗ",
      year: "1991",
      price: 1400,
      mileage: 650000,
      fuelType: "Petrol",
      city: "Komarovka",
      desc: "it is just vazzz",
    };
    await addCar(newCar).unwrap();
  };

  const handleUpdateCar = async (carId) => {
    const updatedCar = {
      year: "1999",
      price: 3333,
    };
    try {
      await updateCar({ id: carId, updatedCar }).unwrap();
      console.log(`Car with id ${carId} has been successfully updated`);
    } catch (error: unknown) {
      console.error(error);
    }
  };

  /*   const getErrorMessage = (error: unknown): string => {
    let message: string;
    if (error instanceof Error) {
      message = error.message;
    } else if (error && typeof error === "object" && "message" in error) {
      message = String(error.message);
    } else if (typeof error === "string") {
      message = error;
    } else {
      message = "Something went wrong";
    }
    return message;
  }; */

  const handleDeleteCar = async (carId) => {
    try {
      await deleteCar(carId).unwrap();
      console.log(`Car with id ${carId} has been successfully deleted`);
    } catch (error: unknown) {
      console.error(error);
      /*  if (typeof error === "object" && error !== null && "data" in error) {
        const data = error as { data: unknown | null }; // Приведение типа для доступа к свойству data
        if (
          data.data !== null &&
          typeof data.data === "object" &&
          "message" in data.data
        ) {
          console.error(data.data.message);
        } else {
          console.error("Error occurred, but no message available");
        }
      } */
    }
  };

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div>
      <Box
        sx={{
          maxWidth: "768px",
          margin: "auto",
        }}
      >
        <Button
          onClick={handleAddCar}
          sx={{ backgroundColor: "green" }}
        >
          AddCar
        </Button>
        <Button
          onClick={() => handleDeleteCar(33)}
          sx={{ backgroundColor: "red" }}
        >
          DeleteCar
        </Button>
        <Button
          onClick={() => handleUpdateCar(33)}
          sx={{ backgroundColor: "blue" }}
        >
          UpdateCar
        </Button>
        {allCars &&
          allCars.map((car) => (
            <Link
              to={`single-car/${car.carId}`}
              style={{ textDecoration: "none" }}
            >
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
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Box>
                      <Typography
                        variant="h6"
                        fontWeight={600}
                        marginTop="-5px"
                      >
                        {catTitle.length > 15
                          ? catTitle.slice(0, 15) + "..."
                          : catTitle}{" "}
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

                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "20px" }}
                  >
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
                      <Typography sx={{ marginLeft: "5px" }}>
                        {car.bodyType}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <SpeedIcon
                        fontSize="small"
                        color="warning"
                      />
                      <Typography sx={{ marginLeft: "5px" }}>
                        {car.mileage} {/* thds. */} km.
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "20px" }}
                  >
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
                      <Typography sx={{ marginLeft: "5px" }}>
                        {car.fuelType}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <PlaceIcon
                        fontSize="small"
                        color="warning"
                      />
                      <Typography sx={{ marginLeft: "5px" }}>
                        {car.city}
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
                      {car.desc}
                      {/*  {desc.length > 250 ? desc.slice(0, 250) + "..." : desc} */}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Link>
          ))}

        <Card
          sx={{
            height: "200px",
            display: "flex",
            backgroundColor: "yellow",
            padding: "20px",
            marginBottom: "20px",
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
                  {/* Dacia Logan 2008 */}
                  {catTitle.length > 15
                    ? catTitle.slice(0, 15) + "..."
                    : catTitle}{" "}
                  2008
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
                  22.02.2024
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
                1500 $
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <Box
                sx={{ display: "flex", alignItems: "center", width: "110px" }}
              >
                <TimeToLeaveIcon
                  fontSize="small"
                  color="warning"
                />
                <Typography sx={{ marginLeft: "5px" }}>Hatchback</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <SpeedIcon
                  fontSize="small"
                  color="warning"
                />
                <Typography sx={{ marginLeft: "5px" }}>
                  250 thds. km.
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <Box
                sx={{ display: "flex", alignItems: "center", width: "110px" }}
              >
                <LocalGasStationIcon
                  fontSize="small"
                  color="warning"
                />
                <Typography sx={{ marginLeft: "5px" }}>LPG/Petrol</Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <PlaceIcon
                  fontSize="small"
                  color="warning"
                />
                <Typography sx={{ marginLeft: "5px" }}>Kharkov</Typography>
              </Box>
            </Box>

            <Box
              sx={{ marginTop: "5px", maxHeight: "82px", overflow: "hidden" }}
            >
              <Typography sx={{ lineHeight: 1.3 }}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Suscipit ratione itaque quasi quibusdam nesciunt tempore
                voluptate soluta, cum, iusto, dolorum beatae non odit architecto
                rem similirque. Architecto totam reprehenderit cum. itaque quasi
                quibusdam nesciunt tempore voluptate soluta, cum, iusto, dolorum
                beatae non odit
                {/*  {desc.length > 250 ? desc.slice(0, 250) + "..." : desc} */}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default HomePage;
