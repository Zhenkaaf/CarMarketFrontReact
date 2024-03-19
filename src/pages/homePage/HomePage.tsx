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
      bodyType: "Van",
      carMake: "AUDI",
      model: "Q7",
      year: "2009",
      price: 13000,
      mileage: 98,
      fuelType: "Petrol",
      city: "Merefa",
      desc: "The Audi Q7 stands as a pinnacle of luxury and performance in the SUV segment, combining elegance, power, and advanced technology in one exceptional package. Exterior-wise, the Q7 showcases Audi signature design language with sleek lines, a bold grille, and striking LED headlights that exude sophistication and presence on the road. Its commanding presence is matched only by its dynamic performance. Underneath the hood, the Audi Q7 offers a range of potent engine options, delivering robust power and effortless acceleration. Whether cruising on the highway or navigating urban streets, the Q7 provides a smooth and exhilarating driving experience, aided by Audi renowned quattro all-wheel-drive system. Inside the cabin, the Q7 envelops passengers in opulent comfort and cutting-edge technology. Premium materials, exquisite craftsmanship, and ergonomic design elements create a luxurious ambiance, while advanced features such as Audi Virtual Cockpit display and MMI infotainment system keep you connected and entertained on every journey.",
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
        maxWidth: "768px",
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
            height={200}
          />
          <Skeleton
            animation="wave"
            variant="rectangular"
            width="100%"
            height={200}
          />
        </Box>
      )}
    </Box>
  );
};

export default HomePage;
