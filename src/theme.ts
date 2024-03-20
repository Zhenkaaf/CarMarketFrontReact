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
      xs: 600,
      sm: 768,
      md: 1024,
      lg: 1536,
      xl: 1800,
    },
  },
});
