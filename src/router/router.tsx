import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import RegistrationPage from "../pages/registerPage/RegisterPage";
import HomePage from "../pages/homePage/HomePage";
import LoginPage from "../pages/loginPage/LoginPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,

    children: [
      {
        index: true,
        element: <HomePage />,
      },

      {
        path: "registration",
        element: <RegistrationPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
]);
