import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme.ts";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  /*  <React.StrictMode> */
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
      />
    </Provider>
  </ThemeProvider>
  /*  </React.StrictMode> */
);
