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

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPass, setShowConfirmPass] = useState<boolean>(false);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    setValue,
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (data: FieldValues) => {
    console.log(JSON.stringify(data));
    reset();
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

          <Button
            style={{ marginTop: "10px", marginBottom: "20px" }}
            type="submit"
            disabled={!isValid}
            fullWidth
            variant="contained"
            color="primary"
          >
            Login
          </Button>
          <Typography align="center">
            Do not have an account?
            <Link
              to="/registration"
              style={linkStyle}
            >
              {" "}
              Registration
            </Link>
          </Typography>
        </form>
      </div>
    </Container>
  );
};

export default LoginPage;
