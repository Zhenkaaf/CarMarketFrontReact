import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/redux-hooks";
import CarItem from "../../components/CarItem";
import { Box, Button, Typography } from "@mui/material";
import {
  useDeleteCarMutation,
  useGetMyCarsQuery,
  useUpdateCarMutation,
} from "../../redux/carsApi";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";

const CabinetPage = () => {
  const user = useAppSelector((state) => state.userRed.user);
  const userId = user?.id?.toString();
  const {
    data: myCars,
    error: getMyCarsError,
    refetch: refetchMyCars,
    isLoading: isGetMyCarsLoading,
    isFetching: isGetMyCarsFetching,
  } = useGetMyCarsQuery(userId || "");
  const [deleteCar, { error: deleteCarError, isLoading: isDeleting }] =
    useDeleteCarMutation();

  const handleDeleteCar = async (carId: number) => {
    try {
      await deleteCar(carId).unwrap();

      const myUpdatedCars = await refetchMyCars();
      console.log("updated");
      console.log(myUpdatedCars);
      if (myUpdatedCars.isSuccess) {
        console.log("deleted");
        toast.success(`Car with id ${carId} has been successfully deleted`);
      }
    } catch (error: unknown) {
      toast.error((error as Error).message || "An error occurred");
      console.error(error);
    }
  };

  /*   const handleUpdateCar = async (carId: number) => {
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
  }; */

  if (isGetMyCarsLoading || isGetMyCarsFetching || isDeleting) {
    return <Spinner open={true} />;
  }

  if (getMyCarsError) {
    console.log(getMyCarsError);
    return (
      <Box sx={{ fontSize: "24px", fontWeight: "bold", matginTop: "50px" }}>
        Something went wrong, unable to fetch your cars.
      </Box>
    );
  }

  if (deleteCarError) {
    console.log(deleteCarError);
    return (
      <Box sx={{ fontSize: "24px", fontWeight: "bold", matginTop: "50px" }}>
        Something went wrong, unable to delete your car.
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
      }}
    >
      <Typography
        textAlign="center"
        fontSize={24}
      >
        {" "}
        My cars
      </Typography>
      {myCars &&
        myCars.map((car) => (
          <Box key={car.carId}>
            <Link
              to={`../single-car/${car.carId}`}
              style={{ textDecoration: "none" }}
            >
              <CarItem car={car} />
            </Link>
            <Box
              sx={{
                marginTop: "-14px",
                marginBottom: "50px",
                display: "flex",
                gap: "5px",
                padding: "5px",
                borderBottom: "3px dashed #e1bee7",
                borderLeft: "3px dashed #e1bee7",
                borderRight: "3px dashed #e1bee7",
              }}
            >
              <Button
                onClick={() => handleDeleteCar(car.carId)}
                variant="contained"
                color="secondary"
              >
                Delete Car
              </Button>
              {/*  <Button
                onClick={() => handleUpdateCar(33)}
                variant="contained"
                color="secondary"
              >
                Update Car
              </Button> */}
            </Box>
          </Box>
        ))}
    </Box>
  );
};

export default CabinetPage;
