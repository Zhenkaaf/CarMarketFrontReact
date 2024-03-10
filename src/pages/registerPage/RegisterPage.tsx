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
} from "@mui/material";
import { linkStyle } from "../../globalStyles";
import { useAppDispatch, useAppSelector } from "../../redux/redux-hooks";
import { registrationAct } from "../../redux/user/userSlice";
import { IRegisterUserData } from "../../types";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";
import { phoneNumberValidation } from "../../helpers/phoneNumberValidation.helper";

const RegistrationPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isUserAuth = useAppSelector((state) => state.userRed.isUserAuth);
  const registerError = useAppSelector((state) => state.userRed.registerError);
  const isUserLoading = useAppSelector((state) => state.userRed.isUserLoading);
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

  useEffect(() => {
    if (isUserAuth) {
      toast.success("Account has been created");
      reset();
      setPhoneNumber("+380");
      navigate("/");
    }
    if (registerError) {
      toast.error(registerError);
    }
  }, [isUserAuth, navigate, reset, registerError]);

  const onSubmit = async (registerData: FieldValues) => {
    const userData: IRegisterUserData = {
      name: registerData.name,
      email: registerData.email,
      password: registerData.password,
      confirmPassword: registerData.confirmPassword,
      phoneNumber: registerData.phoneNumber,
    };
    await dispatch(registrationAct(userData));
  };

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

  const phoneNumberInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const validatedPhoneNumber = phoneNumberValidation(event);
    setPhoneNumber(validatedPhoneNumber);
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
            onInput={phoneNumberInput}
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
          <Box>
            {registerError && (
              <Typography
                align="center"
                color="error"
                sx={{ marginBottom: "10px" }}
                component="div"
              >
                {registerError}
              </Typography>
            )}
          </Box>
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
