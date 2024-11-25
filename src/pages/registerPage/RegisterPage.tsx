import { useEffect, useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Box,
  useTheme,
  Link,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/redux-hooks";
import {
  registrationAct,
  resetRegisterError,
} from "../../redux/user/userSlice";
import { IRegisterUserData } from "../../types";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";
import { phoneNumberValidation } from "../../helpers/phoneNumberValidation.helper";
import { setWelcomeToastShown } from "../../redux/toast/toastSlice";

const RegistrationPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isUserAuth = useAppSelector((state) => state.userRed.isUserAuth);
  const registerError = useAppSelector((state) => state.userRed.registerError);
  const isUserLoading = useAppSelector((state) => state.userRed.isUserLoading);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPass, setShowConfirmPass] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>("+380");
  const welcomeToastShown = useAppSelector(
    (state) => state.toastRed.welcomeToastShown
  );
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    watch,
    setValue,
  } = useForm({
    mode: "onChange",
  });

  const watchPassword = watch("password", "");

  useEffect(() => {
    if (isUserAuth) {
      reset();
      setPhoneNumber("+380");
      navigate("/cabinet");
      if (!welcomeToastShown) {
        toast.success("Account has been created");
        dispatch(setWelcomeToastShown(true));
      }
    }
    if (registerError) {
      toast.error(registerError);
    }
  }, [isUserAuth, navigate, reset, registerError, welcomeToastShown, dispatch]);

  const onSubmit = (registerData: FieldValues) => {
    const userData: IRegisterUserData = {
      name: registerData.name,
      email: registerData.email,
      password: registerData.password,
      confirmPassword: registerData.confirmPassword,
      phoneNumber: registerData.phoneNumber,
    };
    dispatch(registrationAct(userData));
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
  if (isUserLoading) {
    return <Spinner open={true} />;
  }

  if (isUserLoading) {
    return <Spinner open={isUserLoading} />;
  }

  return (
    <>
      {!isUserAuth && (
        <Box
          sx={{
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
            borderRadius: "8px",
            padding: "20px",
            maxWidth: "400px",
            marginTop: "40px",
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Box>
            <Typography
              component="h1"
              variant="h5"
              align="center"
              textTransform="uppercase"
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
                autoComplete="off"
                color="info"
                label="Name"
                name="name"
                error={Boolean(errors?.name)}
                helperText={
                  errors?.name ? (errors.name.message as string) : null
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
                autoComplete="off"
                color="info"
                label="Email"
                name="email"
                type="email"
                onInput={excludeSpaces}
                error={Boolean(errors?.email)}
                helperText={
                  errors?.email ? (errors.email.message as string) : null
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
                color="info"
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                onInput={excludeSpaces}
                error={Boolean(errors.password)}
                helperText={
                  errors?.password ? (errors.password.message as string) : null
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
                color="info"
                label="Confirm Password"
                name="confirmPassword"
                type={showConfirmPass ? "text" : "password"}
                onInput={excludeSpaces}
                error={Boolean(errors.confirmPassword)}
                helperText={
                  errors?.confirmPassword
                    ? (errors.confirmPassword.message as string)
                    : null
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          togglePasswordsVisible("confirmPassword")
                        }
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
                autoComplete="off"
                color="info"
                error={Boolean(errors.phoneNumber)}
                helperText={
                  errors?.phoneNumber
                    ? (errors.phoneNumber.message as string)
                    : null
                }
                onInput={phoneNumberInput}
              />
              <Button
                sx={{
                  marginTop: "10px",
                  marginBottom: "20px",
                  "&:hover": {
                    backgroundColor: `${theme.palette.secondary.light}`,
                  },
                }}
                type="submit"
                disabled={!isValid}
                fullWidth
                variant="contained"
                color="secondary"
              >
                Registration
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
                  component={RouterLink}
                  sx={{
                    textDecoration: "none",
                    color: theme.palette.secondary.main,
                    "&:hover": {
                      color: theme.palette.secondary.light,
                      textDecoration: "underline",
                    },
                  }}
                  to="/login"
                  onClick={() => dispatch(resetRegisterError())}
                >
                  {" "}
                  Log In
                </Link>
              </Typography>
            </form>
          </Box>
        </Box>
      )}
    </>
  );
};

export default RegistrationPage;
