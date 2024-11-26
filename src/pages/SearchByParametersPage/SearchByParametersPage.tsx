import {
  Box,
  Button,
  Checkbox,
  FormControl,
  ListItemText,
  MenuItem,
  Pagination,
  PaginationItem,
  Select,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { CAR_MAKES, PRICES, REGIONS, YEARS } from "../../constants/constans";
import { useEffect, useState } from "react";
import { useGetFilteredCarsQuery } from "../../redux/carsApi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CarItem from "../../components/CarItem";
import Spinner from "../../components/Spinner";

const SearchByParametersPage = () => {
  console.log("rerender*******");
  const { search } = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isLargeScreen = useMediaQuery("(min-width:1280px)");
  const [page, setPage] = useState(parseInt(search[search.length - 1]) || 1);
  const [searchParams, setSearchParams] = useState<string>("");
  const [isQueryStringReady, setIsQueryStringReady] = useState(false);
  const [region, setRegion] = useState("");
  const [carMakes, setCarMakes] = useState<string[]>([]);
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const { data, isLoading, isFetching, isError } = useGetFilteredCarsQuery(
    searchParams,
    { skip: !searchParams }
  );
  console.log("data", data);

  useEffect(() => {
    console.log("useEFFECT*****************");
    const params = new URLSearchParams(search);
    const page = params.get("page");
    if (page) {
      setPage(parseInt(page));
      setSearchParams(params.toString());
    }
  }, [search]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (region) params.append("region", region);
    if (carMakes.length) params.append("carMakes", carMakes.join(","));
    if (yearFrom) params.append("yearFrom", yearFrom);
    if (yearTo) params.append("yearTo", yearTo);
    if (priceFrom) params.append("priceFrom", priceFrom);
    if (priceTo) params.append("priceTo", priceTo);
    params.append("page", "1");
    const queryString = params.toString();
    navigate(`/search?${queryString}`);
    setSearchParams(queryString);
    setRegion("");
    setCarMakes([]);
    setYearFrom("");
    setYearTo("");
    setPriceFrom("");
    setPriceTo("");
    setIsQueryStringReady(true);
  };

  if (isLoading || isFetching /* || (data && data?.totalPages < page) */) {
    return <Spinner open={true} />;
  }

  if (isError) {
    return (
      <Box sx={{ fontSize: "24px", fontWeight: "bold" }}>
        Something went wrong, unable to fetch car data.
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          maxWidth: "1140px",
          width: "100%",
          margin: "auto",
          marginTop: "20px",
          borderRadius: "8px",
          padding: "20px",
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <Link
            to="/"
            style={{ textDecoration: "none", width: "100%" }}
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
              back to all cars
            </Button>
          </Link>

          <FormControl
            sx={{
              width: "calc(50% - 10px)",
            }}
          >
            <Select
              displayEmpty
              color="info"
              value={region}
              onChange={(event) => {
                setRegion(event.target.value);
              }}
            >
              <MenuItem
                value=""
                disabled
              >
                Region
              </MenuItem>
              {REGIONS.map((region) => (
                <MenuItem
                  key={region}
                  value={region}
                >
                  {region}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ width: "calc(50% - 10px)" }}>
            <Select
              multiple
              color="info"
              value={carMakes}
              onChange={(event) => {
                setCarMakes(
                  typeof event.target.value === "string"
                    ? event.target.value.split(",")
                    : event.target.value
                );
              }}
              displayEmpty
              fullWidth
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <>Car make</>;
                }
                if (selected.length === 1) {
                  return `${selected.length} car make selected`;
                }
                return `${selected.length} car makes selected`;
              }}
            >
              <MenuItem
                value=""
                disabled
              >
                Car make
              </MenuItem>
              {CAR_MAKES.map((carMake) => (
                <MenuItem
                  key={carMake}
                  value={carMake}
                >
                  <Checkbox checked={carMakes.includes(carMake)} />
                  <ListItemText primary={carMake} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ width: "calc(50% - 10px)" }}>
            <Select
              displayEmpty
              color="info"
              value={yearFrom}
              onChange={(event) => {
                setYearFrom(event.target.value);
              }}
            >
              <MenuItem
                value=""
                disabled
              >
                Year from
              </MenuItem>
              {YEARS.map((year) => (
                <MenuItem
                  key={year}
                  value={year}
                >
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl
            sx={{
              width: "calc(50% - 10px)",
            }}
          >
            <Select
              displayEmpty
              color="info"
              value={yearTo}
              onChange={(event) => {
                setYearTo(event.target.value);
              }}
            >
              <MenuItem
                value=""
                disabled
              >
                Year to
              </MenuItem>
              {YEARS.map((year) => (
                <MenuItem
                  key={year}
                  value={year}
                >
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ width: "calc(50% - 10px)" }}>
            <Select
              displayEmpty
              color="info"
              value={priceFrom}
              onChange={(event) => {
                setPriceFrom(event.target.value);
              }}
            >
              <MenuItem
                value=""
                disabled
              >
                Price from
              </MenuItem>
              {PRICES.map((price) => (
                <MenuItem
                  key={price}
                  value={price}
                >
                  $ {price}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ width: "calc(50% - 10px)" }}>
            <Select
              displayEmpty
              color="info"
              value={priceTo}
              onChange={(event) => {
                setPriceTo(event.target.value);
              }}
            >
              <MenuItem
                value=""
                disabled
              >
                Price to
              </MenuItem>
              {PRICES.map((price) => (
                <MenuItem
                  key={price}
                  value={price}
                >
                  $ {price}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            onClick={handleSearch}
            sx={{
              width: "100%",
              "&:hover": {
                backgroundColor: theme.palette.secondary.light,
              },
            }}
            variant="contained"
            color="secondary"
            disabled={
              !(
                region ||
                carMakes.length ||
                yearFrom ||
                yearTo ||
                priceFrom ||
                priceTo
              )
            }
          >
            Search
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          maxWidth: "1140px",
          width: "100%",
          margin: "auto",
          marginTop: "20px",
        }}
      >
        {data &&
          data.cars?.map((car) => (
            <Link
              to={`/search/single-car/${car.carId}`}
              style={{ textDecoration: "none" }}
              key={car.carId}
            >
              <CarItem
                car={car}
                applyHoverStyles={isLargeScreen}
              />
            </Link>
          ))}
        {isQueryStringReady && !data?.cars?.length && (
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            Nothing found by your parameters. Try to change your request
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        {data && data.totalPages > 0 && (
          <Pagination
            count={data.totalPages}
            page={page}
            variant="outlined"
            shape="rounded"
            color="secondary"
            onChange={(_, num) => setPage(num)}
            renderItem={(item) => {
              const params = new URLSearchParams(searchParams);
              params.set("page", String(item.page));
              return (
                <PaginationItem
                  sx={{
                    backgroundColor: theme.palette.background.paper,
                    "&:hover": {
                      backgroundColor: theme.palette.secondary.light,
                    },
                  }}
                  component={Link}
                  //to={`/search?${searchParams}&page=${item.page}`}
                  to={`/search?${params}`}
                  {...item}
                />
              );
            }}
          />
        )}
      </Box>
    </>
  );
};

export default SearchByParametersPage;
