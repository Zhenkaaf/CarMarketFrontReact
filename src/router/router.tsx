import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import RegistrationPage from "../pages/registerPage/RegisterPage";
import HomePage from "../pages/homePage/HomePage";
import LoginPage from "../pages/loginPage/LoginPage";
import { ProtectedRoute } from "../components/ProtectedRoute";
import PostAdvertPage from "../pages/postAdvertPage/PostAdvertPage";
import CabinetPage from "../pages/cabinetPage/CabinetPage";
import SingleAdvertPage from "../pages/singleAdvertPage/SingleAdvertPage";
import EditPage from "../pages/editPage/EditPage";
import SearchByParametersPage from "../pages/SearchByParametersPage/SearchByParametersPage";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,

      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "single-car/:carId",
          element: <SingleAdvertPage />,
        },
        {
          path: "registration",
          element: <RegistrationPage />,
        },
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "search",
          element: <SearchByParametersPage />,
        },
        {
          path: "post-advert",
          element: (
            <ProtectedRoute>
              <PostAdvertPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "cabinet",
          element: (
            <ProtectedRoute>
              <CabinetPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "/edit-car/:carId",
          element: (
            <ProtectedRoute>
              <EditPage />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ],
  {
    basename: "/CarMarketFrontReact",
  }
);
