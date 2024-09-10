import { useNavigate, useParams } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  FormHelperText,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  TextareaAutosize,
  Typography,
  Tooltip,
} from "@mui/material";
import { useDisableNumberInputWheel } from "../../helpers/useDisableNumberInputWheel";
import { excludeSpacesAndZero } from "../../helpers/excludeSpacesAndZero";
import {
  useAddPhotosToCarMutation,
  useGetCarQuery,
  useUpdateCarMutation,
} from "../../redux/carsApi";
import AttachFiles from "../../components/attachFiles/AttachFiles";
import Spinner from "../../components/Spinner";
import { CAR_MAKES, YEARS } from "../../constants/constans";
import { ICarData, IFormValues, IInitTxtFieldsValues } from "../../types";

const EditPage = () => {
  console.log("RENDEREDITPAGE**************");
  useDisableNumberInputWheel();
  const { carId } = useParams<{ carId: string }>();
  const [updateCar, { error: updateCarError, isLoading: isUpdating }] =
    useUpdateCarMutation();

  const [
    addPhotosToCar,
    { error: addPhotosError, isLoading: isAddPhotosLoading },
  ] = useAddPhotosToCarMutation();

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
    watch,
  } = useForm<IFormValues>({
    mode: "onChange",
    reValidateMode: "onChange",
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
  const [mainPhotoId, setMainPhotoId] = useState("");
  const initialMainPhotoIdRef = useRef<null | string>(null);
  const [initTxtFieldsValues, setInitTxtFieldsValues] =
    useState<IInitTxtFieldsValues | null>(null);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [allInitValuesSet, setAllInitValuesSet] = useState(false);
  const [existingPhotos, setExistingPhotos] = useState<
    { id: string; url: string }[]
  >([]);
  const [newFilesToUpload, setNewFilesToUpload] = useState<
    { id: string; file: File; url: string }[]
  >([]);
  const [filesToDelete, setFilesToDelete] = useState<
    { id: string; url: string }[]
  >([]);
  const [spinnerState, setSpinnerState] = useState<boolean>(false);

  useEffect(() => {
    if (initialMainPhotoIdRef.current === null && mainPhotoId) {
      initialMainPhotoIdRef.current = mainPhotoId;
    }
  }, [mainPhotoId]);

  useEffect(() => {
    if (singleCar) {
      setBodyType(singleCar.bodyType || "");
      setCarMake(singleCar.carMake || "");
      setYear(singleCar.year || "");
      setFuelType(singleCar.fuelType || "");
      setExistingPhotos(singleCar.photos || []);
      setValue("model", singleCar.model || "");
      setValue("price", singleCar.price || 0);
      setValue("mileage", singleCar.mileage || 0);
      setValue("city", singleCar.city || "");
      setValue("desc", singleCar.desc || "");
      setInitTxtFieldsValues({
        model: singleCar.model || "",
        price: singleCar.price || 0,
        mileage: singleCar.mileage || 0,
        city: singleCar.city || "",
        desc: singleCar.desc || "",
      });

      setAllInitValuesSet(true);
    }
  }, [singleCar, setValue]);

  const [watchModel, watchPrice, watchMileage, watchCity, watchDesc] = watch([
    "model",
    "price",
    "mileage",
    "city",
    "desc",
  ]);

  useEffect(() => {
    if (initTxtFieldsValues && allInitValuesSet) {
      const isChanged =
        watchModel !== initTxtFieldsValues.model ||
        +watchPrice !== initTxtFieldsValues.price ||
        +watchMileage !== initTxtFieldsValues.mileage ||
        watchCity !== initTxtFieldsValues.city ||
        watchDesc !== initTxtFieldsValues.desc;
      setIsFormChanged(isChanged);
    }
  }, [
    watchModel,
    watchPrice,
    watchMileage,
    watchCity,
    watchDesc,
    initTxtFieldsValues,
    allInitValuesSet,
  ]);

  const handleUpdateCar = async (formValues: FieldValues) => {
    /*  if (existingPhotos.length < 0) {
      alert("please select a file");
      return;
    } */
    const formData = new FormData();
    newFilesToUpload.forEach(({ file, id }) => {
      formData.append("photos", file);
      //использование "[]" в ключе при добавлении данных в FormData влияет на то, как эти данные интерпретируются на сервере
      formData.append("photoIds[]", id);
    });

    const updatedCar: ICarData = {
      city: formValues.city,
      desc: formValues.desc,
      mileage: +formValues.mileage,
      model: formValues.model,
      price: +formValues.price,
      bodyType,
      carMake,
      year,
      fuelType,
      photosToDelete: filesToDelete,
    };
    console.log("updatedCar", updatedCar);
    console.log("formData", formData);
    try {
      setSpinnerState(true);
      const updatedCarRes = await updateCar({ id: carId, updatedCar }).unwrap();
      if (updatedCarRes.status === "success") {
        if (newFilesToUpload.length > 0 || mainPhotoId) {
          const addPhotosRes = await addPhotosToCar({
            carId,
            mainPhotoId,
            formData,
          }).unwrap();
          console.log("addPhotosRes", addPhotosRes);
        }
        reset();
        setSpinnerState(false);
        toast.success(`Car has been successfully updated`);
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
    const value = event.target.value;
    if (selectType === "bodyType") {
      setBodyType(value);
      setValue("bodyType", value, { shouldValidate: true });
      setBodyTypeError("");
    } else if (selectType === "carMake") {
      setCarMake(value);
      setValue("carMake", value, { shouldValidate: true });
      setCarMakeError("");
    } else if (selectType === "year") {
      setYear(value);
      setValue("year", value, { shouldValidate: true });
      setYearError("");
    } else if (selectType === "fuelType") {
      setFuelType(value);
      setValue("fuelType", value, { shouldValidate: true });
      setFuelTypeError("");
    }
    setIsFormChanged(true);
  };

  if (isLoading || isFetching || spinnerState || !singleCar) {
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
        }}
      >
        <Box
          sx={{
            width: "100%",
          }}
        >
          <form
            onSubmit={handleSubmit(handleUpdateCar)}
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
              inputMode="numeric"
              //onInput={excludeSpacesAndZero}
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
              inputMode="numeric"
              //onInput={excludeSpacesAndZero}
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
              helperText={errors?.city ? (errors.city.message as string) : null}
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
              existingPhotos={existingPhotos}
              setNewFilesToUpload={setNewFilesToUpload}
              filesToDelete={filesToDelete}
              setFilesToDelete={setFilesToDelete}
              setMainPhotoId={setMainPhotoId}
            />
            <Tooltip
              title="Please make at least one change."
              disableHoverListener={isValid && isFormChanged}
              disableInteractive
              arrow
            >
              <span>
                <Button
                  sx={{ marginTop: "10px" }}
                  type="submit"
                  //будет активна, если одно из условий истинно.
                  disabled={
                    !(
                      (isValid && isFormChanged) ||
                      filesToDelete.length ||
                      newFilesToUpload.length ||
                      (initialMainPhotoIdRef.current &&
                        mainPhotoId !== initialMainPhotoIdRef.current)
                    )
                  }
                  fullWidth
                  variant="contained"
                  color="secondary"
                >
                  Update
                </Button>
              </span>
            </Tooltip>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default EditPage;
