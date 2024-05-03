import { createTheme } from "@mui/material/styles";

import { purple } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: purple[700],
    },
    secondary: {
      main: "#ff4500",
      /*   main: orange[900], */
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
