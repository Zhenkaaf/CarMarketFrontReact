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
import { loginAct, resetLoginError } from "../../redux/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../redux/redux-hooks";
import { ILoginUserData } from "../../types";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";
import { setWelcomeToastShown } from "../../redux/toast/toastSlice";

const LoginPage = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const isUserAuth = useAppSelector((state) => state.userRed.isUserAuth);
  console.log("isUserAuth", isUserAuth);
  const loginError = useAppSelector((state) => state.userRed.loginError);
  console.log("loginError", loginError);
  const isUserLoading = useAppSelector((state) => state.userRed.isUserLoading);
  console.log("isUserLoading", isUserLoading);
  const welcomeToastShown = useAppSelector(
    (state) => state.toastRed.welcomeToastShown
  );
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPass, setShowConfirmPass] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    setValue,
  } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    if (isUserAuth) {
      navigate("/cabinet");
      if (!welcomeToastShown) {
        toast.success("Welcome to your cabinet");
        dispatch(setWelcomeToastShown(true));
      }
    }
    if (loginError) {
      toast.error(loginError);
    }
  }, [isUserAuth, loginError, navigate, dispatch, welcomeToastShown]);

  const onSubmit = (loginData: FieldValues) => {
    const userData: ILoginUserData = {
      email: loginData.email,
      password: loginData.password,
    };
    dispatch(loginAct(userData));
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

  if (isUserLoading) {
    return <Spinner open={true} />;
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
              LOGIN
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Invalid email address",
                  },
                })}
                sx={{
                  marginBottom: "20px",
                }}
                autoComplete="off"
                required
                fullWidth
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
                sx={{
                  marginBottom: "20px",
                }}
                color="info"
                required
                fullWidth
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

              <Button
                sx={{
                  marginTop: "10px",
                  marginBottom: "20px",
                  width: "100%",
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
                Login
              </Button>
              <Box>
                {loginError && (
                  <Typography
                    align="center"
                    color="error"
                    sx={{ marginBottom: "10px" }}
                    component="div"
                  >
                    {loginError}
                  </Typography>
                )}
              </Box>
              <Typography align="center">
                Do not have an account?
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
                  to="/registration"
                  onClick={() => {
                    dispatch(resetLoginError());
                  }}
                >
                  {" "}
                  Registration
                </Link>
              </Typography>
            </form>
          </Box>
        </Box>
      )}
    </>
  );
};

export default LoginPage;
