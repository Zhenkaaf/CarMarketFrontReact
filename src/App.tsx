import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./router/router";
import { useAppDispatch } from "./redux/redux-hooks";
import { getTokenFromLocalStorage } from "./helpers/localStorage.helper";
import { useEffect } from "react";
import { getProfileAct } from "./redux/user/userSlice";

function App() {
  const dispatch = useAppDispatch();

  /*   useEffect(() => {
    const token = getTokenFromLocalStorage();
    if (token) {
      dispatch(getProfileAct());
    }
  }, []); */

  /*   const checkAuth = async () => {
    const token = getTokenFromLocalStorage();
    try {
      if (token) {
        const data = await getProfileAct()
      }
    } catch (err) {
      console.log(err);
    }
  }; */
  return <RouterProvider router={router} />;
}

export default App;
