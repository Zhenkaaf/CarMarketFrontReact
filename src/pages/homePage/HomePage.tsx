import {
  Box,
  Button,
  Pagination,
  PaginationItem,
  useMediaQuery,
} from "@mui/material";
import { useGetCarsQuery } from "../../redux/carsApi";
import { Link, useLocation } from "react-router-dom";
import CarItem from "../../components/CarItem";
import { useState } from "react";
import Spinner from "../../components/Spinner";

const HomePage = () => {
  const { search } = useLocation();

  const isLargeScreen = useMediaQuery("(min-width:1280px)");
  const [page, setPage] = useState(parseInt(search?.split("=")[1]) || 1);
  const { data: allCars, isLoading, isFetching } = useGetCarsQuery(page);
  console.log("все авто", allCars);


  if (isLoading || isFetching) {
    return <Spinner open={true} />;
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
      <Box
        sx={{
          display: "flex",
          marginBottom: "20px",
          "@media (max-width: 1140px)": {
            padding: "0px 20px",
          },
        }}
      >
        <Link
          to="search"
          style={{ textDecoration: "none", width: "100%" }}
        >
          <Button
            variant="contained"
            color="secondary"
            sx={{
              width: "100%",
            }}
          >
            search by parameters{" "}
          </Button>
        </Link>
      </Box>

      {allCars &&
        allCars.cars.map((car) => (
          <Link
            to={`single-car/${car.carId}`}
            style={{ textDecoration: "none" }}
            key={car.carId}
          >
            <CarItem
              car={car}
              applyHoverStyles={isLargeScreen}
            />
          </Link>
        ))}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        {allCars?.totalPages && (
          <Pagination
            count={allCars.totalPages}
            page={page}
            variant="outlined"
            shape="rounded"
            color="secondary"
            onChange={(_, num) => setPage(num)}
            renderItem={(item) => (
              <PaginationItem
                component={Link}
                to={`/?page=${item.page}`}
                {...item}
              />
            )}
          />
        )}
      </Box>
      {/* {carsToDisplay ? (
        
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
      )} */}
    </Box>
  );
};

export default HomePage;
