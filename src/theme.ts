import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  typography: {
    fontFamily: "'Rubik', sans-serif",
  },
  palette: {
    mode: "light",
    primary: {
      main: "#fff",
    },
    secondary: {
      main: "#da3b00",
      light: "#ff4500",
    },
    info: {
      main: "#8e8d8a",
    },
    background: {
      default: "#eae7dc",
      paper: "#d8c3a5",
    },
    text: {
      primary: "#000000",
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
    /*  primary: {
      main: "#000",
      light: "#dcdcdc",
    }, */
    secondary: {
      main: "#da3b00",
      light: "#ff4500",
    },
    info: {
      main: "#dcdcdc",
    },
    background: {
      default: "#515151",
      paper: "#000",
    },
    text: {
      primary: "#dcdcdc",
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
