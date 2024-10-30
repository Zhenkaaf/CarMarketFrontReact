import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  typography: {
    fontFamily: "'Rubik', sans-serif",
  },
  palette: {
    mode: "light",
    primary: {
      main: "#310062",
    },
    secondary: {
      main: "#da3b00",
    },
    background: {
      default: "#ffffff",
      paper: "#f5f5f5",
    },
    text: {
      primary: "#000000",
      secondary: "#333333",
    },
  },
  breakpoints: {
    values: {
      xs: 480,
      sm: 768,
      md: 900,
      lg: 1024,
      xl: 1800,
    },
  },
});

export const darkTheme = createTheme({
  typography: {
    fontFamily: "'Rubik', sans-serif",
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#000",
    },
    secondary: {
      main: "#da3b00",
      light: "#ff4500",
    },
    background: {
      default: "rgba(26, 26, 26, 0.75)",
      paper: "#111",
    },
    text: {
      primary: "#dcdcdc",
      secondary: "#848484",
    },
  },
  breakpoints: {
    values: {
      xs: 480,
      sm: 768,
      md: 900,
      lg: 1024,
      xl: 1800,
    },
  },
});
