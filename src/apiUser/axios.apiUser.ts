import axios from "axios";
import { getTokenFromLocalStorage } from "../helpers/localStorage.helper";

export const instance = axios.create({
  baseURL: "https://excited-pantyhose-fox.cyclic.app/api/",
  headers: {
    Authorization: `Bearer ` + getTokenFromLocalStorage(),
  },
});
