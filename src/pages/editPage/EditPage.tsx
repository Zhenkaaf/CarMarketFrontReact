import { useNavigate, useParams } from "react-router-dom";
import { useGetCarQuery } from "../../redux/carsApi";
import Spinner from "../../components/Spinner";
import {
  Box,
  Button,
  FormHelperText,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import AttachFiles from "../../components/attachFiles/AttachFiles";
import { FieldValues, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { ICarData } from "../../types";

const EditPage = () => {
  console.log("render");
  const { carId } = useParams<{ carId: string }>();
  const {
    data: singleCar,
    isLoading,
    isFetching,
    isError,
  } = useGetCarQuery(carId || "");
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    setValue,
  } = useForm({
    mode: "onChange",
  });

  const navigate = useNavigate();
  const [bodyType, setBodyType] = useState("");
  const [carMake, setCarMake] = useState("");
  const [year, setYear] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [bodyTypeError, setBodyTypeError] = useState<string>("");
  const [carMakeError, setCarMakeError] = useState<string>("");
  const [yearError, setYearError] = useState<string>("");
  const [fuelTypeError, setFuelTypeError] = useState<string>("");
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [spinnerState, setSpinnerState] = useState<boolean>(false);

  useEffect(() => {
    console.log("useEffectWORKED");
    if (singleCar) {
      setBodyType(singleCar.bodyType || "");
      setCarMake(singleCar.carMake || "");
      setYear(singleCar.year || "");
      setFuelType(singleCar.fuelType || "");
      setSelectedFiles(singleCar.photoUrls || []);
      setValue("model", singleCar.model || "");
      setValue("price", singleCar.price || "");
      setValue("mileage", singleCar.mileage || "");
      setValue("city", singleCar.city || "");
      setValue("desc", singleCar.desc || "");
    }
  }, [singleCar, setValue]);
  console.log(singleCar);

  const onSubmit = async (carData: FieldValues) => {
    if (!bodyType) {
      setBodyTypeError("Please select car body type.");
      return;
    }
    if (!carMake) {
      setCarMakeError("Please select car make.");
      return;
    }
    if (!year) {
      setYearError("Please select car year.");
      return;
    }
    if (!fuelType) {
      setFuelTypeError("Please select car fuel type.");
      return;
    }
    if (selectedFiles.length < 0) {
      alert("please select a file");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("photos", file);
    });

    const newCar: ICarData = {
      city: carData.city,
      desc: carData.desc,
      mileage: +carData.mileage,
      model: carData.model,
      price: +carData.price,
      bodyType,
      carMake,
      year,
      fuelType,
    };

    try {
      setSpinnerState(true);
      const addCarRes = await addCar(newCar).unwrap();
      console.log("addCarRes", addCarRes);
      if (addCarRes.status === 201) {
        const carId = addCarRes.data.carId;
        const addPhotosRes = await addPhotosToCar({ carId, formData }).unwrap();
        console.log("addPhotosRes", addPhotosRes);
        reset();
        toast.success(`Car has been successfully added`);
        setSpinnerState(false);
        navigate("/");
      }
    } catch (error: unknown) {
      toast.error((error as Error).message || "An error occurred");
      console.error(error);
    } finally {
      setSpinnerState(false);
    }
  };

  const handleChangeSelects = (
    event: SelectChangeEvent,
    selectType: string
  ) => {
    console.log(event.target.value);
    if (selectType === "bodyType") {
      setBodyType(event.target.value);
      setBodyTypeError("");
    } else if (selectType === "carMake") {
      setCarMake(event.target.value);
      setCarMakeError("");
    } else if (selectType === "year") {
      setYear(event.target.value);
      setYearError("");
    } else if (selectType === "fuelType") {
      setFuelType(event.target.value);
      setFuelTypeError("");
    }
  };

  const excludeSpacesAndZero = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value.replace(/\s/g, "");
    if (inputValue.length === 1 && inputValue[0] === "0") {
      inputValue = "";
    }
    if (inputValue.length > 6) {
      inputValue = inputValue.slice(0, 6);
    }
    if (event.target.name == "mileage") {
      inputValue = inputValue.slice(0, 3);
    }
    setValue(event.target.name, inputValue);
  };

  const carMakes = [
    "VOLKSWAGEN",
    "AUDI",
    "SKODA",
    "BMW",
    "DACIA",
    "DAEWOO",
    "FIAT",
    "FORD",
    "GEELY",
    "HONDA",
    "HYUNDAI",
    "JEEP",
    "KIA",
    "MAZDA",
    "MERCEDES",
    "MITSUBISHI",
    "NISSAN",
    "OPEL",
    "PEUGEOT",
    "RENAULT",
    "SUBARU",
    "TOYOTA",
    "VOLVO",
    "MOSKVICH",
    "AC",
    "ACURA",
    "AIXAM",
    "ALFA ROMEO",
    "ARO",
    "ASIA",
    "ASTON MARTIN",
    "AUSTIN",
    "AVIA",
    "BAIC",
    "BARKAS",
    "BAW",
    "BENTLEY",
    "BRILLIANCE",
    "BUICK",
    "BYD",
    "CADILLAC",
    "CAMC",
    "CHANA",
    "CHANGAN",
    "CHANGHE",
    "CHEVROLET",
    "CHRYSLER",
    "CITROEN",
    "CUPRA",
    "DADI",
    "DAF",
    "DAIHATSU",
    "DATSUN",
    "DODGE",
    "DONGFENG",
    "DS",
    "DVL BOVA",
    "EAGLE",
    "EOS",
    "FAW",
    "FERRARI",
    "FOTON",
    "FREIGHTLINER",
    "FSO",
    "FUQI",
    "GMC",
    "GONOW",
    "GREAT WALL",
    "GROZ",
    "HAFEI",
    "HDC",
    "HUABEI",
    "HUANGHAI",
    "HUMMER",
    "I-VAN",
    "IFA",
    "IKARUS",
    "INFINITI",
    "INNOCENTI",
    "INTERNATIONAL",
    "ISUZU",
    "IVECO",
    "JAC",
    "JAGUAR",
    "JIANGNAN",
    "JONWAY",
    "KAROSA",
    "KARSAN",
    "KENWORTH",
    "LANCIA",
    "LAND ROVER",
    "LANDWIND",
    "LDV",
    "LEXUS",
    "LIAZ",
    "LIFAN",
    "LINCOLN",
    "MAN",
    "MASERATI",
    "MERCURY",
    "MG",
    "MINI",
    "MUDAN",
    "MUSTANG",
    "NEOPLAN",
    "NYSA",
    "OLDSMOBILE",
    "ORA",
    "PLYMOUTH",
    "POLESTAR",
    "PONTIAC",
    "PORSCHE",
    "PROTON",
    "RAVON",
    "ROBUR",
    "ROVER",
    "SAAB",
    "SAIPA",
    "SAMAND",
    "SAMSUNG",
    "SATURN",
    "SCANIA",
    "SCION",
    "SEAT",
    "SETRA",
    "SHAANXI",
    "SHAOLIN",
    "SHUANGHUAN",
    "SKYWELL",
    "SMA",
    "SMART",
    "SOUEAST",
    "SSANGYONG",
    "SUZUKI",
    "TAGAZ",
    "TALBOT",
    "TARPAN",
    "TATA",
    "TATRA",
    "TEMSA",
    "TESLA",
    "TIANMA",
    "TRABANT",
    "VANHOOL",
    "VEV",
    "WARTBURG",
    "WULING",
    "XINKAI",
    "YOUYI",
    "YUEJIN",
    "YUTONG",
    "ZASTAVA",
    "ZHONGTONG",
    "ZUK",
    "ZXAUTO",
    "BAZ",
    "BELAZ",
    "BOGDAN",
    "VAZ",
    "GAZ",
    "ZAZ",
    "ZIL",
    "IJ",
    "KAMAZ",
    "KRAZ",
    "LAZ",
    "MAZ",
    "MOTO",
    "PAZ",
    "RAF",
    "UAZ",
    "URAL",
  ];

  const years = [
    "2024",
    "2023",
    "2022",
    "2021",
    "2020",
    "2019",
    "2018",
    "2017",
    "2016",
    "2015",
    "2014",
    "2013",
    "2012",
    "2011",
    "2010",
    "2009",
    "2008",
    "2007",
    "2006",
    "2005",
    "2004",
    "2003",
    "2002",
    "2001",
    "2000",
    "1999",
    "1998",
    "1997",
    "1996",
    "1995",
    "1994",
    "1993",
    "1992",
    "1991",
    "1990",
    "1989",
    "1988",
    "1987",
    "1986",
    "1985",
  ];

  if (isLoading || isFetching) {
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
    <Box
      sx={{
        marginTop: "20px",
        marginBottom: "20px",
      }}
    >
      <Typography
        variant="h5"
        textTransform={"uppercase"}
        fontWeight={700}
        textAlign={"center"}
      >
        Edit page
      </Typography>
      <Box
        sx={{
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
          borderRadius: "8px",
          padding: "20px",
          maxWidth: "540px",
          display: "flex",
          width: "100%",
          marginTop: "20px",
          backgroundColor: "#e1bee7",
          /*  "@media (max-width: 360px)": {
            padding: "5px",
          }, */
        }}
      >
        <Box
          sx={{
            width: "100%",
          }}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <Select
              value={bodyType}
              onChange={(event) => handleChangeSelects(event, "bodyType")}
              displayEmpty
              fullWidth
              error={Boolean(bodyTypeError)}
              sx={{ background: "white" }}
            >
              <MenuItem
                value=""
                disabled
              >
                Select car body type
              </MenuItem>
              <MenuItem value={"Sedan"}>Sedan</MenuItem>
              <MenuItem value={"Wagon"}>Wagon</MenuItem>
              <MenuItem value={"Hatchback"}>Hatchback</MenuItem>
              <MenuItem value={"Suv"}>Suv</MenuItem>
              <MenuItem value={"Van"}>Van</MenuItem>
            </Select>
            {bodyTypeError && (
              <FormHelperText
                error
                sx={{ marginLeft: "15px", marginTop: "-7px" }}
              >
                {bodyTypeError}
              </FormHelperText>
            )}

            <Select
              value={carMake}
              onChange={(event) => handleChangeSelects(event, "carMake")}
              displayEmpty
              fullWidth
              error={Boolean(carMakeError)}
              sx={{ background: "white" }}
            >
              <MenuItem
                value=""
                disabled
              >
                Select car make
              </MenuItem>
              {carMakes.map((carMake) => (
                <MenuItem
                  key={carMake}
                  value={carMake}
                >
                  {carMake}
                </MenuItem>
              ))}
            </Select>
            {carMakeError && (
              <FormHelperText
                error
                sx={{ marginLeft: "15px", marginTop: "-7px" }}
              >
                {carMakeError}
              </FormHelperText>
            )}

            <TextField
              {...register("model", {
                required: "Model is required.",
                minLength: {
                  value: 2,
                  message: "Minimum 2 characters.",
                },
                maxLength: {
                  value: 16,
                  message: "Maximum 16 characters.",
                },
                pattern: {
                  value: /^[a-zA-Zа-яА-Я0-9_-]+$/,
                  message: "Only letters, numbers, hyphens, and underscores.",
                },
              })}
              fullWidth
              required
              placeholder="Model"
              name="model"
              error={Boolean(errors?.model)}
              sx={{ "& input": { background: "white", borderRadius: "4px" } }}
              helperText={
                errors?.model && <p>{errors?.model?.message as string}</p>
              }
            />

            <Select
              value={year}
              onChange={(event) => handleChangeSelects(event, "year")}
              displayEmpty
              fullWidth
              error={Boolean(yearError)}
              sx={{ background: "white" }}
            >
              <MenuItem
                value=""
                disabled
              >
                Select year
              </MenuItem>
              {years.map((year) => (
                <MenuItem
                  key={year}
                  value={year}
                >
                  {year}
                </MenuItem>
              ))}
            </Select>
            {yearError && (
              <FormHelperText
                error
                sx={{ marginLeft: "15px", marginTop: "-7px" }}
              >
                {yearError}
              </FormHelperText>
            )}

            <TextField
              {...register("price", {
                required: "Price is required.",
              })}
              fullWidth
              required
              name="price"
              type="number"
              onInput={excludeSpacesAndZero}
              autoComplete="off"
              sx={{
                "& input": {
                  background: "white",
                  borderTopLeftRadius: "0px",
                  borderBottomLeftRadius: "0px",
                  borderTopRightRadius: "4px",
                  borderBottomRightRadius: "4px",
                },
              }}
              placeholder="Price"
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="start"
                    sx={{
                      marginLeft: "-14px",
                      marginRight: "0px",
                      backgroundColor: "white",
                      borderTop: "28px dashed white",
                      borderBottom: "28px dashed white",
                      borderLeft: "14px dashed white",
                      borderRight: "12px dashed white",
                      borderTopLeftRadius: "4px",
                      borderBottomLeftRadius: "4px",
                      borderTopRightRadius: "0px",
                      borderBottomRightRadius: "0px",
                    }}
                  >
                    $
                  </InputAdornment>
                ),
              }}
              error={Boolean(errors?.price)}
              helperText={
                errors?.price && <p>{errors?.price?.message as string}</p>
              }
            />

            <TextField
              {...register("mileage", {
                required: "Mileage is required",
              })}
              fullWidth
              required
              name="mileage"
              type="number"
              onInput={excludeSpacesAndZero}
              sx={{
                "& input": {
                  background: "white",
                  borderTopLeftRadius: "4px",
                  borderBottomLeftRadius: "4px",
                  borderTopRightRadius: "0px",
                  borderBottomRightRadius: "0px",
                },
              }}
              placeholder="Mileage"
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    sx={{
                      marginRight: "-14px",
                      marginLeft: "0px",
                      backgroundColor: "white",
                      borderTop: "28px dashed white",
                      borderBottom: "28px dashed white",
                      borderLeft: "14px dashed white",
                      borderRight: "12px dashed white",
                      borderTopLeftRadius: "0px",
                      borderBottomLeftRadius: "0px",
                      borderTopRightRadius: "4px",
                      borderBottomRightRadius: "4px",
                    }}
                  >
                    Thds.km.
                  </InputAdornment>
                ),
              }}
              error={Boolean(errors?.mileage)}
              helperText={
                errors?.mileage && <p>{errors?.mileage?.message as string}</p>
              }
            />

            <Select
              value={fuelType}
              onChange={(event) => handleChangeSelects(event, "fuelType")}
              displayEmpty
              fullWidth
              error={Boolean(fuelTypeError)}
              sx={{ background: "white" }}
            >
              <MenuItem
                value=""
                disabled
              >
                Select car fuel type
              </MenuItem>
              <MenuItem value={"Petrol"}>Petrol</MenuItem>
              <MenuItem value={"Diesel"}>Diesel</MenuItem>
              <MenuItem value={"LPG"}>LPG</MenuItem>
              <MenuItem value={"LPG/Petrol"}>LPG/Petrol</MenuItem>
              <MenuItem value={"E-fuel"}>E-fuel</MenuItem>
              <MenuItem value={"Hybrid"}>Hybrid</MenuItem>
            </Select>
            {fuelTypeError && (
              <FormHelperText
                error
                sx={{ marginLeft: "15px", marginTop: "-7px" }}
              >
                {fuelTypeError}
              </FormHelperText>
            )}

            <TextField
              {...register("city", {
                required: "City is required",
                minLength: {
                  value: 2,
                  message: "Minimum 2 characters",
                },
                maxLength: {
                  value: 32,
                  message: "Maximum 32 characters",
                },
                pattern: {
                  value: /^[a-zA-Zа-яА-Я0-9_-]+$/,
                  message:
                    "Only letters, numbers, hyphens, and underscores are allowed",
                },
              })}
              fullWidth
              required
              placeholder="City"
              name="city"
              error={Boolean(errors?.city)}
              sx={{ "& input": { background: "white", borderRadius: "4px" } }}
              helperText={
                errors?.city && <p>{errors?.city?.message as string}</p>
              }
            />

            <Box>
              <TextareaAutosize
                {...register("desc")}
                style={{
                  width: "100%",
                  minHeight: "80px",
                  padding: "10px",
                }}
                name="desc"
                placeholder="Description"
              />
            </Box>

            <AttachFiles
              selectedFiles={selectedFiles}
              setSelectedFiles={setSelectedFiles}
            />

            <Button
              sx={{ marginTop: "10px" }}
              type="submit"
              disabled={!isValid || selectedFiles.length === 0}
              fullWidth
              variant="contained"
              color="secondary"
            >
              Publish
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default EditPage;
