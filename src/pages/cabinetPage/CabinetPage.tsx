import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/redux-hooks";
import CarItem from "../../components/CarItem";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useDeleteCarMutation, useGetMyCarsQuery } from "../../redux/carsApi";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";

const CabinetPage = () => {
  const theme = useTheme();
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
  console.log(myCars);
  const handleDeleteCar = async (carId: number, carMake: string) => {
    try {
      await deleteCar(carId).unwrap();
      const myUpdatedCars = await refetchMyCars();
      console.log("updated");
      console.log(myUpdatedCars);
      if (myUpdatedCars.isSuccess) {
        console.log("deleted");
        toast.success(`Your ${carMake} has been successfully deleted`);
      }
    } catch (error: unknown) {
      toast.error((error as Error).message || "An error occurred");
      console.error(error);
    }
  };

  if (
    isGetMyCarsLoading ||
    isGetMyCarsFetching ||
    isDeleting /* || isUpdating */
  ) {
    return <Spinner open={true} />;
  }

  if (getMyCarsError /* || updateCarError */) {
    console.log(getMyCarsError);
    return (
      <Box sx={{ fontSize: "24px", fontWeight: "bold", marginTop: "50px" }}>
        Something went wrong, unable to fetch your cars.
      </Box>
    );
  }

  if (deleteCarError) {
    console.log(deleteCarError);
    return (
      <Box sx={{ fontSize: "24px", fontWeight: "bold", marginTop: "50px" }}>
        Something went wrong, unable to delete your car.
      </Box>
    );
  }

  if (myCars?.length === 0) {
    return (
      <>
        <Box
          sx={{
            fontSize: "24px",
            fontWeight: "bold",
            marginTop: "50px",
            marginBottom: "20px",
          }}
        >
          You don't have any cars yet.
        </Box>

        <Link
          to="/post-advert"
          style={{ textDecoration: "none" }}
        >
          <Button
            variant="contained"
            color="secondary"
            sx={{
              "&:hover": {
                backgroundColor: theme.palette.secondary.light,
              },
            }}
          >
            Add car
          </Button>
        </Link>
      </>
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
        variant="h5"
        textTransform="uppercase"
        fontWeight={700}
        textAlign="center"
        sx={{
          marginBottom: "20px",
        }}
      >
        {" "}
        My cars:
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
                marginTop: "-35px",
                marginBottom: "20px",
                display: "flex",
                gap: "20px",
                padding: "20px",
                backgroundColor: theme.palette.background.paper,
                backgroundImage:
                  "linear-gradient(rgba(255, 255, 255, 0.00), rgba(255, 255, 255, 0.00))",
                borderRadius: "0px 0px 4px 4px",
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Link
                  to={`../edit-car/${car.carId}`}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{
                      width: "100%",
                      "&:hover": {
                        backgroundColor: theme.palette.secondary.light,
                      },
                    }}
                  >
                    Edit
                  </Button>
                </Link>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Button
                  onClick={() => handleDeleteCar(car.carId, car.carMake)}
                  variant="contained"
                  color="secondary"
                  sx={{
                    width: "100%",
                    "&:hover": {
                      backgroundColor: theme.palette.secondary.light,
                    },
                  }}
                >
                  Delete
                </Button>
              </Box>
            </Box>
          </Box>
        ))}
    </Box>
  );
};

export default CabinetPage;
