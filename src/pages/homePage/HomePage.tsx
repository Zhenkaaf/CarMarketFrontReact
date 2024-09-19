import { Box, Button, Collapse, Skeleton, useMediaQuery } from "@mui/material";
import { useGetCarsQuery } from "../../redux/carsApi";
import { Link } from "react-router-dom";
import CarItem from "../../components/CarItem";
import SearchParameters from "../../components/searchParameters/SearchParameters";
import { useState } from "react";

const HomePage = () => {
  const { data: allCars } = useGetCarsQuery();
  console.log("все авто", allCars);

  const [isSearchParamOpen, setIsSearchParamOpen] = useState(false);
  const isLargeScreen = useMediaQuery("(min-width:1280px)");

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
      <Box
        sx={{
          display: "flex",
          marginBottom: "20px",
          "@media (max-width: 1140px)": {
            padding: "0px 20px",
          },
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            setIsSearchParamOpen(!isSearchParamOpen);
          }}
          sx={{
            width: "100%",
          }}
        >
          {isSearchParamOpen
            ? "Close search parameters"
            : "Open search parameters"}
        </Button>
      </Box>
      <Collapse in={isSearchParamOpen}>
        <SearchParameters />
      </Collapse>
      {/*  {isSearchParamOpen ? (<SearchParameters />) : null} */}
      {allCars ? (
        allCars.map((car) => (
          <Link
            to={`single-car/${car.carId}`}
            style={{ textDecoration: "none" }}
            key={car.carId}
          >
            <CarItem
              car={car}
              //applyHoverStyles={true}
              applyHoverStyles={isLargeScreen}
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
