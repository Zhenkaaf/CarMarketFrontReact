import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/redux-hooks";
import CarItem from "../../components/CarItem";
import { Box, Typography } from "@mui/material";
import { useGetMyCarsQuery } from "../../redux/carsApi";
import Spinner from "../../components/Spinner";

const CabinetPage = () => {
  const user = useAppSelector((state) => state.userRed.user);
  const userId = user?.id?.toString();
  console.log(userId);
  const { data: myCars, isLoading, isError } = useGetMyCarsQuery(userId || "");

  if (isLoading) {
    return <Spinner open={isLoading} />;
  }

  if (isError) {
    return (
      <Box sx={{ fontSize: "24px", fontWeight: "bold" }}>
        Something went wrong, unable to fetch your cars.
      </Box>
    );
  }
  return (
    <div style={{ marginTop: "50px" }}>
      <Typography
        textAlign="center"
        fontSize={24}
      >
        {" "}
        My cars
      </Typography>
      <Box
        sx={{
          maxWidth: "1140px",
          width: "100%",
          margin: "auto",
        }}
      >
        {myCars ? (
          myCars.map((car) => (
            <Box>
              <Link
                to={`../single-car/${car.carId}`}
                style={{ textDecoration: "none" }}
                key={car.carId}
              >
                <CarItem car={car} />
              </Link>
              <Box>sfd</Box>
            </Box>
          ))
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {" "}
            Typography
          </Box>
        )}
      </Box>
    </div>
  );
};

export default CabinetPage;
