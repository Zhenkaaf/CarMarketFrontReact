import { useEffect, useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Box,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import { linkStyle } from "../../globalStyles";
import { useAppDispatch, useAppSelector } from "../../redux/redux-hooks";
import { registrationAct } from "../../redux/user/userSlice";
import { IRegisterUserData } from "../../types";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";

const RegistrationPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isUserAuth = useAppSelector((state) => state.userRed.isUserAuth);
  const registerError = useAppSelector((state) => state.userRed.registerError);
  const isUserLoading = useAppSelector((state) => state.userRed.isUserLoading);
  console.error("ERROR", registerError);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPass, setShowConfirmPass] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>("+380");
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    watch,
    setValue,
  } = useForm({
    mode: "onBlur",
  });

  const watchPassword = watch("password", "");

  /*   useEffect(() => {
    console.log("useEffect");
    if (isUserAuth) {
      navigate("/");
    }
  }, [isUserAuth]); */

  const onSubmit = async (userData: IRegisterUserData) => {
    console.log("dispatch*START");
    await dispatch(registrationAct(userData));
    console.log("dispatch*END");
    console.log("success*START");
    toast.success("Account has been created");
    console.log("success*END");
    console.log("resetData*START");
    reset();
    setPhoneNumber("+380");
    console.log("resetData*END");
    console.log("navigate*START");
    navigate("/");
    console.log("navigate*END");
  };
  /*   const onSubmit = async (userData: IRegisterUserData) => {
    try {
      const response = await dispatch(registerAct(userData));
      console.log(response);
      if (response.payload && response.payload.status === 201) {
        // Assuming 201 is the success status code
        toast.success("Account has been created");
        console.log("onSubmitAfterDispatch*2");
        reset();
        setPhoneNumber("+380");
        console.log("reset and setPhoneNumber");
      } else {
        toast.error("Failed to create account. Please try again later."); // Show error message if status code is not 201
      }
    } catch (err) {
      toast.error("An error occurred while processing your request."); // Show error message if an exception occurs
    }
  }; */

  const excludeSpaces = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.replace(/\s/g, "");
    setValue(event.target.name, inputValue);
  };

  const togglePasswordsVisible = (field: string) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else if (field === "confirmPassword") {
      setShowConfirmPass(!showConfirmPass);
    }
  };

  const phoneNumberValidation = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let inputValue = event.target.value;
    inputValue = inputValue.replace(/[^0-9+]|(?<=\+.*?)[^0-9]/g, "");

    if (inputValue.length < 4) {
      inputValue = "+380";
    }
    if (inputValue.length > 13) {
      inputValue = inputValue.slice(0, 13);
    }
    setPhoneNumber(inputValue);
  };

  return (
    <Box
      sx={{
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
        borderRadius: "8px",
        padding: "20px",
        width: "400px",
        backgroundColor: "white",
      }}
    >
      <Box>
        <Spinner open={isUserLoading} />
        <Typography
          component="h1"
          variant="h5"
          align="center"
          sx={{
            paddingBottom: "20px",
          }}
        >
          REGISTRATION
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register("name", {
              required: "Name is required",
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
            sx={{ marginBottom: "20px" }}
            fullWidth
            required
            label="Name"
            name="name"
            error={Boolean(errors?.name)}
            helperText={
              errors?.name && <p>{errors?.name?.message as string}</p>
            }
          />
          <TextField
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              },
            })}
            sx={{ marginBottom: "20px" }}
            required
            fullWidth
            label="Email"
            name="email"
            type="email"
            onInput={excludeSpaces}
            error={Boolean(errors?.email)}
            helperText={
              errors?.email && <p>{errors?.email?.message as string}</p>
            }
          />
          <TextField
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Minimum 6 characters",
              },
              maxLength: {
                value: 16,
                message: "Maximum 16 characters",
              },
              pattern: {
                value: /^[^\s]+$/,
                message: "Spaces are not allowed",
              },
            })}
            sx={{ marginBottom: "20px" }}
            required
            fullWidth
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            onInput={excludeSpaces}
            error={Boolean(errors.password)}
            helperText={
              errors?.password && <p>{errors?.password?.message as string}</p>
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => togglePasswordsVisible("password")}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            {...register("confirmPassword", {
              required: "Please confirm your password",
              pattern: {
                value: /^[^\s]+$/,
                message: "Spaces are not allowed",
              },
              validate: (value) =>
                value === watchPassword || "Passwords do not match",
            })}
            sx={{ marginBottom: "20px" }}
            required
            fullWidth
            label="Confirm Password"
            name="confirmPassword"
            type={showConfirmPass ? "text" : "password"}
            onInput={excludeSpaces}
            error={Boolean(errors.confirmPassword)}
            helperText={
              errors?.confirmPassword && (
                <p>{errors?.confirmPassword?.message as string}</p>
              )
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => togglePasswordsVisible("confirmPassword")}
                    edge="end"
                  >
                    {showConfirmPass ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            {...register("phoneNumber", {
              required: "Phone Number is required",
              minLength: {
                value: 13,
                message: "Must be 13 characters",
              },
            })}
            sx={{ marginBottom: "20px" }}
            fullWidth
            label="Phone Number"
            name="phoneNumber"
            value={phoneNumber}
            required
            error={Boolean(errors.phoneNumber)}
            helperText={
              errors?.phoneNumber && (
                <p>{errors?.phoneNumber?.message as string}</p>
              )
            }
            onInput={phoneNumberValidation}
          />
          <Button
            sx={{ marginTop: "10px", marginBottom: "20px" }}
            type="submit"
            disabled={!isValid}
            fullWidth
            variant="contained"
            color="primary"
          >
            Register
          </Button>
          <Typography align="center">
            Already have an account?
            <Link
              to="/login"
              style={linkStyle}
            >
              {" "}
              Log In
            </Link>
          </Typography>
        </form>
      </Box>
    </Box>
  );
};

export default RegistrationPage;
