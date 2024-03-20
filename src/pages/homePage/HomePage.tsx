import { Box, Button, Container, Skeleton } from "@mui/material";
import {
  useGetCarsQuery,
  useAddCarMutation,
  useUpdateCarMutation,
  useDeleteCarMutation,
} from "../../redux/carsApi";
import { useAppDispatch } from "../../redux/redux-hooks";
import { getProfileAct, logOutAct } from "../../redux/user/userSlice";

import { Link } from "react-router-dom";
import { linkStyle } from "../../globalStyles";
import CarItem from "../../components/CarItem";

const HomePage = () => {
  const { data: allCars, isLoading } = useGetCarsQuery({});
  console.log(allCars);
  const dispatch = useAppDispatch();
  const [addCar] = useAddCarMutation();
  const [deleteCar, { isError }] = useDeleteCarMutation();
  const [updateCar] = useUpdateCarMutation();

  const handleAddCar = async () => {
    const newCar = {
      bodyType: "Hatchback",
      carMake: "INTERNATIONAL",
      model: "TTtestetstdjsdlkjsddbfdffbfbfnghmjhmhjm",
      year: "2009",
      price: 598000,
      mileage: 956,
      fuelType: "LPG/Petrol",
      city: "KharkKharkovKharkovKharkovov",
      desc: "The Audi ",
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

  /*   if (isLoading) return <h1>Loading...</h1>; */

  return (
    <Box
      sx={{
        maxWidth: "1140px",
        width: "100%",
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
      {allCars ? (
        allCars.map((car) => (
          <Link
            to={`single-car/${car.carId}`}
            style={{ textDecoration: "none" }}
            key={car.carId}
          >
            <CarItem car={car} />
          </Link>
        ))
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {" "}
          <Skeleton
            animation="wave"
            variant="rectangular"
            width="100%"
            height={250}
          />
          <Skeleton
            animation="wave"
            variant="rectangular"
            width="100%"
            height={250}
          />
          <Skeleton
            animation="wave"
            variant="rectangular"
            width="100%"
            height={250}
          />
        </Box>
      )}
    </Box>
  );
};

export default HomePage;
