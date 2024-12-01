import App from "./App";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { store, RootState } from "./redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { darkTheme, lightTheme } from "./theme";
import { useAppSelector } from "./redux/redux-hooks";

const ThemeWrapper = () => {
  const theme = useAppSelector((state: RootState) =>
    state.themeRed.isDarkTheme ? darkTheme : lightTheme
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: theme.palette.background.default,
          },
        }}
      />
      <App />
    </ThemeProvider>
  );
};

const Root = () => {
  return (
    <Provider store={store}>
      <ThemeWrapper />
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
      />
    </Provider>
  );
};

export default Root;
