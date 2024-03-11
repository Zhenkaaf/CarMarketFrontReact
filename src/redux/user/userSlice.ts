import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ILoginUserData, IRegisterUserData, IUser } from "../../types";
import { instance } from "../../apiUser/axios.apiUser";
import { setTokenToLocalStorage } from "../../helpers/localStorage.helper";

interface IMyErrorPayload {
  response: {
    data: {
      message: string;
    };
  };
}

interface IUserState {
  user: null | IUser;
  isUserAuth: boolean;
  isUserLoading: boolean;
  loginError: string | null;
  registerError: string | null;
}

export const registrationAct = createAsyncThunk<IUser, IRegisterUserData>(
  "user/registrationAct",
  async (userData: IRegisterUserData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://excited-pantyhose-fox.cyclic.app/api/registration",
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
        "https://excited-pantyhose-fox.cyclic.app/api/auth/login",
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
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState: IUserState = {
  user: null,
  isUserAuth: false,
  isUserLoading: false,
  loginError: null,
  registerError: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOutAct: (state) => {
      state.user = null;
      state.isUserAuth = false;
    },
    resetRegisterError: (state) => {
      state.registerError = null;
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
      })
      .addCase(loginAct.rejected, (state, action) => {
        state.loginError = action.payload as string;
        state.isUserLoading = false;
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
        }
      )
      .addCase(registrationAct.rejected, (state, action) => {
        state.registerError = action.payload as string;
        state.isUserLoading = false;
      })
      //GetProfile
      .addCase(getProfileAct.pending, (state) => {
        state.isUserLoading = true;
        /*   state.registerError = null; */
      })
      .addCase(getProfileAct.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isUserLoading = false;
        state.isUserAuth = true;
      })
      .addCase(getProfileAct.rejected, (state, action) => {
        /*  const payload = action.payload as IMyErrorPayload;
        if (
          payload &&
          payload.response &&
          payload.response.data &&
          payload.response.data.message
        ) {
          state.registerError = payload.response.data.message;
        } else {
          state.registerError = "Unknown error occurred";
        } */
        state.isUserLoading = false;
      });
  },
});

export const { logOutAct, resetRegisterError } = userSlice.actions;

export default userSlice.reducer;
