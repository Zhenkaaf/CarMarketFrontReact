import axios from "axios";
import { getTokenFromLocalStorage } from "../helpers/localStorage.helper";

export const instance = axios.create({
  baseURL: "https://carmarketbacknest.onrender.com/api/",
  headers: {
    Authorization: `Bearer ` + getTokenFromLocalStorage(),
  },
});
