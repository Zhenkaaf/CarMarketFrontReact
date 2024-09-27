import {
  Box,
  Button,
  Collapse,
  Pagination,
  Skeleton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useGetCarsQuery, useGetTotalPagesQuery } from "../../redux/carsApi";
import { Link } from "react-router-dom";
import CarItem from "../../components/CarItem";
import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";

const HomePage = () => {
  const isLargeScreen = useMediaQuery("(min-width:1280px)");
  const [page, setPage] = useState(1);
  const [isSearchParamOpen, setIsSearchParamOpen] = useState(false);
  const { data: allCars, isLoading } = useGetCarsQuery(page);
  console.log("все авто", allCars);

  const [pageQty, setPageQty] = useState(0);

  /*   const { data: totalPages } = useGetTotalPagesQuery("10");
  console.log(totalPages); */

  if (isLoading) {
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
            onClick={() => {
              setIsSearchParamOpen(!isSearchParamOpen);
            }}
            sx={{
              width: "100%",
            }}
          >
            search by parameters{" "}
          </Button>
        </Link>
      </Box>
      {/*  <Collapse in={isSearchParamOpen}>
        <SearchParameters setSearchParams={setSearchParams} />
      </Collapse> */}
      {/*  {isSearchParamOpen ? (<SearchParameters />) : null} */}

      {allCars &&
        allCars.data.map((car) => (
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
