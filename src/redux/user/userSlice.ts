import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ILoginUserData, IRegisterUserData, IUser } from "../../types";
import {
  removeTokenFromLocalStorage,
  setTokenToLocalStorage,
} from "../../helpers/localStorage.helper";
import { instance } from "../../api/userApi";

export const registrationAct = createAsyncThunk<IUser, IRegisterUserData>(
  "user/registrationAct",
  async (userData: IRegisterUserData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://carmarketbacknest.onrender.com/api/registration",
        /*   "https://excited-pantyhose-fox.cyclic.app/api/registration", */
        userData
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message;
        return rejectWithValue(errorMessage);
      } else {
        return rejectWithValue("Unknown error occurred");
      }
    }
  }
);

export const loginAct = createAsyncThunk<IUser, ILoginUserData>(
  "user/loginAct",
  async (userData, { rejectWithValue }) => {
    console.log("loginAct*****");
    try {
      const response = await axios.post(
        "https://carmarketbacknest.onrender.com/api/auth/login",
        /*    "https://excited-pantyhose-fox.cyclic.app/api/auth/login", */
        userData
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message;
        return rejectWithValue(errorMessage);
      } else {
        return rejectWithValue("Unknown error occurred");
      }
    }
  }
);

export const getProfileAct = createAsyncThunk<IUser>(
  "user/getProfileAct",
  async (_, { rejectWithValue }) => {
    console.log("getProfileAct*****");
    try {
      const response = await instance.get("auth/profile");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message;
        return rejectWithValue(errorMessage);
      } else {
        return rejectWithValue("Unknown error occurred");
      }
    }
  }
);

interface IUserState {
  user: null | IUser;
  isUserAuth: boolean;
  isUserLoading: boolean;
  loginError: string | null;
  registerError: string | null;
  getProfileError: string | null;
  waitingForProfile: boolean;
}

const initialState: IUserState = {
  user: null,
  isUserAuth: false,
  isUserLoading: false,
  loginError: null,
  registerError: null,
  getProfileError: null,
  waitingForProfile: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOutAct: (state) => {
      removeTokenFromLocalStorage("tokenCarApp");
      state.user = null;
      state.isUserAuth = false;
    },
    resetRegisterError: (state) => {
      state.registerError = null;
    },
    resetLoginError: (state) => {
      state.loginError = null;
    },
    /*  setUserLoadingAct: (state, action) => {
      state.isUserLoading = action.payload;
    }, */
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAct.pending, (state) => {
        state.isUserLoading = true;
        state.loginError = null;
      })
      .addCase(loginAct.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.user = action.payload;
        state.isUserLoading = false;
        state.isUserAuth = true;
        setTokenToLocalStorage("tokenCarApp", state.user.token);
        state.waitingForProfile = false;
      })
      .addCase(loginAct.rejected, (state, action) => {
        state.loginError = action.payload as string;
        state.isUserLoading = false;
        state.waitingForProfile = false;
      })
      //RegistrationAct
      .addCase(registrationAct.pending, (state) => {
        state.isUserLoading = true;
        state.registerError = null;
      })
      .addCase(
        registrationAct.fulfilled,
        (state, action: PayloadAction<IUser>) => {
          state.user = action.payload;
          state.isUserLoading = false;
          state.isUserAuth = true;
          setTokenToLocalStorage("tokenCarApp", state.user.token);
          state.waitingForProfile = false;
        }
      )
      .addCase(registrationAct.rejected, (state, action) => {
        state.registerError = action.payload as string;
        state.isUserLoading = false;
        state.waitingForProfile = false;
      })
      //GetProfile
      .addCase(getProfileAct.pending, (state) => {
        state.isUserLoading = true;
        state.getProfileError = null;
      })
      .addCase(getProfileAct.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isUserLoading = false;
        state.isUserAuth = true;
        state.waitingForProfile = false;
      })
      .addCase(getProfileAct.rejected, (state, action) => {
        state.getProfileError = action.payload as string;
        state.isUserLoading = false;
        state.waitingForProfile = false;
      });
  },
});

export const { logOutAct, resetRegisterError, resetLoginError } =
  userSlice.actions;

export default userSlice.reducer;
