import { useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { Link } from "react-router-dom";
import { linkStyle } from "../../globalStyles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  TextField,
  Container,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";

const RegistrationPage = () => {
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

  const onSubmit = (data: FieldValues) => {
    console.log(JSON.stringify(data));
    reset();
    setPhoneNumber("+380");
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
    <Container
      component="main"
      maxWidth="xs"
      style={{
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
        borderRadius: "8px",
        paddingBottom: "20px",
        paddingTop: "20px",
        marginTop: "20px",
      }}
    >
      <div>
        <Typography
          component="h1"
          variant="h5"
          align="center"
          style={{
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
            style={{ marginBottom: "20px" }}
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
            style={{ marginBottom: "20px" }}
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
            style={{ marginBottom: "20px" }}
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
            style={{ marginBottom: "20px" }}
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
            style={{ marginBottom: "20px" }}
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
            style={{ marginTop: "10px", marginBottom: "20px" }}
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
      </div>
    </Container>
  );
};

export default RegistrationPage;
