import { useEffect, useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { linkStyle } from "../../globalStyles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Box,
  useTheme,
} from "@mui/material";
import { loginAct, resetLoginError } from "../../redux/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../redux/redux-hooks";
import { ILoginUserData } from "../../types";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";

const LoginPage = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const isUserAuth = useAppSelector((state) => state.userRed.isUserAuth);
  console.log("isUserAuth", isUserAuth);
  const loginError = useAppSelector((state) => state.userRed.loginError);
  const isUserLoading = useAppSelector((state) => state.userRed.isUserLoading);
  console.log("isUserLoading", isUserLoading);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPass, setShowConfirmPass] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    setValue,
  } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    if (isUserAuth) {
      toast.success("Welcome to CarMarket");
      reset();
      navigate("/cabinet");
    }
    if (loginError) {
      toast.error(loginError);
    }
  }, [isUserAuth, loginError, navigate, reset]);

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

  return (
    <Box
      sx={{
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
        borderRadius: "8px",
        padding: "20px",
        maxWidth: "400px",
        marginTop: "50px",
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <Spinner open={isUserLoading} />
      <Box>
        <Typography
          component="h1"
          variant="h5"
          align="center"
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
            sx={{ marginBottom: "20px", backgroundColor: "gray" }}
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
            sx={{ marginBottom: "20px", backgroundColor: "red" }}
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

          <Button
            sx={{
              marginTop: "10px",
              marginBottom: "20px",
              width: "100%",
              "&:hover": {
                backgroundColor: "#ff4500",
              },
              "&.Mui-disabled": {
                backgroundColor: "#757575",
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
              to="/registration"
              style={linkStyle}
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
  );
};

export default LoginPage;
