import {
  Box,
  Button,
  Checkbox,
  FormControl,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import { CAR_MAKES, PRICES, REGIONS, YEARS } from "../../constants/constans";
import { useState } from "react";
import { useGetFilteredCarsQuery } from "../../redux/carsApi";

const SearchParameters = () => {
  const [searchParams, setSearchParams] = useState<string>("");
  const {
    data: filteredCars,
    isLoading,
    error,
  } = useGetFilteredCarsQuery(searchParams, {
    skip: !searchParams,
  });

  console.log("filteredCars", filteredCars);

  const [region, setRegion] = useState("");
  const [carMakes, setCarMakes] = useState<string[]>([]);
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const handleSearch = () => {
    const params = new URLSearchParams();
    if (region) params.append("region", region);
    if (carMakes.length) params.append("carMakes", carMakes.join(","));
    if (yearFrom) params.append("yearFrom", yearFrom);
    if (yearTo) params.append("yearTo", yearTo);
    if (priceFrom) params.append("priceFrom", priceFrom);
    if (priceTo) params.append("priceTo", priceTo);
    const queryString = params.toString();
    console.log("queryString", queryString);
    setSearchParams(queryString);

    /*  `/api/cars?region=${region}&carMakes=${carMakes}&yearFrom=${yearFrom}&yearTo=${yearTo}&priceFrom=${priceFrom}&priceTo=${priceTo}`; */
  };

  return (
    <Box
      sx={{
        marginBottom: "20px",
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        "@media (max-width: 1140px)": {
          padding: "0px 20px",
        },
      }}
    >
      <FormControl sx={{ width: "calc(50% - 10px)" }}>
        <Select
          displayEmpty
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
      <FormControl sx={{ width: "calc(50% - 10px)" }}>
        <Select
          displayEmpty
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
  );
};

export default SearchParameters;
