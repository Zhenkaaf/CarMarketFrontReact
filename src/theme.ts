import { createTheme } from "@mui/material/styles";

import { orange, purple } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: orange[500],
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
