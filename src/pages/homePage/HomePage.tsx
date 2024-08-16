import { Box, Skeleton } from "@mui/material";
import { useGetCarsQuery } from "../../redux/carsApi";
import { Link } from "react-router-dom";
import CarItem from "../../components/CarItem";

const HomePage = () => {
  const { data: allCars } = useGetCarsQuery();
  console.log("запрос зв всеми авто", allCars);

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

  /*   if (isLoading) return <h1>Loading...</h1>; */

  return (
    <Box
      sx={{
        maxWidth: "1140px",
        width: "100%",
        margin: "auto",
        marginTop: "20px",
      }}
    >
      {allCars ? (
        allCars.map((car) => (
          <Link
            to={`single-car/${car.carId}`}
            style={{ textDecoration: "none" }}
            key={car.carId}
          >
            <CarItem
              car={car}
              applyHoverStyles={true}
            />
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
