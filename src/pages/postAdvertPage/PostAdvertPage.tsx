import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  FormHelperText,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  TextareaAutosize,
  Tooltip,
  Typography,
} from "@mui/material";
import Spinner from "../../components/Spinner";
import AttachFilesCreate from "../../components/attachFiles/AttachFilesCreate";
import {
  useAddCarMutation,
  useAddPhotosToCarMutation,
} from "../../redux/carsApi";
import { CAR_MAKES, YEARS } from "../../constants/constans";
import { useDisableNumberInputWheel } from "../../helpers/useDisableNumberInputWheel";
import { ICarData, IFormValues } from "../../types";
import { excludeSpacesAndZero } from "../../helpers/excludeSpacesAndZero";

interface IFileWithId {
  file: File;
  id: string;
}

const PostAdvertPage = () => {
  console.log("renderPostAdvertPage");
  useDisableNumberInputWheel();
  const [
    addCar,
    { error: addCarError, isLoading: isAddCarLoading, reset: resetCarError },
  ] = useAddCarMutation();

  const [
    addPhotosToCar,
    { error: addPhotosError, isLoading: isAddPhotosLoading },
  ] = useAddPhotosToCarMutation();

  const navigate = useNavigate();
  const [bodyType, setBodyType] = useState("");
  const [bodyTypeError, setBodyTypeError] = useState<string>("");
  const [carMake, setCarMake] = useState("");
  const [carMakeError, setCarMakeError] = useState<string>("");
  const [year, setYear] = useState("");
  const [yearError, setYearError] = useState<string>("");
  const [fuelType, setFuelType] = useState("");
  const [fuelTypeError, setFuelTypeError] = useState<string>("");
  const [region, setRegion] = useState("");
  const [regionError, setRegionError] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<IFileWithId[]>([]);
  const [spinnerState, setSpinnerState] = useState<boolean>(false);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    setValue,
  } = useForm<IFormValues>({
    mode: "onChange",
  });

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
    if (!region) {
      setRegionError("Please select region.");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach(({ file, id }) => {
      formData.append("photos", file);
      //использование "[]" в ключе при добавлении данных в FormData влияет на то, как эти данные интерпретируются на сервере
      formData.append("photoIds[]", id);
    });
    /* console.log("formData********", formData);
    formData.forEach((value, key) => {
      console.log("key--", key, "value--", value);
    }); */
    const newCar: ICarData = {
      desc: carData.desc,
      mileage: +carData.mileage,
      model: carData.model,
      price: +carData.price,
      bodyType,
      carMake,
      year,
      fuelType,
      region,
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

  if (spinnerState /* isAddCarLoading || isAddPhotosLoading */) {
    return <Spinner open={true} />;
  }

  if (addCarError) {
    console.log(addCarError);
    return (
      <>
        <Box sx={{ fontSize: "24px", fontWeight: "bold", marginTop: "50px" }}>
          Something went wrong, unable to post advert.
        </Box>
        <Button
          onClick={() => {
            resetCarError();
          }}
        >
          Try again
        </Button>
      </>
    );
  }

  if (addPhotosError) {
    console.log(addPhotosError);
    return (
      <Box sx={{ fontSize: "24px", fontWeight: "bold", marginTop: "50px" }}>
        Something went wrong, photos were not uploaded.
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
        Post advert
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
              onChange={(event) => {
                setBodyType(event.target.value);
                setBodyTypeError("");
              }}
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
              onChange={(event) => {
                setCarMake(event.target.value);
                setCarMakeError("");
              }}
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
              {CAR_MAKES.map((carMake) => (
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
                errors?.model ? (errors.model.message as string) : null
              }
            />

            <Select
              value={year}
              onChange={(event) => {
                setYear(event.target.value);
                setYearError("");
              }}
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
              {YEARS.map((year) => (
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
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                excludeSpacesAndZero(event, setValue)
              }
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
                errors?.price ? (errors.price.message as string) : null
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
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                excludeSpacesAndZero(event, setValue)
              }
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
                errors?.mileage ? (errors.mileage.message as string) : null
              }
            />

            <Select
              value={fuelType}
              onChange={(event) => {
                setFuelType(event.target.value);
                setFuelTypeError("");
              }}
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

            <Select
              value={region}
              onChange={(event) => {
                setRegion(event.target.value);
                setRegionError("");
              }}
              displayEmpty
              fullWidth
              error={Boolean(regionError)}
              sx={{ background: "white" }}
            >
              <MenuItem
                value=""
                disabled
              >
                Region
              </MenuItem>
              <MenuItem value={"Cherkasy"}>Cherkasy</MenuItem>
              <MenuItem value={"Chernihiv"}>Chernihiv</MenuItem>
              <MenuItem value={"Chernivtsi"}>Chernivtsi</MenuItem>
              <MenuItem value={"Dnipropetrovsk"}>Dnipropetrovsk</MenuItem>
              <MenuItem value={"Donetsk"}>Donetsk</MenuItem>
              <MenuItem value={"Ivano-Frankivsk"}>Ivano-Frankivsk</MenuItem>
              <MenuItem value={"Kharkiv"}>Kharkiv</MenuItem>
              <MenuItem value={"Kherson"}>Kherson</MenuItem>
              <MenuItem value={"Khmelnytskyi"}>Khmelnytskyi</MenuItem>
              <MenuItem value={"Kiev"}>Kiev</MenuItem>
              <MenuItem value={"Kirovohrad"}>Kirovohrad</MenuItem>
              <MenuItem value={"Luhansk"}>Luhansk</MenuItem>
              <MenuItem value={"Lviv"}>Lviv</MenuItem>
              <MenuItem value={"Mykolaiv"}>Mykolaiv</MenuItem>
              <MenuItem value={"Odessa"}>Odessa</MenuItem>
              <MenuItem value={"Poltava"}>Poltava</MenuItem>
              <MenuItem value={"Rivne"}>Rivne</MenuItem>
              <MenuItem value={"Sumy"}>Sumy</MenuItem>
              <MenuItem value={"Ternopil"}>Ternopil</MenuItem>
              <MenuItem value={"Vinnytsia"}>Vinnytsia</MenuItem>
              <MenuItem value={"Volyn"}>Volyn</MenuItem>
              <MenuItem value={"Zakarpattia"}>Zakarpattia</MenuItem>
              <MenuItem value={"Zaporizhia"}>Zaporizhia</MenuItem>
              <MenuItem value={"Zhytomyr"}>Zhytomyr</MenuItem>
            </Select>
            {regionError && (
              <FormHelperText
                error
                sx={{ marginLeft: "15px", marginTop: "-7px" }}
              >
                {regionError}
              </FormHelperText>
            )}
            {/* <TextField
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
              helperText={errors?.city ? (errors.city.message as string) : null}
            /> */}

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

            <AttachFilesCreate
              selectedFiles={selectedFiles}
              setSelectedFiles={setSelectedFiles}
            />
            <Tooltip
              title="Please fill in all fields and add at least one photo."
              disableHoverListener={isValid && selectedFiles.length > 0}
              disableInteractive
              arrow
            >
              <span>
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
              </span>
            </Tooltip>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default PostAdvertPage;
