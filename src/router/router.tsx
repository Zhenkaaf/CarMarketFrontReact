import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import RegistrationPage from "../pages/registerPage/RegisterPage";
import HomePage from "../pages/homePage/HomePage";
import LoginPage from "../pages/loginPage/LoginPage";
import { ProtectedRoute } from "../components/ProtectedRoute";
import PostAdvertPage from "../pages/postAdvertPage/PostAdvertPage";
import CabinetPage from "../pages/cabinetPage/CabinetPage";
import SingleAdvertPage from "../pages/singleAdvertPage/SingleAdvertPage";

export const router = createBrowserRouter([
  {
    path: "/CarMarketFrontReact/",
    element: <Layout />,

    children: [
      {
        path: "/CarMarketFrontReact/",
        element: <HomePage />,
      },
      {
        path: "/CarMarketFrontReact/single-car/:carId",
        element: <SingleAdvertPage />,
      },
      {
        path: "/CarMarketFrontReact/registration",
        element: <RegistrationPage />,
      },
      {
        path: "/CarMarketFrontReact/login",
        element: <LoginPage />,
      },
      {
        path: "/CarMarketFrontReact/post-advert",
        element: (
          <ProtectedRoute>
            <PostAdvertPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/CarMarketFrontReact/cabinet",
        element: (
          <ProtectedRoute>
            <CabinetPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
